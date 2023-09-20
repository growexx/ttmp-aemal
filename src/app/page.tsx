"use client";

import React from "react";
import { PrismaClient } from "@prisma/client";

import Todo from "@/components/Todo";

const prisma = new PrismaClient();

const Home: React.FC = () => {
  return <Todo prisma={prisma} />;
};

export default Home;
