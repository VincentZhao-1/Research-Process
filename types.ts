export interface ResearchState {
  idea: string;
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

export enum SectionType {
  PHENOMENON = 'Phenomenon & Context',
  QUESTIONS = 'Research Questions',
  MODEL = 'Formal Model Design',
  RESULTS = 'Anticipated Results',
  CONTRIBUTION = 'Interpretation & Contribution',
}

export interface FrameworkSection {
  title: string;
  content: string;
}