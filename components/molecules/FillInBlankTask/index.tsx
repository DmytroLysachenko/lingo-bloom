import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FillInBlankTaskType } from "@/schemas";

interface FillInBlankTaskProps {
  task: FillInBlankTaskType;
  onAnswer: (answer: string[]) => void;
}

const FillInBlankTask = ({ task, onAnswer }: FillInBlankTaskProps) => {
  const [answers, setAnswers] = useState<string[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onAnswer(answers);
  };

  const renderQuestion = () => {
    const parts = task.data.question.split("___");
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <Input
            value={answers[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="inline-block w-24 mx-1"
          />
        )}
      </span>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary-700">
        Fill in the blanks
      </h2>
      <div className="mb-4 text-primary-700">{renderQuestion()}</div>
      <Button
        onClick={handleSubmit}
        disabled={answers.some((answer) => answer === "")}
        className="mt-4 bg-secondary-500 hover:bg-secondary-600 text-white"
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default FillInBlankTask;
