"use client";

import React, { useState, useEffect } from "react";
import { Task, PrismaClient } from "@prisma/client";
import { Button, Input, List, ListItem, ListItemText } from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TodoProps {
  prisma: PrismaClient;
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const TaskList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
`;

const Todo: React.FC<TodoProps> = ({ prisma }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const fetchTasks = async () => {
    const fetchedTasks = await fetch("/api/tasks").then((res) => res.json());
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === "") return;
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
    }).then((res) => res.json());
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    fetchTasks();
  };

  const editTask = async (id: number) => {
    const newTitle = prompt("Enter a new task title");
    if (newTitle) {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: newTitle }),
      }).then((res) => res.json());
      fetchTasks();
    }
  };

  return (
    <CenteredContainer>
      <h1>To-Do List</h1>
      <Input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />
      <StyledButton variant="contained" onClick={addTask} color="primary">
        Add Task
      </StyledButton>
      <TaskList>
        {tasks.map((task) => (
          <TaskWrapper key={task.id}>
            <ListItem>
              <ListItemText primary={task.title} />
            </ListItem>
            <EditIcon
              onClick={() => editTask(task.id)}
              style={{ cursor: "pointer" }}
            />
            <DeleteIcon
              onClick={() => deleteTask(task.id)}
              style={{ cursor: "pointer" }}
            />
          </TaskWrapper>
        ))}
      </TaskList>
    </CenteredContainer>
  );
};

export default Todo;
