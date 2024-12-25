"use client";
import { Button } from "@components/ui/button";
import axios from "axios";
import React from "react";

const AdminPanel = () => {
  return (
    <div className="fixed flex flex-col gap-1 items-center top-20 right-5 bg-primary-300 bg-opacity-70 w-[20vw] h-[20vh] p-2">
      <Button
        onClick={() => {
          axios.post("/api/admin/grammar-rule", { languageCode: "pl" });
        }}
        className=" bg-secondary-400"
      >
        Create Polish lang rule (/api/admin/grammar-rule)
      </Button>
      <Button
        onClick={() => {
          axios.post("/api/admin/task/test", {
            languageCode: "pl",
            languageLevel: "A1",
            taskPurpose: "Grammar",
          });
        }}
        className=" bg-secondary-400"
      >
        Create Polish lang grammar test task (/api/admin/task/test)
      </Button>
    </div>
  );
};

export default AdminPanel;
