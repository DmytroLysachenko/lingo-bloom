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

type FormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/register", data);

      toast({
        title: "Success!",
        description: response.data.message,
        variant: "default",
        color: "green",
      });

      reset();
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

  const password = watch("password");

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <InputWithIcon
          id="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          icon={User}
          register={register}
          errors={errors}
          validation={{
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
        />

        <InputWithIcon
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          register={register}
          errors={errors}
          validation={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          }}
        />

        <HidableInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          validation={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />

        <HidableInput
          id="repeatPassword"
          label="Repeat Password"
          placeholder="Repeat your password"
          register={register}
          errors={errors}
          validation={{
            required: "Please repeat your password",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
        />

        <Button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white"
        >
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
  );
};

export default RegisterForm;
