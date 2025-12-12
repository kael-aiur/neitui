import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateJobDescription = async (title: string, company: string, skills: string): Promise<string> => {
  try {
    const prompt = `
      You are an expert HR recruiter. Write a professional, concise, and attractive job description for a "${title}" position at "${company}".
      Key skills required: ${skills}.
      
      Structure the response with:
      1. About the Role (2 sentences)
      2. Key Responsibilities (3 bullet points)
      3. Requirements (3 bullet points)
      
      Keep the tone professional yet inviting. Do not use markdown formatting characters like ** or #, just plain text with newlines.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Error generating JD:", error);
    return "Error generating description. Please try again.";
  }
};