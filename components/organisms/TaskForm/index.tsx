"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFormData {
  languageId: string;
  taskTypeId: string;
  taskPurposeId: string;
  taskTopicId: string;
  languageLevelId: string;
  grammarRuleId: string;
  data: string;
}

const TaskForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    console.log(data);
    // Here you would typically send this data to your API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="languageId">Language</Label>
        <Controller
          name="languageId"
          control={control}
          rules={{ required: "Language is required" }}
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger id="languageId">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">English</SelectItem>
                <SelectItem value="2">Polish</SelectItem>
                {/* Add more languages as needed */}
              </SelectContent>
            </Select>
          )}
        />
        {errors.languageId && (
          <p className="text-destructive text-sm">
            {errors.languageId.message}
          </p>
        )}
      </div>

      {/* Repeat similar structure for taskTypeId, taskPurposeId, taskTopicId, languageLevelId, grammarRuleId */}

      <div className="space-y-2">
        <Label htmlFor="data">Task Data (JSON)</Label>
        <Controller
          name="data"
          control={control}
          rules={{ required: "Task data is required" }}
          render={({ field }) => (
            <Input
              id="data"
              {...field}
              placeholder="Enter task data as JSON"
            />
          )}
        />
        {errors.data && (
          <p className="text-destructive text-sm">{errors.data.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Create Task
      </Button>
    </form>
  );
};

export default TaskForm;
