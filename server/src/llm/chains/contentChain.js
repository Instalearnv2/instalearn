import { LLMChain } from "langchain/chains";
import { palmModel } from "../models/palm.js";
import { geminiModel } from "../models/gemini.js";
import { contentPrompt } from "../templates/contentTemplate.js";

/**
 * Generate the content for a chapter using the Google PaLM model.
 * 
 * @param {string} chapter - The chapter for which to generate content.
 * @returns {Promise<string>} A Promise that resolves to the model-generated content string.
 * @throws {Error} An error is thrown if the model fails to generate content.
 */

// export const generateContent = async (chapter) => {
//     const model = palmModel(0.8);
//     const chain = new LLMChain({
//         llm: model,
//         prompt: contentPrompt,
//         verbose: true,
//     });

//     try {
//         const result = await chain.call({ chapter: chapter });
//         return result.text;
//     } catch (error) {
//         console.error("❌ Error inside content generation:", error);
//         throw new Error("Content generation failed!");
//     }
// }
export const generateContent = async (chapter) => {
    const model = geminiModel(0.8);

    try {
        const prompt = await contentPrompt.format({ chapter });
        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (error) {
        console.error("❌ Error inside content generation:", error);
        throw new Error("Content generation failed!");
    }
}