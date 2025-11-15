import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContentStream({
  model: "gemini-2.0-flash",
  contents: "hello.",
});
let text = "";
for await (const chunk of response) {
  console.log(chunk.text);
  text += chunk.text;
}
