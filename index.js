import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Mengambil key dari file .env
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function main() {
  try {
    // Menggunakan model Gemini 2.0 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = "Jelaskan cara kerja AI dalam 10 kata.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log("--- Jawaban AI ---");
    console.log(response.text());
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
}

main();