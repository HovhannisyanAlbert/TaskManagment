export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: StatusTask;
}

export interface IInitialState {
  taskData: ITask[];
  deletedTasks: ITask[];
}

export enum StatusTask {
  PENDING = "Pending",
  COMPLETED = "Completed",
  OVERDUE = "Overdue",
  REMOVED = "Removed",
}
