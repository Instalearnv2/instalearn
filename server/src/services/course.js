import { generateContent } from "../llm/chains/contentChain.js";
import { generateCourse } from "../llm/chains/courseChain.js";
import { Course } from "../models/course.model.js";
import magic from "../utils/magic.cjs";
import { getUser } from "./user.js";
import { parseJsonOutput } from "../utils/parseJSON.js";
export const handleCourseGeneration = async (magicId, topic) => {
  try {
    const user = await getUser(magicId);
    let course = await generateCourse(topic);
    course = parseJsonOutput(course);
    console.log("Parsed course data:", course);
    let chapters = [];
    let courseTitle = topic; // Default to the topic name

    // Check if course is an array
    if (Array.isArray(course)) {
      console.log("Course is an array, processing as chapters");
      // If it's an array, we'll use the topic as the title
      for (let chapter of course) {
        let chapterDetails = await generateContent(chapter.title);

        let chapterObj = {
          title: chapter.title,
          content: chapterDetails,
        };
        chapters.push(chapterObj);
      }
    } else if (course.syllabus) {
      console.log("Course has syllabus, processing as flat structure");
      courseTitle = course.title || topic; // Use course title if available
      for (let chapter of course.syllabus) {
        let chapterDetails = await generateContent(chapter);

        let chapterObj = {
          title: chapter,
          content: chapterDetails,
        };
        chapters.push(chapterObj);
      }
    } else {
      throw new Error("Invalid course structure");
    }

    //save the syllabus in the Course model
    const newCourse = new Course({
      title: courseTitle,
      chapters: chapters,
    });

    await newCourse.save();

    //save the course id in the user model
    let courseMetadata = {
      courseId: newCourse._id,
      title: courseTitle, // Use the courseTitle we determined above
      startedAt: new Date().toISOString(),
    };
    user.courses.push(courseMetadata);
    await user.save();

    return { newCourse, courseMetadata };
  } catch (error) {
    console.error("❌ Error inside handleCourseGeneration:", error);
    throw error;
  }
};

export const getCourse = async (courseId) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found!");
    }
    return course;
  } catch (error) {
    console.error("❌ Error inside getCourse:", error);
    throw error;
  }
};

export const completeCourse = async (magicId, courseId) => {
  try {
    const user = await getUser(magicId);
    for (let course of user.courses) {
      if (course.courseId == courseId) {
        course.completedAt = new Date().toISOString();
        course.finished = true;
        break;
      }
    }
    await user.save();
    return user;
  } catch (error) {
    console.error("❌ Error inside completeCourse:", error);
    throw error;
  }
};

export const completeChapter = async (courseId, chapterId) => {
  try {
    let course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course does not exist");
    }
    for (let chapter of course.chapters) {
      if (chapter._id == chapterId) {
        chapter.completed = !chapter.completed;
        break;
      }
    }
    await course.save();
    return course;
  } catch (error) {
    console.error("❌ Error inside completeChapter:", error);
    throw error;
  }
};
