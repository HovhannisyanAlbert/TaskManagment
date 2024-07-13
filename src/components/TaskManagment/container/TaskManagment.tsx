import React from "react";
import CreateTask from "../components/CreateTask";
import styles from "./taskManagment.module.css";
import { useTasks } from "../store/selectors";
import TaskCard from "../components/TaskCard";
import { useDispatch } from "react-redux";

import { ITask } from "../store/types";
import { Link } from "react-router-dom";
import { addToCompleted, deleteTask } from "../store/slice/taskManagmentSlice";

export const TaskManagment = () => {
  const tasks = useTasks();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const onMarkComplete = (task: ITask) => {
    dispatch(addToCompleted(task));
  };

  return (
    <div className={styles.taskManagementWrapper}>
      <div className={styles.createTaskWrapper}>
        <CreateTask />
      </div>

      <div className={styles.taskWrapper}>
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onMarkComplete={onMarkComplete}
            />
          ))}
      </div>

      <div className={styles.trashWrapper}>
        <Link to="/trash" className={styles.trashLink}>
          Trash
        </Link>
      </div>
    </div>
  );
};
