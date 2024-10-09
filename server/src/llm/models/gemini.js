import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generate a Gemini model.
 *
 * @param {number} temperature - The temperature to use for the model.
 * @returns {GoogleGenerativeAI} A Gemini model instance.
 */
export const geminiModel = (temperature) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Note: Gemini doesn't directly support temperature setting in the same way
    // You might need to adjust this based on Gemini's specific parameters
    return model;
};
