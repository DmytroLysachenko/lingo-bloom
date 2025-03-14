import { findAllGrammarRules } from "@/db/grammarRule";
import { findAllLanguages } from "@/db/language";
import { findAllLanguageLevels } from "@/db/languageLevel";
import { findAllTaskPurposes } from "@/db/taskPurpose";
import { findAllTaskTopics } from "@/db/taskTopic";
import { findAllTaskTypes } from "@/db/taskType";
import AdminPage from "@components/pages/AdminPage";
import React from "react";

const Admin = async () => {
  const [
    grammarRules,
    taskTopics,
    languageLevels,
    languages,
    taskPurposes,
    taskTypes,
  ] = await Promise.all([
    findAllGrammarRules(),
    findAllTaskTopics(),
    findAllLanguageLevels(),
    findAllLanguages(),
    findAllTaskPurposes(),
    findAllTaskTypes(),
  ]);

  return (
    <AdminPage
      grammarRules={grammarRules}
      taskTopics={taskTopics}
      languageLevels={languageLevels}
      languages={languages}
      taskPurposes={taskPurposes}
      taskTypes={taskTypes}
    />
  );
};

export default Admin;
