export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: Date;
}

export interface TestProgress {
  testId: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
}

export interface CompletedTest {
  testId: string;
  score: number;
  completedAt: string;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  averageScore: number;
  triesPerTask: number;
}

export interface GrammarRuleTranslation {
  title: string;
  description: string;
  example: string;
}

export interface GrammarRuleData {
  [languageCode: string]: GrammarRuleTranslation;
}

export interface GrammarRule {
  data: GrammarRuleData;
  id: number;
  languageId: number;
}
