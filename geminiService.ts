
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSessionIdeas = async (track: string) => {
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
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
