import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import React from "react";

import { IAddTaskProps } from "@/interface/Todo";

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const AddTask: React.FC<IAddTaskProps> = ({
  newTaskError,
  addTask,
  handleChangeNewTask,
  newTask,
}) => {
  return (
    <>
      <h1>To-Do App</h1>
      <TextField
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={handleChangeNewTask}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
        error={newTaskError}
        helperText={newTaskError ? "Please Enter valid task" : ""}
      />
      <StyledButton variant="contained" onClick={addTask} color="primary">
        Add Task
      </StyledButton>
    </>
  );
};

export default AddTask;
