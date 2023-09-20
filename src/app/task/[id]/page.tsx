"use client";

import { ITaskDetailProps } from "@/interface/Todo";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Task } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;


const TaskDetails: React.FC<ITaskDetailProps> = ({ params }) => {
  const { id } = useParams();
  const [task, setTask] = useState<Task>();

  const getTaskById = async () => {
    await fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((res) => setTask(res));
  };

  useEffect(() => {
    getTaskById();
  }, []);

  return (
    <CenteredContainer>
      <Typography variant="h6" component="h2" mb={5}>
        Task Details
      </Typography>
      <Box>Title : {task?.title}</Box>
    </CenteredContainer>
  );
};

export default TaskDetails;
