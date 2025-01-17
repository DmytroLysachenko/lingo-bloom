"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormSelector from "@atoms/FormSelector";
import axios from "axios";
import { useState } from "react";
import { Language } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";

const grammarRuleCreationSchema = z.object({
  languageId: z.string().min(1, "Please select a language"),
});

interface GrammarRuleFormProps {
  languages: Language[];
}

const GrammarRuleForm = ({ languages }: GrammarRuleFormProps) => {
  const form = useForm<z.infer<typeof grammarRuleCreationSchema>>({
    resolver: zodResolver(grammarRuleCreationSchema),
    defaultValues: {
      languageId: "",
    },
  });

  const [generatedRule, setGeneratedRule] = useState<{
    languageId: number;
    data: string;
    id: number;
  }>();

  const languageOptions = languages.map((language) => ({
    value: language.id.toString(),
    name: language.name,
  }));

  const onSubmit = async (
    values: z.infer<typeof grammarRuleCreationSchema>
  ) => {
    const languageId = Number(values.languageId);

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

          <Button
            type="submit"
            className="w-full"
          >
            Create Grammar Rule
          </Button>
        </form>
      </Form>
      {generatedRule ? (
        <>
          <h2 className="text-2xl font-semibold my-5">Created Rule:</h2>
          <div className="text-xl block bg-primary-200 border border-solid border-neutral-600 rounded-xl p-4">
            {Object.entries(generatedRule.data).map(([key, value]) => (
              <p
                key={key}
                className="my-2"
              >
                {key}: {JSON.stringify(value)}
              </p>
            ))}
          </div>
          <div className="flex justify-between p-2">
            <Button
              type="button"
              onClick={onAcceptRule}
            >
              Accept
            </Button>
            <Button
              type="button"
              onClick={onDeleteRule}
            >
              Delete
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default GrammarRuleForm;
