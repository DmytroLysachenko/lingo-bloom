"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  GrammarRule,
  Language,
  LanguageLevel,
  TaskPurpose,
  TaskTopic,
  TaskType,
} from "@/types";
import FormSelector from "@components/molecules/FormSelector";
import axios from "axios";
import { useState } from "react";

interface TaskFormData {
  languageId: string;
  taskTypeId: string;
  taskPurposeId: string;
  taskTopicId: string;
  languageLevelId: string;
  grammarRuleId: string;
}

interface TaskFormProps {
  grammarRules: GrammarRule[];
  taskTopics: TaskTopic[];
  languageLevels: LanguageLevel[];
  languages: Language[];
  taskPurposes: TaskPurpose[];
  taskTypes: TaskType[];
}

const TaskForm = ({
  grammarRules,
  taskTopics,
  languageLevels,
  languages,
  taskPurposes,
  taskTypes,
}: TaskFormProps) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();

  const [generatedTask, setGeneratedTask] = useState<{
    languageId: number;
    taskTypeId: number;
    taskPurposeId: number;
    taskTopicId: number | null;
    languageLevelId: number;
    grammarRuleId: number | null;
    checked: boolean;
    id: number;
    data: string;
  }>();

  const selectedLanguageId = watch("languageId");

  const selectedPurposeId = watch("taskPurposeId");

  const grammarRulesOptions = grammarRules
    .filter((rule) => rule.languageId.toString() === selectedLanguageId)
    .map((rule) => ({
      value: rule.id.toString(),
      name: rule.data.en.title,
    }));

  const taskTopicsOptions = taskTopics.map((topic) => ({
    value: topic.id.toString(),
    name: topic.name,
  }));

  const languageOptions = languages.map((language) => ({
    value: language.id.toString(),
    name: language.name,
  }));

  const languageLevelsOptions = languageLevels.map((level) => ({
    value: level.id.toString(),
    name: level.name,
  }));

  const taskPurposeIdOptions = taskPurposes.map((purpose) => ({
    value: purpose.id.toString(),
    name: purpose.name,
  }));

  const grammarPurposeId = taskPurposes.find(
    (purpose) => purpose.name === "Grammar"
  )?.id;

  const taskTypeIdOptions = taskTypes.map((type) => ({
    value: type.id.toString(),
    name: type.name,
  }));

  const onSubmit = async (data: TaskFormData) => {
    const response = await axios.post("/api/admin/task", data);
    console.log(response.data.newTask);
    setGeneratedTask(response.data.newTask);
  };

  const onAcceptTask = async () => {
    await axios.patch("/api/admin/task", {
      ...generatedTask,
      checked: true,
    });
    setGeneratedTask(undefined);
  };
  const onDeleteTask = async () => {
    await axios.delete("/api/admin/task", {
      data: { id: generatedTask?.id },
    });
    setGeneratedTask(undefined);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormSelector
          id="languageId"
          label="Language"
          control={control}
          errors={errors}
          options={languageOptions}
        />

        <FormSelector
          id="languageLevelId"
          label="Language Level"
          control={control}
          errors={errors}
          options={languageLevelsOptions}
        />

        <FormSelector
          id="taskTopicId"
          label="Task topic"
          control={control}
          errors={errors}
          options={taskTopicsOptions}
        />

        {selectedLanguageId && (
          <>
            <FormSelector
              id="taskTypeId"
              label="Task type"
              control={control}
              errors={errors}
              options={taskTypeIdOptions}
            />
            <FormSelector
              id="taskPurposeId"
              label="Task purpose"
              control={control}
              errors={errors}
              options={taskPurposeIdOptions}
            />
          </>
        )}

        {selectedLanguageId &&
          selectedPurposeId === grammarPurposeId?.toString() && (
            <FormSelector
              id="grammarRuleId"
              label="Grammar Rule"
              control={control}
              errors={errors}
              options={grammarRulesOptions}
            />
          )}

        <Button className="w-full">Create Task</Button>
      </form>
      {generatedTask ? (
        <>
          <h2 className="text-2xl font-semibold my-5">Created Task:</h2>
          <p className="text-xl block bg-primary-200 border border-solid border-neutral-600 rounded-xl p-4">
            {generatedTask.data}
          </p>
          <div className="flex justify-between p-2">
            <Button onClick={onAcceptTask}>Accept</Button>
            <Button onClick={onDeleteTask}>Delete</Button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default TaskForm;
