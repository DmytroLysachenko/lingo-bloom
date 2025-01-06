import { auth } from "@/auth";
import TestCreationForm from "@components/organisms/TestCreationForm";
import ClientSessionProvider from "@components/providers/ClientSessionProvider";
import { Language, LanguageLevel } from "@prisma/client";

import React from "react";

interface TestCreationPageProps {
  languageLevels: LanguageLevel[];
  languages: Language[];
}

const TestCreationPage = async ({
  languageLevels,
  languages,
}: TestCreationPageProps) => {
  const session = await auth();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <ClientSessionProvider session={session}>
        <TestCreationForm
          languageLevels={languageLevels}
          languages={languages}
        />
      </ClientSessionProvider>
    </div>
  );
};

export default TestCreationPage;
