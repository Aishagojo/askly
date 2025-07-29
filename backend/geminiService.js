import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // Use the latest model (e.g., "gemini-1.5-flash" or "gemini-1.5-pro")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works in a few words";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);
}

run().catch(console.error);