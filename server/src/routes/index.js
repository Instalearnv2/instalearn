import express from "express";
import authRoute from "./auth.js";
import userRoute from "./user.js";
import courseRoute from "./course.js";
import quizRoute from "./quiz.js";
import VerifyRoutes from "./VerifyRoutes.js"
const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/course", courseRoute);
router.use("/quiz", quizRoute);
router.use("/",VerifyRoutes);

export default router;