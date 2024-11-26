import express from 'express';
import {verifyInitData} from "../controllers/VerifyController.js"
const router = express.Router();

router.post("/verify", verifyInitData);

export default router;