import { JsonValue } from "@prisma/client/runtime/library";

export interface Task {
  level: string;
  language: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: null | Date;
  image: string;
  createdAt: string;
  updatedAt: string;
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

interface GrammarRuleTranslation {
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

export interface TaskTopic {
  id: number;
  name: string;
}

export interface LanguageLevel {
  id: number;
  name: string;
  description: string | null;
}

export interface Language {
  id: number;
  name: string;
  code: string;
}

export interface TaskPurpose {
  id: number;
  name: string;
}

export interface TaskType {
  id: number;
  name: string;
  promptSchema: JsonValue;
  taskPurposeId: number;
}
