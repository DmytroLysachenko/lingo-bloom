"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Task } from "@/types";

interface QuizInterfaceProps {
  tasks: Task[];
}

const QuizInterface = ({ tasks }: QuizInterfaceProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    new Array(tasks.length).fill(null)
  );

  const currentTask = tasks[currentTaskIndex];

  const handleAnswer = () => {
    if (selectedAnswer) {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentTaskIndex] = selectedAnswer;
      setUserAnswers(newUserAnswers);
      setAnswered(true);
    }
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
      setSelectedAnswer(userAnswers[currentTaskIndex - 1]);
      setAnswered(userAnswers[currentTaskIndex - 1] !== null);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-primary-700">
          {currentTask.question}
        </h2>
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={setSelectedAnswer}
        >
          {currentTask.answers.map((answer, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 mb-2"
            >
              <RadioGroupItem
                value={answer}
                id={`answer-${index}`}
                disabled={answered}
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
      </div>

      {answered && (
        <div
          className={`p-4 rounded-md ${
            selectedAnswer === currentTask.correctAnswer
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {selectedAnswer === currentTask.correctAnswer
            ? "Correct!"
            : `Incorrect. The correct answer is: ${currentTask.correctAnswer}`}
        </div>
      )}

      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentTaskIndex === 0}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Previous
        </Button>
        <Button
          onClick={handleAnswer}
          disabled={!selectedAnswer || answered}
          className="bg-secondary-500 hover:bg-secondary-600 text-white"
        >
          Answer
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentTaskIndex === tasks.length - 1 || !answered}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuizInterface;
