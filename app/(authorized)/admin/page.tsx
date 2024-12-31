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

  console.log("grammar RULES", grammarRules[0].data);
  console.log("task type", taskTypes[0].promptSchema);

  const parsedGrammarRules = grammarRules.map((rule) => ({
    ...rule,
    data: JSON.parse(rule.data as string),
  }));

  return (
    <AdminPage
      grammarRules={parsedGrammarRules}
      taskTopics={taskTopics}
      languageLevels={languageLevels}
      languages={languages}
      taskPurposes={taskPurposes}
      taskTypes={taskTypes}
    />
  );
};

export default Admin;
