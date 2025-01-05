"use client";

import { useForm } from "react-hook-form";
import { Mail, Github, ChromeIcon as Google } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import HidableInput from "@atoms/HidableInput";
import InputWithIcon from "@atoms/InputWithIcon";

interface FormData {
  email: string;
  password: string;
}

enum Error {
  Configuration = "Configuration",
  CredentialsSignin = "CredentialsSignin",
  Unknown = "Unknown",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="rounded-sm bg-primary-100 p-1 text-xs font-mono">
        Configuration
      </code>
    </p>
  ),
  [Error.CredentialsSignin]: (
    <p>
      This mail is already registered through OAuth, try to log in with
      google/github
    </p>
  ),
  [Error.Unknown]: (
    <p>
      An unknown error occurred. Please contact support if this problem
      persists.
    </p>
  ),
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const search = useSearchParams();
  const error = search.get("error") as Error;

  const onSubmit = async (data: FormData) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleGitHubLogin = () => {
    signIn("github", { redirectTo: "/dashboard" });
  };
  const handleGoogleLogin = () => {
    signIn("google", { redirectTo: "/dashboard" });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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

        <Button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white"
        >
          Log in
        </Button>
      </form>{" "}
      <div className="text-destructive mb-4">
        {error &&
          (errorMap[error] || "Please contact us if this error persists.")}
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-primary-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-primary-500">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          className="border-primary-200 text-primary-700 hover:bg-primary-50"
          onClick={handleGitHubLogin}
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="border-primary-200 text-primary-700 hover:bg-primary-50"
          onClick={handleGoogleLogin}
        >
          <Google className="h-5 w-5" />
        </Button>
      </div>
      <div className="text-center">
        <p className="text-sm text-primary-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary-700 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
