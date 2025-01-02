"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskForm from "@components/organisms/TaskForm";
import GrammarRuleForm from "@components/organisms/GrammarRuleForm";
import ConstantsTable from "@components/molecules/ConstantsTable";
import {
  Language,
  LanguageLevel,
  TaskPurpose,
  TaskTopic,
  TaskType,
} from "@prisma/client";
import { GrammarRule } from "@/schemas";

interface AdminPageProps {
  grammarRules: GrammarRule[];
  taskTopics: TaskTopic[];
  languageLevels: LanguageLevel[];
  languages: Language[];
  taskPurposes: TaskPurpose[];
  taskTypes: TaskType[];
}

const AdminPage = ({
  grammarRules,
  taskTopics,
  languageLevels,
  languages,
  taskPurposes,
  taskTypes,
}: AdminPageProps) => {
  const [activeTab, setActiveTab] = useState("task");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-700 mb-8">
        Admin Dashboard
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="task">Create Task</TabsTrigger>
          <TabsTrigger value="grammarRule">Create Grammar Rule</TabsTrigger>
          <TabsTrigger value="constants">View Constants</TabsTrigger>
        </TabsList>
        <TabsContent value="task">
          <TaskForm
            grammarRules={grammarRules}
            taskTopics={taskTopics}
            languageLevels={languageLevels}
            languages={languages}
            taskPurposes={taskPurposes}
            taskTypes={taskTypes}
          />
        </TabsContent>
        <TabsContent value="grammarRule">
          <GrammarRuleForm languages={languages} />
        </TabsContent>
        <TabsContent value="constants">
          <ConstantsTable
            mockData={{
              taskTopics,
              languageLevels,
              languages,
              taskPurposes,
              taskTypes,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
