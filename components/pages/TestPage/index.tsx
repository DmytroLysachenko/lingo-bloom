import TestInterface from "@components/organisms/TestInteface";
import React from "react";

interface TestPageProps {
  testId: string;
}

const TestPage = ({ testId }: TestPageProps) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <TestInterface tasks={tasks} />
    </div>
  );
};

export default TestPage;
