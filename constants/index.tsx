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

export const LANGUAGE_LEVELS: LanguageLevels = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
};

export enum TASK_TYPES {
  TEST = 0,
  CONNECTION = 1,
  FILL_IN_BLANKS = 2,
}

export enum TASK_PURPOSES {
  GRAMMAR = 0,
}
