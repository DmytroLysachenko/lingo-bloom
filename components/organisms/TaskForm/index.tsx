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
  languageLevelId: string;
  taskTypeId: string;
  taskPurposeId: string;
  taskTopicId?: string;
  grammarRuleId?: string;
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
    id: number;
    checked: boolean;
    languageId: number;
    languageLevelId: number;
    taskTypeId: number;
    taskPurposeId: number;
    taskTopicId?: number;
    grammarRuleId?: number;
    data: string;
  }>();

  const [isLoading, setIsLoading] = useState(false);

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

  const taskTypeIdOptions = taskTypes
    .filter((type) => type.taskPurposeId.toString() === selectedPurposeId)
    .map((type) => {
      return {
        value: type.id.toString(),
        name: type.name,
      };
    });

  const onSubmit = async (data: TaskFormData) => {
    const numericData = {
      languageId: Number(data.languageId),
      languageLevelId: Number(data.languageLevelId),
      taskTypeId: Number(data.taskTypeId),
      taskPurposeId: Number(data.taskPurposeId),
      taskTopicId: data.taskTopicId ? Number(data.taskTopicId) : undefined,
      grammarRuleId: data.grammarRuleId
        ? Number(data.grammarRuleId)
        : undefined,
    };
    try {
      setIsLoading(true);
      const response = await axios.post("/api/admin/task", numericData);
      setGeneratedTask(response.data.newTask);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAcceptTask = async () => {
    try {
      await axios.patch("/api/admin/task", {
        ...generatedTask,
        checked: true,
      });
      setGeneratedTask(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteTask = async () => {
    try {
      await axios.delete("/api/admin/task", {
        data: { id: generatedTask?.id },
      });
      setGeneratedTask(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto"
      >
        <FormSelector
          id="languageId"
          label="Language"
          control={control}
          errors={errors}
          options={languageOptions}
          placeholder="Select a language"
        />

        <FormSelector
          id="languageLevelId"
          label="Language Level"
          control={control}
          errors={errors}
          options={languageLevelsOptions}
          placeholder="Select a language level"
        />

        <FormSelector
          id="taskTopicId"
          label="Task topic"
          control={control}
          errors={errors}
          options={taskTopicsOptions}
          placeholder="Select a task topic"
        />

        {selectedLanguageId && (
          <FormSelector
            id="taskPurposeId"
            label="Task purpose"
            control={control}
            errors={errors}
            options={taskPurposeIdOptions}
            placeholder="Select a task purpose"
          />
        )}

        {selectedPurposeId && selectedLanguageId && (
          <FormSelector
            id="taskTypeId"
            label="Task type"
            control={control}
            errors={errors}
            options={taskTypeIdOptions}
            placeholder="Select a task type"
          />
        )}

        {selectedLanguageId &&
          selectedPurposeId === grammarPurposeId?.toString() && (
            <FormSelector
              id="grammarRuleId"
              label="Grammar Rule"
              control={control}
              errors={errors}
              options={grammarRulesOptions}
              placeholder="Select a grammar rule"
            />
          )}

        <Button
          disabled={isLoading}
          className="w-full"
        >
          Create Task
        </Button>
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
