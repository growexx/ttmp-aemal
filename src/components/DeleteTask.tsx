import { IDeleteModalProps, IModalProps } from "@/interface/Todo";
import { Box, Button, Modal, Typography } from "@mui/material";
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

const DeleteTask: React.FC<IDeleteModalProps> = ({
  deleteModalProps,
  handleDeleteClose,
  deleteTask,
}) => {
  return (
    <Modal open={deleteModalProps.open} onClose={() => handleDeleteClose()}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={5}>
          Delete Task
        </Typography>
        <Typography variant="body1" component="p" mb={4}>
          Are you sure you want to delete this task?
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={() => handleDeleteClose()}>
            Cancel
          </Button>
          <Box ml={1}>
            <Button variant="contained" onClick={() => deleteTask()}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTask;
