"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskForm from "@components/organisms/TaskForm";
import GrammarRuleForm from "@components/organisms/GrammarRuleForm";
import ConstantsTable from "@components/molecules/ConstantsTable";
import { GrammarRuleData } from "@/types";

interface AdminPageProps {
  grammarRules: {
    data: GrammarRuleData;
    id: number;
    languageId: number;
  }[];
  taskTopics: { id: number; name: string }[];
}

const AdminPage = ({ grammarRules, taskTopics }: AdminPageProps) => {
  const [activeTab, setActiveTab] = useState("task");
  const [grammarRule, setGrammarRule] = useState(grammarRules[0]);
  const [taskTopic, setTaskTopic] = useState(taskTopics[0]);

  console.log([grammarRule, setGrammarRule]);
  console.log([taskTopic, setTaskTopic]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-700 mb-8">
        Admin Dashboard
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="task">Create Task</TabsTrigger>
          <TabsTrigger value="grammarRule">Create Grammar Rule</TabsTrigger>
          <TabsTrigger value="constants">View Constants</TabsTrigger>
          <TabsTrigger value="tests">View Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="task">
          <TaskForm />
        </TabsContent>
        <TabsContent value="grammarRule">
          <GrammarRuleForm />
        </TabsContent>
        <TabsContent value="constants">
          <ConstantsTable />
        </TabsContent>
        <TabsContent value="tests">
          <h2 className="text-2xl font-semibold mb-4">Test Data</h2>
          <p>Test data table will be implemented here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
