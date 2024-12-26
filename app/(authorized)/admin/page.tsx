import { findAllGrammarRules } from "@/db/grammarRule";
import { findAllTaskTopics } from "@/db/taskTopic";
import AdminPage from "@components/pages/AdminPage";
import React from "react";

const Admin = async () => {
  const [grammarRules, taskTopics] = await Promise.all([
    findAllGrammarRules(),
    findAllTaskTopics(),
  ]);

  const parsedGrammarRules = grammarRules.map((rule) => ({
    ...rule,
    data: JSON.parse(rule.data as string),
  }));

  return (
    <AdminPage
      grammarRules={parsedGrammarRules}
      taskTopics={taskTopics}
    />
  );
};

export default Admin;
