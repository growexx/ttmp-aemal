"use client";

import React, { useState, useEffect } from "react";
import { Task, PrismaClient } from "@prisma/client";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TodoProps {
  prisma: PrismaClient;
}

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

interface ModalProps {
  open: boolean;
  task: {
    id: number | null;
    title: string | null;
  };
}

const Todo: React.FC<TodoProps> = ({ prisma }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editModalProps, setEditModalProps] = useState<ModalProps>({
    open: false,
    task: {
      id: null,
      title: null,
    },
  });
  const [deleteModalProps, setDeleteModalProps] = useState<ModalProps>({
    open: false,
    task: {
      id: null,
      title: null,
    },
  });

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

  return (
    <>
      <Modal open={deleteModalProps.open} onClose={() => handleDeleteClose()}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={5}>
            Delete Task
          </Typography>
          <Typography variant="body1" component="p" mb={4}>
            Are you sure you want to delete this task?
          </Typography>
          <Box>
            <Button onClick={() => handleDeleteClose()}>No</Button>
            <Button onClick={() => deleteTask()}>Yes</Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={editModalProps.open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={5}>
            Edit Task
          </Typography>
          <TextField
            autoFocus
            variant="outlined"
            value={editModalProps.task?.title}
            onChange={(e) => {
              setEditModalProps({
                ...editModalProps,
                task: {
                  ...editModalProps.task,
                  title: e.target.value,
                },
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") editTask();
            }}
          />
          <Box mt={5}>
            <Button onClick={() => handleClose()}>Cancel</Button>
            <Button onClick={() => editTask()}>Submit</Button>
          </Box>
        </Box>
      </Modal>

      <CenteredContainer>
        <h1>To-Do App</h1>
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
                onClick={() =>
                  setEditModalProps({
                    open: true,
                    task: task,
                  })
                }
                style={{ cursor: "pointer" }}
              />
              <DeleteIcon
                onClick={() => setDeleteModalProps({ open: true, task: task })}
                style={{ cursor: "pointer" }}
              />
            </TaskWrapper>
          ))}
        </TaskList>
      </CenteredContainer>
    </>
  );
};

export default Todo;
