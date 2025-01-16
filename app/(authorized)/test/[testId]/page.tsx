"use client";

import TestPage from "@components/pages/TestPage";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => () => {}, []);
  return <TestPage />;
};

export default Page;
