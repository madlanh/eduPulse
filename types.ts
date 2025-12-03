export enum LearningStyle {
  VISUAL = 'Visual',
  AUDITORY = 'Auditory',
  READING_WRITING = 'Reading/Writing',
  KINESTHETIC = 'Kinesthetic'
}

export type Language = 'en' | 'id';

export interface Course {
  id: string;
  name: string;
  grade: number; // 0-100 scale
  credits: number;
  category: string;
}

export interface StudentProfile {
  name: string;
  major: string;
  semester: number;
  gpa: number;
  learningStyle: LearningStyle;
  interests: string[];
  weaknesses: string[];
}

export enum RecommendationType {
  COURSE = 'Online Course',
  MATERIAL = 'Study Material',
  GROUP = 'Study Group',
  STRATEGY = 'Learning Strategy'
}

export interface Recommendation {
  id: string;
  title: string;
  type: RecommendationType;
  description: string;
  platformOrLink?: string;
  relevanceScore: number; // 0-100
  reasoning: string;
}

export interface AnalysisResult {
  summary: string;
  recommendations: Recommendation[];
}