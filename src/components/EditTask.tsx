import { IEditModalProps } from "@/interface/Todo";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

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

const EditTask: React.FC<IEditModalProps> = ({
  editModalProps,
  handleClose,
  editTask,
  handleChangeEditModalProps
}) => {
  return (
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
            handleChangeEditModalProps({
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
          error={editModalProps.task?.title?.trim() === ""}
          helperText={
            editModalProps.task?.title?.trim() === ""
              ? "Please Enter valid task"
              : ""
          }
        />
        <Box mt={5} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={() => handleClose()}>
            Cancel
          </Button>
          <Box ml={1}>
            <Button variant="contained" onClick={() => editTask()}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditTask;
