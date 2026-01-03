import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSecurityAssistantResponse = async (userPrompt: string, imageData?: string) => {
  try {
    const parts: any[] = [{ text: userPrompt }];
    if (imageData) {
      parts.push({
        inlineData: { mimeType: 'image/jpeg', data: imageData }
      });
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: `You are the AI security assistant for 'Sikkim Shield'. Monitor vehicle feeds and provide professional updates relative to Sikkim's geography.`
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Network error in the Himalayan range.";
  }
};

export const getEMICalculation = async (totalPrice: number) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Calculate 3 EMI options for ${totalPrice} INR.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            months: { type: Type.INTEGER },
            interestRate: { type: Type.NUMBER },
            monthlyAmount: { type: Type.NUMBER },
            totalPayable: { type: Type.NUMBER }
          },
          required: ['months', 'interestRate', 'monthlyAmount', 'totalPayable']
        }
      }
    }
  });
  return JSON.parse(response.text || '[]');
};