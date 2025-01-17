"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { GrammarRule } from "@/types";
import FormSelector from "@atoms/FormSelector";
import axios from "axios";
import { Fragment, useState } from "react";
import {
  Language,
  LanguageLevel,
  TaskPurpose,
  TaskTopic,
  TaskType,
} from "@prisma/client";
import { Task } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";

interface TaskCreationFormData {
  languageId: string;
  languageLevelId: string;
  taskTypeId: string;
  taskPurposeId: string;
  quantity: string;
  taskTopicId?: string;
  grammarRuleId?: string;
}

interface TaskCreationFormProps {
  grammarRules: GrammarRule[];
  taskTopics: TaskTopic[];
  languageLevels: LanguageLevel[];
  languages: Language[];
  taskPurposes: TaskPurpose[];
  taskTypes: TaskType[];
}

const taskCreationSchema = z.object({
  languageId: z.string().min(1, "Please select a language"),
  languageLevelId: z.string().min(1, "Please select a language level"),
  taskTypeId: z.string().min(1, "Please select a task type"),
  taskPurposeId: z.string().min(1, "Please select a task purpose"),
  quantity: z.string().min(1, "Please select the quantity of tasks"),
  taskTopicId: z.string().optional(),
  grammarRuleId: z.string().optional(),
});

const TaskCreationForm = ({
  grammarRules,
  taskTopics,
  languageLevels,
  languages,
  taskPurposes,
  taskTypes,
}: TaskCreationFormProps) => {
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([]);

  const form = useForm<z.infer<typeof taskCreationSchema>>({
    resolver: zodResolver(taskCreationSchema),
    defaultValues: {
      languageId: "",
      languageLevelId: "",
      taskTypeId: "",
      taskPurposeId: "",
      quantity: "",
      taskTopicId: "",
      grammarRuleId: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const selectedLanguageId = form.watch("languageId");

  const selectedPurposeId = form.watch("taskPurposeId");

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

  const quantityOptions = [
    { value: "3", name: "3" },
    { value: "6", name: "6" },
    { value: "9", name: "9" },
  ];

  const onSubmit = async (data: TaskCreationFormData) => {
    const numericData = {
      languageId: Number(data.languageId),
      languageLevelId: Number(data.languageLevelId),
      taskTypeId: Number(data.taskTypeId),
      taskPurposeId: Number(data.taskPurposeId),
      taskTopicId: data.taskTopicId ? Number(data.taskTopicId) : undefined,
      grammarRuleId: data.grammarRuleId
        ? Number(data.grammarRuleId)
        : undefined,
      quantity: Number(data.quantity),
    };
    try {
      setIsLoading(true);
      const response = await axios.post("/api/admin/task", numericData);
      console.log(response);
      setGeneratedTasks(response.data.newTasks);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onAcceptTask = async (id: number) => {
    try {
      const acceptedTask = generatedTasks.find((task) => task.id === id);

      await axios.patch("/api/admin/task", {
        ...acceptedTask,
        checked: true,
      });

      setGeneratedTasks(generatedTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteTask = async (id: number) => {
    try {
      await axios.delete("/api/admin/task", {
        data: { id },
      });
      setGeneratedTasks(generatedTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-2/3 mx-auto"
      >
        <FormSelector
          name="languageId"
          label="Language"
          control={form.control}
          options={languageOptions}
          placeholder="Select a language"
        />
        <FormSelector
          name="quantity"
          label="Quantity"
          control={form.control}
          options={quantityOptions}
          placeholder="Select quantity"
        />

        <FormSelector
          name="languageLevelId"
          label="Language Level"
          control={form.control}
          options={languageLevelsOptions}
          placeholder="Select a language level"
        />

        <FormSelector
          name="taskTopicId"
          label="Task topic"
          control={form.control}
          options={taskTopicsOptions}
          placeholder="Select a task topic"
        />

        {selectedLanguageId && (
          <FormSelector
            name="taskPurposeId"
            label="Task purpose"
            control={form.control}
            options={taskPurposeIdOptions}
            placeholder="Select a task purpose"
          />
        )}

        {selectedPurposeId && selectedLanguageId && (
          <FormSelector
            name="taskTypeId"
            label="Task type"
            control={form.control}
            options={taskTypeIdOptions}
            placeholder="Select a task type"
          />
        )}

        {selectedLanguageId &&
          selectedPurposeId === grammarPurposeId?.toString() && (
            <FormSelector
              name="grammarRuleId"
              label="Grammar Rule"
              control={form.control}
              options={grammarRulesOptions}
              placeholder="Select a grammar rule"
            />
          )}

        <Button
          disabled={isLoading && generatedTasks.length !== 0}
          className="w-full"
        >
          Create Tasks
        </Button>
      </form>
      {generatedTasks.length > 0
        ? generatedTasks.map((task) => (
            <Fragment key={task.id}>
              <h2 className="text-2xl font-semibold my-5">Created Task:</h2>
              <div className="text-xl block bg-primary-200 border border-solid border-neutral-600 rounded-xl p-4">
                {Object.entries(task.data).map(([key, value]) => (
                  <p
                    key={key}
                    className="my-2"
                  >
                    {key}: {JSON.stringify(value)}
                  </p>
                ))}
              </div>
              <div className="flex justify-between p-2">
                <Button onClick={() => onAcceptTask(task.id)}>Accept</Button>
                <Button onClick={() => onDeleteTask(task.id)}>Delete</Button>
              </div>
            </Fragment>
          ))
        : null}
    </Form>
  );
};

export default TaskCreationForm;
