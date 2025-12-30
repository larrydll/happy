
export type Score = 1 | 2 | 3 | 4 | 5 | 6;

export interface Question {
  id: number;
  text: string;
  reverse: boolean;
  dimension: 'satisfaction' | 'esteem' | 'resilience' | 'optimism' | 'control';
}

export interface DimensionScore {
  name: string;
  value: number;
  fullMark: number;
}

export interface AssessmentResult {
  totalScore: number;
  averageScore: number;
  dimensions: DimensionScore[];
}

export interface User {
  id: string;
  name: string;
  assessmentHistory: Array<{
    date: string;
    score: number;
  }>;
}
