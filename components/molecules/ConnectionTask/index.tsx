"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ConnectionTaskType } from "@/schemas";

interface ConnectionTaskProps {
  task: ConnectionTaskType;
}

const ConnectionTask = ({ task }: ConnectionTaskProps) => {
  const [connections, setConnections] = useState<
    { columnAIndex: number; columnBIndex: number }[]
  >([]);
  const [selectedA, setSelectedA] = useState<number | null>(null);

  const handleColumnAClick = (index: number) => {
    setSelectedA(index);
  };

  const handleColumnBClick = (index: number) => {
    if (selectedA !== null) {
      setConnections([
        ...connections,
        { columnAIndex: selectedA, columnBIndex: index },
      ]);
      setSelectedA(null);
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-primary-700">
        Connect the matching items
      </h2>
      <div className="flex justify-between">
        <div className="w-1/2">
          {task.data.columnA.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleColumnAClick(index)}
              className={`mb-2 w-full ${
                selectedA === index ? "bg-secondary-500" : "bg-primary-500"
              }`}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="w-1/2">
          {task.data.columnB.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleColumnBClick(index)}
              className="mb-2 w-full bg-primary-500"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={connections.length !== task.data.columnA.length}
        className="mt-4 bg-secondary-500 hover:bg-secondary-600 text-white"
      >
        Submit Answer
      </Button>
    </div>
  );
};

export default ConnectionTask;
