import React from "react";
import { Input } from "@/components/ui/input";
import { type LucideIcon } from "lucide-react";
import { FieldValues, Path, Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";

interface InputWithIconProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  icon: LucideIcon;
  type?: "text" | "number" | "email";
  placeholder?: string;
  description?: string;
}

const InputWithIcon = <TFieldValues extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  placeholder = "Input here...",
  icon: Icon,
  description,
}: InputWithIconProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-primary-700">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder}
                className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
              />
              <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 h-5 w-5" />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputWithIcon;
