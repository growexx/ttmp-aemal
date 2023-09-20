"use client";

import React, { useState, useEffect } from "react";
import { Task } from "@prisma/client";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

import TaskList from "./TaskList";
import { IModalProps, ITodoProps } from "@/interface/Todo";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import AddTask from "./AddTask";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
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

const Todo: React.FC<ITodoProps> = ({ prisma }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newTaskError, setNewTaskError] = useState<boolean>(false);
  const [editModalProps, setEditModalProps] = useState<IModalProps>({
    open: false,
    task: {
      id: null,
      title: null,
    },
  });
  const [deleteModalProps, setDeleteModalProps] = useState<IModalProps>({
    open: false,
    task: {
      id: null,
      title: null,
    },
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await fetch("/api/tasks").then((res) => res.json());
    setTasks(fetchedTasks);
  };

  const addTask = async () => {
    if (newTask.trim() === "") {
      setNewTaskError(true);
      return;
    }
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTask }),
    }).then((res) => res.json());
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async () => {
    await fetch(`/api/tasks/${deleteModalProps.task.id}`, {
      method: "DELETE",
    }).then((res) => res.json());
    fetchTasks();
    setDeleteModalProps({
      open: false,
      task: {
        id: null,
        title: null,
      },
    });
  };

  const editTask = async () => {
    if (editModalProps?.task?.title?.trim() === "") return;
    await fetch(`/api/tasks/${editModalProps.task.id}`, {
      method: "PUT",
      body: JSON.stringify({ title: editModalProps.task.title }),
    }).then((res) => res.json());
    setEditModalProps({
      open: false,
      task: {
        id: null,
        title: null,
      },
    });
    fetchTasks();
  };

  const handleClose = () =>
    setEditModalProps({
      open: false,
      task: {
        id: null,
        title: null,
      },
    });

  const handleDeleteClose = () =>
    setDeleteModalProps({
      open: false,
      task: {
        id: null,
        title: null,
      },
    });

  const handleChangeEditModalProps = (task: IModalProps) => {
    setEditModalProps(task);
  };

  const handleChangeDeleteModalProps = (task: IModalProps) => {
    setDeleteModalProps(task);
  };

  const handleChangeNewTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskError(false);
    setNewTask(e.target.value);
  };

  return (
    <>
      <DeleteTask
        deleteModalProps={deleteModalProps}
        handleDeleteClose={handleDeleteClose}
        deleteTask={deleteTask}
      />

      <EditTask
        editModalProps={editModalProps}
        handleClose={handleClose}
        editTask={editTask}
        handleChangeEditModalProps={handleChangeEditModalProps}
      />

      <CenteredContainer>
        <AddTask
          handleChangeNewTask={handleChangeNewTask}
          newTask={newTask}
          addTask={addTask}
          newTaskError={newTaskError}
        />
        <TaskList
          tasks={tasks}
          handleChangeEditModalProps={handleChangeEditModalProps}
          handleChangeDeleteModalProps={handleChangeDeleteModalProps}
        />
      </CenteredContainer>
    </>
  );
};

export default Todo;
