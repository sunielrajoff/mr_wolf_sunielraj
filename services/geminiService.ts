
import { GoogleGenAI } from "@google/genai";
import { GenerateContentResponse } from "@google/genai";

/**
 * Generates a motivational quote for seniors about contribution.
 * This function uses the Gemini API for a simple text generation task.
 * It's configured to provide a concise, inspiring message.
 * @returns A promise that resolves to a motivational quote string, or an empty string if an error occurs.
 */
export const generateMotivationQuote = async (): Promise<string> => {
  // CRITICAL: A new GoogleGenAI instance must be created right before an API call
  // to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, inspiring quote (20-30 words) for college seniors recognizing their contributions and mentorship to juniors. Focus on the value of sharing knowledge and building community.",
      config: {
        temperature: 0.9,
        maxOutputTokens: 50, // Keep the quote concise
        topK: 40,
        topP: 0.95,
      },
    });
    return response.text?.trim() || 'No quote generated.';
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error generating motivational quote:', error);
      // Handle API key selection if the error indicates a missing or invalid key.
      if (error.message.includes("API key not valid") || error.message.includes("Requested entity was not found.")) {
        // Assume API key issue, prompt user to select.
        // In a real app, you might want to show a more explicit UI message.
        if (window.aistudio && window.aistudio.openSelectKey) {
            console.warn("Gemini API key might be missing or invalid. Attempting to open API key selection dialog.");
            // We assume success after opening the dialog as per guidelines.
            window.aistudio.openSelectKey();
            return 'Please select a valid Gemini API key to get motivational quotes.';
        }
      }
    } else {
      console.error('An unknown error occurred while generating quote:', error);
    }
    return 'Failed to generate quote. Please try again later.';
  }
};
