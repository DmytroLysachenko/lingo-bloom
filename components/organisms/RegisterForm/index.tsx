"use client";

import { useForm } from "react-hook-form";
import { Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import HidableInput from "@atoms/HidableInput";
import InputWithIcon from "@atoms/InputWithIcon";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long")
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase letter",',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase letter",',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Password must contain at least one number",
      })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await axios.post("/api/auth/register", values);

      toast({
        title: "Success!",
        description: response.data.message,
        variant: "default",
        color: "green",
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unknown error occurred",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md mx-auto space-y-8">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <InputWithIcon
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            icon={User}
            control={form.control}
          />

          <InputWithIcon
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            control={form.control}
          />

          <HidableInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            control={form.control}
          />

          <HidableInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            control={form.control}
          />

          <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white">
            Register
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-primary-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-700 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </Form>
  );
};

export default RegisterForm;
