"use client";

import { Suspense } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorContent = () => {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-primary-500 p-4">
        <h5 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Authentication Error
        </h5>
      </div>
      <div className="p-6">
        <div className="text-primary-700 mb-4">
          <p>
            An unknown error occurred. Please contact support if this problem
            persists.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            asChild
            variant="outline"
          >
            <Link href="/login">Try Again</Link>
          </Button>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-primary-50 px-4">
      <Suspense
        fallback={<div className="text-primary-700 text-lg">Loading...</div>}
      >
        <ErrorContent />
      </Suspense>
    </div>
  );
};

export default ErrorPage;
