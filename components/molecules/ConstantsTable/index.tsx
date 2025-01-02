"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Language,
  LanguageLevel,
  TaskPurpose,
  TaskTopic,
  TaskType,
} from "@prisma/client";

interface ConstantsTableProps {
  mockData: {
    taskTopics: TaskTopic[];
    languageLevels: LanguageLevel[];
    languages: Language[];
    taskPurposes: TaskPurpose[];
    taskTypes: TaskType[];
  };
}
interface ConstantData {
  id: number;
  name: string;
}

const ConstantsTable = ({ mockData }: ConstantsTableProps) => {
  const [activeTable, setActiveTable] =
    useState<keyof typeof mockData>("taskTypes");

  const renderTable = (data: ConstantData[]) => (
    <Table>
      <TableCaption>List of {activeTable}</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(data[0]).map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {Object.values(item).map((value, index) => (
              <TableCell key={value + index}>{JSON.stringify(value)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        {Object.keys(mockData).map((key) => (
          <Button
            key={key}
            onClick={() => setActiveTable(key as keyof typeof mockData)}
            variant={activeTable === key ? "default" : "outline"}
          >
            {key}
          </Button>
        ))}
      </div>
      {renderTable(mockData[activeTable])}
    </div>
  );
};

export default ConstantsTable;
