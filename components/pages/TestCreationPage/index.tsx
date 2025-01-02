import TestCreationForm from "@components/organisms/TestCreationForm";
import { Language, LanguageLevel } from "@prisma/client";

import React from "react";

interface TestCreationPageProps {
  languageLevels: LanguageLevel[];
  languages: Language[];
}

const TestCreationPage = ({
  languageLevels,
  languages,
}: TestCreationPageProps) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <TestCreationForm
        languageLevels={languageLevels}
        languages={languages}
      />
    </div>
  );
};

export default TestCreationPage;
