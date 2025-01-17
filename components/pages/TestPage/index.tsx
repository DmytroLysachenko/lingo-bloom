import TaskInterface from "@components/organisms/TaskInteface";
import { Task } from "@/schemas";
import { Test } from "@/schemas/testScheme";
import React from "react";
import { Button } from "@components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TestContext } from "@components/providers/testContext";

const TaskPage = () => {
  const [currentTaskIndex, setCurrentTaskIndex] = React.useState(0);

  const { test, tasks } = React.useContext(TestContext) as {
    test: Test;
    tasks: Task[];
  };

  const handleNextQuestion = () => {
    setCurrentTaskIndex((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentTaskIndex((prev) => prev - 1);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="space-y-6 w-full max-w-2xl mx-auto">
        <TaskInterface task={tasks[currentTaskIndex]} />
        <div className="flex justify-between">
          <Button
            disabled={currentTaskIndex === 0}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full"
            onClick={handlePreviousQuestion}
          >
            <ArrowLeft />
          </Button>

          <Button
            disabled={currentTaskIndex === test.tasks.length - 1}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full"
            onClick={handleNextQuestion}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
