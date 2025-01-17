"use client";

import { useForm } from "react-hook-form";
import { Mail, Github, ChromeIcon as Google } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import HidableInput from "@atoms/HidableInput";
import InputWithIcon from "@atoms/InputWithIcon";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@components/ui/form";

enum Error {
  CredentialsSignin = "CredentialsSignin",
  Unknown = "Unknown",
}

const errorMap = {
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const search = useSearchParams();
  const error = search.get("error") as Error;

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <InputWithIcon
            name="email"
            label="Email"
            type="email"
            control={form.control}
            placeholder="Enter your email"
            icon={Mail}
          />

          <HidableInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            control={form.control}
          />

          <Button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white"
          >
            Log in
          </Button>
        </form>
      </Form>

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
