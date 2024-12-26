interface LanguageCodes {
  [key: string]: Language;
}

interface Language {
  id: number;
  name: string;
}

interface LanguageLevels {
  [key: string]: number;
}

export const LANGUAGES: LanguageCodes = {
  pl: { id: 0, name: "Polish" },
  en: { id: 1, name: "English" },
  uk: { id: 2, name: "Ukrainian" },
};

export const LANGUAGES_LIST = [
  { id: 0, name: "Polish", code: "pl" },
  { id: 1, name: "English", code: "en" },
  { id: 2, name: "Ukrainian", code: "uk" },
];

export const LANGUAGE_LEVELS: LanguageLevels = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
};
export const LANGUAGE_LEVELS_LIST = [
  { id: 0, name: "A1" },
  { id: 1, name: "A2" },
  { id: 2, name: "B1" },
  { id: 3, name: "B2" },
];

export const TASK_TYPES_LIST = [
  { id: 0, name: "Test" },
  { id: 1, name: "Connection" },
  { id: 2, name: "Fill in the Blanks" },
];

export const TASK_PURPOSE_LIST = [
  { id: 0, name: "Grammar" },
  { id: 1, name: "Vocabulary" },
  { id: 2, name: "Reading" },
];
