
import { GoogleGenerativeAI } from "@google/generative-ai"
import { config } from 'dotenv'
config()

const chatear = async(req, res) => {
    const {prompt} = req.body;
    try {
      const genAI = new GoogleGenerativeAI(process.env.TOKEN_API_GOOGLE);
      const geminiConfig = {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 4096,
      };
       
      const geminiModel = genAI.getGenerativeModel({
        model: "gemini-1.0-pro-latest",
        geminiConfig,
      });

         const result = await geminiModel.generateContent(prompt);
         const response =  result.response;
         const paragraph = response.text();
         res.status(200).json({paragraph})
    } catch (error) {
        console.log(error)
    }
};



export {
    chatear
}