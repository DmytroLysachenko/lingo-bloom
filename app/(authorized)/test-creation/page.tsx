import { findAllLanguages } from "@/db/language";
import { findAllLanguageLevels } from "@/db/languageLevel";
import TestCreationPage from "@components/pages/TestCreationPage";
import React from "react";

const TestCreation = async () => {
  const [languageLevels, languages] = await Promise.all([
    findAllLanguageLevels(),
    findAllLanguages(),
  ]);

  return (
    <TestCreationPage
      languageLevels={languageLevels}
      languages={languages}
    />
  );
};

export default TestCreation;
