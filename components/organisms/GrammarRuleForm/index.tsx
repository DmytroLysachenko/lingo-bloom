"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GrammarRuleFormData {
  languageId: string;
  title: string;
  description: string;
  example: string;
}

const GrammarRuleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GrammarRuleFormData>();

  const onSubmit = (data: GrammarRuleFormData) => {
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

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <Input
              id="title"
              {...field}
              placeholder="Enter grammar rule title"
            />
          )}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <Textarea
              id="description"
              {...field}
              placeholder="Enter grammar rule description"
            />
          )}
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="example">Example</Label>
        <Controller
          name="example"
          control={control}
          rules={{ required: "Example is required" }}
          render={({ field }) => (
            <Textarea
              id="example"
              {...field}
              placeholder="Enter grammar rule example"
            />
          )}
        />
        {errors.example && (
          <p className="text-destructive text-sm">{errors.example.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        Create Grammar Rule
      </Button>
    </form>
  );
};

export default GrammarRuleForm;
