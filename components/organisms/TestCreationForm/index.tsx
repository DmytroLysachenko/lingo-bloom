"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormSelector from "@atoms/FormSelector";
import { Language, LanguageLevel } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const testCreationSchema = z.object({
  languageId: z.string().min(1, "Please select a language"),
  languageLevelId: z.string().min(1, "Please select a language level"),
  quantity: z.string().min(1, "Please select the quantity of tasks"),
});

interface TestCreationFormProps {
  languageLevels: LanguageLevel[];
  languages: Language[];
}

const TestCreationForm = ({
  languageLevels,
  languages,
}: TestCreationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof testCreationSchema>>({
    resolver: zodResolver(testCreationSchema),
    defaultValues: {
      languageId: "",
      languageLevelId: "",
      quantity: "",
    },
  });

  const languageOptions = languages.map((language) => ({
    value: language.id.toString(),
    name: language.name,
  }));

  const languageLevelsOptions = languageLevels.map((level) => ({
    value: level.id.toString(),
    name: level.name,
  }));

  const quantityOptions = [
    { value: "5", name: "5" },
    { value: "10", name: "10" },
    { value: "15", name: "15" },
  ];

  const onSubmit = async (values: z.infer<typeof testCreationSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/test", {
        userId: session?.user.id,
        languageId: Number(values.languageId),
        languageLevelId: Number(values.languageLevelId),
        quantity: Number(values.quantity),
      });

      router.push(`/test/${response.data.newTest.id}`);

      // Here you can add logic to redirect to the test page or update the UI
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your test. Please try again.",
        variant: "destructive",
      });
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
          name="languageLevelId"
          label="Language Level"
          control={form.control}
          options={languageLevelsOptions}
          placeholder="Select a language level"
        />

        <FormSelector
          name="quantity"
          label="Quantity of tasks"
          control={form.control}
          options={quantityOptions}
          placeholder="Select quantity of tasks"
        />

        <Button
          type="submit"
          className="w-full bg-secondary-500 hover:bg-secondary-600 text-white !mt-12"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Test"}
        </Button>
      </form>
    </Form>
  );
};

export default TestCreationForm;
