import TaskInterface from "@components/organisms/TaskInteface";
import { Task } from "@/schemas";
import { Test } from "@/schemas/testScheme";
import React from "react";
import { Button } from "@components/ui/button";
import Form from "next/form";
import { ArrowLeft, ArrowRight } from "lucide-react";
interface TaskPageProps {
  test: Test;
  task: Task;
  taskIndex: number;
}

const TaskPage = ({
  test,
  task,
  taskIndex: currentTaskIndex,
}: TaskPageProps) => {
  const isFirst = currentTaskIndex === 0;
  const isLast = currentTaskIndex === test.tasks.length - 1;

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="space-y-6 w-full max-w-2xl mx-auto">
        <TaskInterface task={task} />
        <div className="flex justify-between">
          <Form action={`/test/${test.id}/${Number(currentTaskIndex) - 1}`}>
            <Button
              disabled={isFirst}
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-full"
            >
              <ArrowLeft />
            </Button>
          </Form>
          <Form action={`/test/${test.id}/${Number(currentTaskIndex) + 1}`}>
            <Button
              disabled={isLast}
              className="bg-primary-500 hover:bg-primary-600 text-white rounded-full"
            >
              <ArrowRight />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
