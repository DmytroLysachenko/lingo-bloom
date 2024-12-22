import TestPage from "@components/pages/TestPage";
import React from "react";

interface TestProps {
  params: { testId: string };
}

const Test = async ({ params }: TestProps) => {
  const { testId } = await params;

  return <TestPage testId={testId} />;
};

export default Test;
