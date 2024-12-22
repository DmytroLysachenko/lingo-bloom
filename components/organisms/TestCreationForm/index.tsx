"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Task } from "@/types";

interface FormData {
  difficulty: string;
  quantity: string;
  taskType: string;
}

const TestCreationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await axios.post("/api/test", data);
  };
  // Here you would typically send this data to your backend or state management

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-md mx-auto"
    >
      <div className="space-y-2">
        <Label
          htmlFor="difficulty"
          className="text-primary-700"
        >
          Polish Difficulty Level
        </Label>
        <Controller
          name="difficulty"
          control={control}
          rules={{ required: "Difficulty level is required" }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger
                id="difficulty"
                className="w-full border-primary-200 focus:border-primary-500 focus:ring-primary-500"
              >
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A1">A1</SelectItem>
                <SelectItem value="A2">A2</SelectItem>
                <SelectItem value="B1">B1</SelectItem>
                <SelectItem value="B2">B2</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.difficulty && (
          <p className="text-destructive text-sm">
            {errors.difficulty.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="quantity"
          className="text-primary-700"
        >
          Number of Questions
        </Label>
        <Controller
          name="quantity"
          control={control}
          rules={{ required: "Number of questions is required" }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger
                id="quantity"
                className="w-full border-primary-200 focus:border-primary-500 focus:ring-primary-500"
              >
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.quantity && (
          <p className="text-destructive text-sm">{errors.quantity.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="taskType"
          className="text-primary-700"
        >
          Task Targeting
        </Label>
        <Controller
          name="taskType"
          control={control}
          rules={{ required: "Task type is required" }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger
                id="taskType"
                className="w-full border-primary-200 focus:border-primary-500 focus:ring-primary-500"
              >
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vocabulary">Vocabulary</SelectItem>
                <SelectItem value="grammar">Grammar</SelectItem>
                <SelectItem value="textUnderstanding">
                  Text Understanding
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.taskType && (
          <p className="text-destructive text-sm">{errors.taskType.message}</p>
        )}
      </div>

      <Button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white !mt-12">
        Generate Test
      </Button>
    </form>
  );
};

export default TestCreationForm;
