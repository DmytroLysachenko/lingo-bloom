"use client";

import { Task } from "@/types";
import QuizCreationForm from "@components/organisms/QuizCreationForm";
import QuizInterface from "@components/organisms/QuizInteface";
import React, { useState } from "react";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(tasks);
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      {tasks.length === 0 ? (
        <QuizCreationForm setTasks={setTasks} />
      ) : (
        <QuizInterface tasks={tasks} />
      )}
    </div>
  );
};

export default TasksPage;
