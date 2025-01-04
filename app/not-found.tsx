import Link from "next/link";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 px-4">
      <Frown className="w-20 h-20 text-primary-500 mb-8" />
      <h1 className="text-4xl font-bold text-primary-700 mb-4 text-center font-heading">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-primary-600 mb-8 text-center max-w-md">
        Oops! It seems the language lesson you&apos;re looking for has gotten
        lost in translation.
      </p>
      <Button
        asChild
        className="bg-secondary-500 hover:bg-secondary-600 text-white"
      >
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFound;
