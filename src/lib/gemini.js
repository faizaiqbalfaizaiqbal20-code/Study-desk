import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateStudyKit(rawNotes) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = `
    You are an expert academic tutor. Analyze the following study text/file content and build a full learning deck.

    TEXT CONTENT:
    """
    ${rawNotes}
    """

    Generate a strictly valid JSON response with these keys:
    {
      "deckTitle": "Short topic title",
      "summary": "A comprehensive 3-4 sentence high-level summary of the provided text.",
      "flashcards": [
        { "id": "fc_1", "question": "Clear active recall question", "answer": "Detailed answer" }
      ],
      "stickyNotes": [
        { "id": "sn_1", "title": "Key Concept", "content": "Critical definition or formula", "color": "yellow" }
      ],
      "quiz": [
        {
          "id": "q_1",
          "question": "Multiple choice question testing key facts",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0,
          "explanation": "Why option is correct"
        }
      ],
      "schedule": [
        { "day": "Day 1", "task": "Review Summary & 5 Flashcards", "durationMinutes": 20 }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}