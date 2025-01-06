"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import axios from "axios";
import FormSelector from "@atoms/FormSelector";
import { Language, LanguageLevel } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface FormData {
  languageId: string;
  languageLevelId: string;
  quantity: string;
}

interface TestCreationFormProps {
  languageLevels: LanguageLevel[];
  languages: Language[];
}

const TestCreationForm = ({
  languageLevels,
  languages,
}: TestCreationFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();

  const languageOptions = languages.map((language) => ({
    value: language.id.toString(),
    name: language.name,
  }));

  const languageLevelsOptions = languageLevels.map((level) => ({
    value: level.id.toString(),
    name: level.name,
  }));

  const onSubmit = async (data: FormData) => {
    const numericData = {
      languageId: Number(data.languageId),
      languageLevelId: Number(data.languageLevelId),
      quantity: Number(data.quantity),
    };
    try {
      const response = await axios.post("/api/test", {
        userId: session.data?.user.id,
        ...numericData,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Here you would typically send this data to your backend or state management

  return (
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
        required
      />

      <FormSelector
        id="languageLevelId"
        label="Language Level"
        control={control}
        errors={errors}
        options={languageLevelsOptions}
        placeholder="Select a language level"
        required
      />

      <FormSelector
        id="quantity"
        label="Quantity of tasks"
        control={control}
        errors={errors}
        options={[
          { value: "5", name: "5" },
          { value: "10", name: "10" },
          { value: "15", name: "15" },
        ]}
        placeholder="Select quantity of tasks"
        required
      />

      <Button
        className="w-full bg-secondary-500 hover:bg-secondary-600 text-white !mt-12"
        disabled={isLoading}
      >
        Generate Test
      </Button>
    </form>
  );
};

export default TestCreationForm;
