"use client";

import { Test } from "@/schemas/testScheme";
import { Button } from "@components/ui/button";
import Link from "next/link";

interface UserCurrentTestProgressProps {
  test: Test;
}

const UserCurrentTestProgress = ({ test }: UserCurrentTestProgressProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-primary-700 mb-4">
        Current Test Progress
      </h3>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-primary-600">Progress</span>
          <span className="text-sm font-medium text-primary-600">
            {test?.progress}%
          </span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-2.5">
          <div
            className="bg-secondary-500 h-2.5 rounded-full"
            style={{ width: `${test!.progress}%` }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-primary-600">
        Completed {(test!.progress * test!.totalTasks) / 100} out of{" "}
        {test?.totalTasks} tasks
      </p>

      <Button
        asChild
        className="w-full sm:w-auto bg-secondary-500 hover:bg-secondary-600 text-white ml-auto mt-4"
      >
        <Link href={`/test/${test!.id}`}>Continue test...</Link>
      </Button>
    </div>
  );
};

export default UserCurrentTestProgress;
