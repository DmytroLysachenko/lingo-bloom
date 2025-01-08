import TestInterface from "@components/organisms/TestInteface";
import { Task } from "@/schemas";
import { Test } from "@/schemas/testScheme";
import React, { useState } from "react";

interface TestPageProps {
  test: Test;
  tasks: Task[];
}

const TestPage = ({ test, tasks }: TestPageProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const handlePreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <TestInterface
        task={tasks[currentTaskIndex]}
        testId={test.id}
        onNext={handleNextTask}
        onPrevious={handlePreviousTask}
        isFirst={currentTaskIndex === 0}
        isLast={currentTaskIndex === tasks.length - 1}
      />
    </div>
  );
};

export default TestPage;
