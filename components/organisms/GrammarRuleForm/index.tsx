"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Language } from "@/types";
import FormSelector from "@components/molecules/FormSelector";
import axios from "axios";
import { useState } from "react";

interface GrammarRuleFormData {
  languageId: string;
}

interface GrammarRuleFormProps {
  languages: Language[];
}

const GrammarRuleForm = ({ languages }: GrammarRuleFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GrammarRuleFormData>();

  const [generatedRule, setGeneratedRule] = useState<{
    languageId: number;
    data: string;
    id: number;
  }>();

  const languageOptions = languages.map((language) => ({
    value: language.id.toString(),
    name: language.name,
  }));

  const onSubmit = async (data: GrammarRuleFormData) => {
    const languageId = Number(data.languageId);

    const response = await axios.post("/api/admin/grammar-rule", {
      languageId,
    });
    setGeneratedRule(response.data.newRule);
  };

  const onAcceptRule = async () => {
    await axios.patch("/api/admin/grammar-rule", {
      ...generatedRule,
      checked: true,
    });
    setGeneratedRule(undefined);
  };

  const onDeleteRule = async () => {
    await axios.delete("/api/admin/grammar-rule", {
      data: { id: generatedRule?.id },
    });
    setGeneratedRule(undefined);
  };

  return (
    <>
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
          placeholder="Select a language"
        />

        <Button
          type="submit"
          className="w-full"
        >
          Create Grammar Rule
        </Button>
      </form>
      {generatedRule ? (
        <>
          <h2 className="text-2xl font-semibold my-5">Created Rule:</h2>
          <p className="text-xl block bg-primary-200 border border-solid border-neutral-600 rounded-xl p-4">
            {JSON.stringify(generatedRule.data)}
          </p>
          <div className="flex justify-between p-2">
            <Button onClick={onAcceptRule}>Accept</Button>
            <Button onClick={onDeleteRule}>Delete</Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default GrammarRuleForm;
