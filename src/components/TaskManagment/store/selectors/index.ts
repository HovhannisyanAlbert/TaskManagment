import { useSelector } from "react-redux";
import { RootState } from "../../../../features/store";

export const useTasks = () =>
  useSelector((state: RootState) => state.task.taskData);

export const useDeletedTasks = () =>
  useSelector((state: RootState) => state.task.deletedTasks);
