import React, { FC, useEffect, useState } from "react";
import { ITask, StatusTask } from "../../store/types";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

import EditTaskModal from "../EditTaskModal";
import { editTask, overdueTask } from "../../store/slice/taskManagmentSlice";
import { useDispatch } from "react-redux";
import { isDeadlinePassed } from "../../../../untill";
import styles from "./taskCard.module.css";

interface TaskCardProps {
  task: ITask;
  onDelete: (id: string) => void;
  onMarkComplete: (task: ITask) => void;
}

export const TaskCard: FC<TaskCardProps> = ({
  task,
  onDelete,
  onMarkComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const { id, title, description, deadline, status } = task;

  useEffect(() => {
    if (status !== StatusTask.COMPLETED && isDeadlinePassed(deadline)) {
      dispatch(overdueTask(id));
    }
  }, [deadline, status, task, dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
  };

  const handleSaveEditedTask = (updatedTask: ITask) => {
    dispatch(editTask(updatedTask));
  };

  return (
    <Box className={styles.taskCardWrapper}>
      <Card className={styles.taskCard} elevation={0}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            className={styles.taskCardTitle}
          >
            Title: {title}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className={styles.taskCardDescription}
          >
            Description: {description}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className={styles.taskCardDeadline}
          >
            Deadline: {deadline}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className={`${styles.taskCardStatus} ${
              status === StatusTask.PENDING
                ? styles.taskCardStatusPending
                : status === StatusTask.COMPLETED
                ? styles.taskCardStatusCompleted
                : styles.taskCardStatusOverdue
            }`}
          >
            Status: {status}
          </Typography>
          <Box className={styles.buttonGroup}>
            <Button
              variant="contained"
              color="primary"
              className={`${styles.taskCardButton} ${styles.taskCardButtonEdit}`}
              onClick={handleEditClick}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              className={`${styles.taskCardButton} ${styles.taskCardButtonDelete}`}
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
            {status === StatusTask.PENDING && (
              <Button
                variant="contained"
                color="success"
                className={`${styles.taskCardButton} ${styles.taskCardButtonComplete}`}
                onClick={() => onMarkComplete(task)}
                disabled={isDeadlinePassed(deadline)}
              >
                Mark as Complete
              </Button>
            )}
          </Box>
          <EditTaskModal
            task={task}
            open={isEditing}
            onClose={handleCloseEditModal}
            onSave={handleSaveEditedTask}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskCard;
