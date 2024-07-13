import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, ITask, StatusTask } from "../types";
import { isDeadlinePassed } from "../../../../untill";

const initialState: IInitialState = {
  taskData: [],
  deletedTasks: [],
};

const taskManagmentSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, { payload }: PayloadAction<ITask>) => {
      state.taskData.push(payload);
    },
    deleteTask: (state, { payload }: PayloadAction<string>) => {
      const removedItem = state.taskData.find((task) => task.id === payload);

      if (removedItem) {
        const newTaskAfterRemove: ITask = {
          ...removedItem,
          status: StatusTask.REMOVED,
        };
        state.deletedTasks.push(newTaskAfterRemove);
        state.taskData = state.taskData.filter((task) => task.id !== payload);
      }
    },
    editTask: (state, { payload }: PayloadAction<ITask>) => {
      const index = state.taskData.findIndex((task) => task.id === payload.id);

      if (index !== -1) {
        state.taskData[index] = {
          ...state.taskData[index],
          ...payload,
          status:
            payload.status === StatusTask.PENDING &&
            !isDeadlinePassed(payload.deadline)
              ? StatusTask.PENDING
              : isDeadlinePassed(payload.deadline)
              ? StatusTask.OVERDUE
              : StatusTask.COMPLETED,
        };
      }
    },
    addToCompleted: (state, { payload }: PayloadAction<ITask>) => {
      const index = state.taskData.findIndex((task) => task.id === payload.id);
      if (index !== -1) {
        state.taskData[index] = {
          ...state.taskData[index],
          status: StatusTask.COMPLETED,
        };
      }
    },
    overdueTask: (state, { payload }: PayloadAction<string>) => {
      const index = state.taskData.findIndex((task) => task.id === payload);
      if (index !== -1) {
        state.taskData[index].status = StatusTask.OVERDUE;
      }
    },
  },
});
export const { addTask, deleteTask, editTask, addToCompleted, overdueTask } =
  taskManagmentSlice.actions;
export default taskManagmentSlice;
