import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StudentProfile, Course, RecommendationType, AnalysisResult, Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the response schema for structured output
const recommendationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A brief, encouraging summary of the student's current academic standing and areas for improvement."
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          type: { 
            type: Type.STRING, 
            enum: [
              RecommendationType.COURSE, 
              RecommendationType.MATERIAL, 
              RecommendationType.GROUP, 
              RecommendationType.STRATEGY
            ] 
          },
          description: { type: Type.STRING },
          platformOrLink: { type: Type.STRING, description: "Name of the platform (e.g., Coursera, YouTube) or a specific topic to search." },
          relevanceScore: { type: Type.INTEGER, description: "A score from 0 to 100 indicating how important this is." },
          reasoning: { type: Type.STRING, description: "Why this was recommended based on specific grades or learning style." }
        },
        required: ["id", "title", "type", "description", "relevanceScore", "reasoning"]
      }
    }
  },
  required: ["summary", "recommendations"]
};

export const generateRecommendations = async (
  profile: StudentProfile,
  courses: Course[],
  language: Language = 'en'
): Promise<AnalysisResult> => {
  
  const langInstruction = language === 'id' 
    ? "IMPORTANT: Provide the response specifically in BAHASA INDONESIA." 
    : "IMPORTANT: Provide the response in ENGLISH.";

  const prompt = `
    Act as an advanced Academic Advisor AI. Analyze the following student profile and course grades to provide personalized learning recommendations.
    
    ${langInstruction}

    Student Profile:
    - Name: ${profile.name}
    - Major: ${profile.major}
    - Semester: ${profile.semester}
    - Learning Style: ${profile.learningStyle} (Prioritize recommendations that fit this style. E.g., Visual -> Videos/Diagrams, Auditory -> Podcasts/Lectures)
    - Interests: ${profile.interests.join(", ")}
    - Weaknesses/Struggles: ${profile.weaknesses.join(", ")}

    Course Grades (0-100 scale):
    ${courses.map(c => `- ${c.name} (${c.category}): ${c.grade}`).join("\n")}

    Task:
    1. Identify courses where the student is struggling (< 75) and suggest remedial resources (Materials or Online Courses).
    2. Suggest advancement opportunities for subjects they excel in (> 85).
    3. Recommend study groups or collaborative filtering strategies based on their major.
    4. Provide specific actionable learning strategies.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.4, // Keep it relatively deterministic but creative enough for descriptions
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text) as AnalysisResult;
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(language === 'id' ? "Gagal menghasilkan rekomendasi. Periksa koneksi atau kunci API Anda." : "Failed to generate recommendations. Please check your connection and API key.");
  }
};