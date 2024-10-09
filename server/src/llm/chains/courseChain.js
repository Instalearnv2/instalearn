import { LLMChain } from "langchain/chains";
import { geminiModel } from "../models/gemini.js";
import { coursePrompt } from "../templates/courseTemplate.js";
import { jsonParser, formatResponse } from "../utils/jsonParser.js";

/**
 * Generate a course syllabus using the Google PaLM model.
 * 
 * @param {string} topic - The topic for which to generate a course syllabus.
 * @returns {Promise<string>} A Promise that resolves to an array of chapters.
 * @throws {Error} An error is thrown if the model fails to generate a course syllabus.
 */

export const generateCourse = async (topic) => {
    const model = geminiModel(0.2);

    try {
        const prompt = await coursePrompt.format({ topic });
        const result = await model.generateContent(prompt);

        const generatedText = result.response.text();
        console.log("GENERATED TEXT: ", generatedText)
        return generatedText;
    } catch (error) {
        console.error("❌ Error inside course generation:", error);
        throw new Error("Course generation failed!");
    }
};