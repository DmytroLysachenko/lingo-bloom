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

interface ConstantData {
  id: number;
  name: string;
}

const mockData = {
  taskTypes: [
    { id: 1, name: "Multiple Choice" },
    { id: 2, name: "Fill in the Blank" },
    { id: 3, name: "Matching" },
  ],
  languages: [
    { id: 1, name: "English" },
    { id: 2, name: "Polish" },
    { id: 3, name: "Ukrainian" },
  ],
  languageLevels: [
    { id: 1, name: "A1" },
    { id: 2, name: "A2" },
    { id: 3, name: "B1" },
    { id: 4, name: "B2" },
    { id: 5, name: "C1" },
    { id: 6, name: "C2" },
  ],
  taskTopics: [
    { id: 1, name: "Travel" },
    { id: 2, name: "Business" },
    { id: 3, name: "Medicine" },
  ],
};

const ConstantsTable = () => {
  const [activeTable, setActiveTable] =
    useState<keyof typeof mockData>("taskTypes");

  const renderTable = (data: ConstantData[]) => (
    <Table>
      <TableCaption>List of {activeTable}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
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
