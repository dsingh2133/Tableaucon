
import { GoogleGenAI, Type } from "@google/genai";

export const generateSessionIdeas = async (track: string) => {
  // Always create a new GoogleGenAI instance right before making an API call 
  // to ensure it uses the most up-to-date API key from the environment/context.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 3 creative session ideas for a data conference under the track "${track}". Include a Title, Abstract, and suggested Skill Level (Beginner, Intermediate, Advanced).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              abstract: { type: Type.STRING },
              level: { type: Type.STRING }
            },
            required: ['title', 'abstract', 'level']
          }
        }
      }
    });
    // Extracting text from property .text as per guidelines
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
