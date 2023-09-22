import React from "react";
import styled from "@emotion/styled";
import { List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";

import { ITaskListProps } from "@/interface/Todo";

const TaskList = styled(List)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 400px;
`;

const TasksList: React.FC<ITaskListProps> = ({
  tasks,
  handleChangeEditModalProps,
  handleChangeDeleteModalProps,
}) => {
  const router = useRouter();

  return (
    <TaskList>
      {tasks && tasks.length > 0 && tasks.map((task) => (
        <TaskWrapper key={task.id}>
          <ListItem>
            <ListItemText primary={task.title} />
          </ListItem>
          <ViewIcon
            style={{ cursor: "pointer", marginRight: "5px" }}
            onClick={() => {
              router.push(`/task/${task.id}`);
            }}
          />
          <EditIcon
            onClick={() =>
              handleChangeEditModalProps({
                open: true,
                task: task,
              })
            }
            style={{ cursor: "pointer" }}
          />
          <DeleteIcon
            onClick={() =>
              handleChangeDeleteModalProps({ open: true, task: task })
            }
            style={{ cursor: "pointer" }}
          />
        </TaskWrapper>
      ))}
    </TaskList>
  );
};

export default TasksList;
