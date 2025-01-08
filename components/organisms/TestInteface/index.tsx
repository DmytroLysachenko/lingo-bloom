"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ConnectionTaskType,
  FillInBlankTaskType,
  Task,
  TestTaskType,
  TestTextTaskType,
} from "@/schemas";
import MultipleChoiceTask from "@components/molecules/MultipleChoiceTask";
import TextTask from "@components/molecules/TextTask";
import ConnectionTask from "@components/molecules/ConnectionTask";
import FillInBlankTask from "@components/molecules/FillInBlankTask";

interface TestInterfaceProps {
  task: Task;
  testId: string;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const TestInterface = ({
  task,
  // testId,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: TestInterfaceProps) => {
  const [answered, setAnswered] = useState(false);

  const handleAnswer = async () => {
    setAnswered(true);
    // TODO: Implement API call to update task status
    // Example:
    // await updateTaskStatus(testId, task.id, answer)
  };

  const renderTask = () => {
    if ("text" in task.data) {
      return (
        <TextTask
          task={task as TestTextTaskType}
          onAnswer={handleAnswer}
        />
      );
    } else if ("matches" in task.data) {
      return (
        <ConnectionTask
          task={task as ConnectionTaskType}
          onAnswer={handleAnswer}
        />
      );
    } else if ("blanks" in task.data) {
      return (
        <FillInBlankTask
          task={task as FillInBlankTaskType}
          onAnswer={handleAnswer}
        />
      );
    } else if ("answers" in task.data && !("text" in task.data)) {
      return (
        <MultipleChoiceTask
          task={task as TestTaskType}
          onAnswer={handleAnswer}
        />
      );
    }

    return <div>Unknown task type</div>;
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      {renderTask()}
      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          disabled={isFirst}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Previous
        </Button>
        <Button
          onClick={onNext}
          disabled={isLast || !answered}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TestInterface;
