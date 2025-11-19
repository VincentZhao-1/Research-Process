import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `You are an expert academic assistant, specializing in quantitative marketing and microeconomic theory, particularly game theory. 
Your role is to guide a first-year PhD student in transforming a nascent research concept into a publishable framework for a top marketing journal like Marketing Science or Management Science.
Strictly adhere to the structure provided in the prompt. Output MUST be formatted in clear Markdown.`;

const GENERATION_TEMPLATE = (idea: string) => `
My preliminary research idea is: **${idea}**

Please elaborate on this idea by structuring a comprehensive academic paper framework, addressing each of the following critical components:

### 1. Phenomenon & Context
- Identify and articulate a timely and puzzling real-world phenomenon or a critical gap in existing literature that motivates this research.
- Explain why this phenomenon is intriguing and how it presents an opportunity for innovative findings.
- Briefly discuss the relevance of this context to quantitative marketing.

### 2. Research Questions
- Based on the phenomenon identified above, formulate three distinct, well-defined research questions.
- For each question, indicate how it would translate into defining essential components of a game theory model (e.g., identifying potential players, their objectives, information structure, endogenous variables, exogenous parameters, and the specific relationships or impacts to be analyzed).

### 3. Formal Model Design Principles
- Propose a central trade-off that the model will explore.
- Discuss how the model will be constructed to prioritize cleanliness, ensuring it clearly reflects this core trade-off.
- Explain how the model will maintain relevance to accurately capture the studied mechanism or phenomenon, avoiding ad-hoc assumptions that might drive the main results.
- Suggest potential players, their actions, and the timing of events (if applicable) that would be central to modeling this idea.

### 4. Anticipated Model Solution & Results Characteristics
- Describe the characteristics of the ideal results: what kind of relationships between parameters would be interesting?
- Suggest how the model might yield surprising (e.g., non-monotonic), non-trivial, and tractably solvable outcomes.
- What kind of "clean" mechanism do you anticipate the findings will reveal?

### 5. Interpretation & Contribution
- Outline how the anticipated findings would be interpreted to demonstrate their theoretical contribution to quantitative marketing and microeconomic theory.
- Suggest potential managerial implications or policy recommendations derived from the research.
- Explain how these contributions would be "sold" to reviewers and readers of top-tier journals.
`;

export const generateFramework = async (idea: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: GENERATION_TEMPLATE(idea) }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7, // Balance between creativity and structure
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating framework:", error);
    throw new Error("Failed to generate research framework. Please check your API key and try again.");
  }
};