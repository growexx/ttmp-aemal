import { PrismaClient, Task } from "@prisma/client";

export interface IModalProps extends ITask {
  open: boolean;
}

export interface ITask {
  task: {
    id: number | null;
    title: string | null;
  };
}

export interface ITodoProps {
  prisma: PrismaClient;
}

export interface ITaskListProps {
  tasks: Task[];
  handleChangeEditModalProps: (props: IModalProps) => void;
  handleChangeDeleteModalProps: (props: IModalProps) => void;
}

export interface IDeleteModalProps {
  deleteModalProps: IModalProps;
  handleDeleteClose: () => void;
  deleteTask: () => void;
}

export interface IEditModalProps {
  editModalProps: IModalProps;
  handleClose: () => void;
  editTask: () => void;
  handleChangeEditModalProps: (props: IModalProps) => void;
}

export interface IAddTaskProps {
  newTaskError: boolean;
  addTask: () => void;
  handleChangeNewTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newTask: string;
}

export interface ITaskDetailProps {
  params: {
    id: number;
  };
}
