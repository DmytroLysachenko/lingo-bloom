"use client";
import { Button } from "@components/ui/button";
import axios from "axios";
import React from "react";

const AdminPanel = () => {
  return (
    <div className="fixed flex flex-col items-center top-20 right-5 bg-primary-300 bg-opacity-70 w-[20vw] h-[20vh] p-2">
      <Button
        onClick={() => {
          axios.get("/api/test");
        }}
        className=" bg-secondary-400"
      >
        Action get (/api/test)
      </Button>
    </div>
  );
};

export default AdminPanel;
