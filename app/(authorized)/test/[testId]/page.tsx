import TestPage from "@components/pages/TestPage";
import React from "react";

const Test = async ({ params }: { params: Promise<{ testId: string }> }) => {
  const { testId } = await params;

  return <TestPage testId={testId} />;
};

export default Test;
