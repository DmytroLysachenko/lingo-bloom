"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { TestTextTaskType } from "@/schemas";
import { TestContext } from "@components/providers/testContext";

interface TextTaskProps {
  task: TestTextTaskType;
}

const TextTask = ({ task }: TextTaskProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { completeTask } = React.useContext(TestContext) as {
    completeTask: (taskId: number, score: number) => void;
  };
  const handleSubmit = () => {
    if (selectedAnswer === task.data.correctAnswer) {
      completeTask(task.id, 1);
    } else {
      completeTask(task.id, 0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 text-primary-700">{task.data.text}</div>
      <h2 className="text-2xl font-bold mb-4 text-primary-700">
        {task.data.question}
      </h2>
      <RadioGroup
        value={selectedAnswer || ""}
        onValueChange={setSelectedAnswer}
      >
        {task.data.answers.map((answer, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mb-2"
          >
            <RadioGroupItem
              value={answer}
              id={`answer-${index}`}
            />
            <Label
              htmlFor={`answer-${index}`}
              className="text-primary-600"
            >
              {answer}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Button
        onClick={handleSubmit}
        disabled={!selectedAnswer}
        className="mt-4 bg-secondary-500 hover:bg-secondary-600 text-white"
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default TextTask;
