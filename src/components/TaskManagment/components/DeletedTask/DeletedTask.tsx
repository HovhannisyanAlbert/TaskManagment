import React from "react";
import { useDeletedTasks } from "../../store/selectors";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import styles from "./deletedTask.module.css";

export const DeletedTask = () => {
  const deletedTasks = useDeletedTasks();

  return (
    <Box className={styles.container}>
      {deletedTasks.length > 0 ? (
        <Box mb={2}>
          {deletedTasks.map((task) => (
            <Box key={task.id} className={styles.deletedTaskBox}>
              <Typography
                variant="h6"
                gutterBottom
                className={styles.deletedTaskTitle}
              >
                Title: {task.title}
              </Typography>
              {task.description && (
                <Typography
                  variant="body1"
                  gutterBottom
                  className={styles.deletedTaskDescription}
                >
                  Description: {task.description}
                </Typography>
              )}
              {task.deadline && (
                <Typography
                  variant="body1"
                  gutterBottom
                  className={styles.deletedTaskDeadline}
                >
                  Deadline: {task.deadline}
                </Typography>
              )}
              <Typography
                variant="body1"
                gutterBottom
                className={styles.deletedTaskStatus}
              >
                Status: {task.status}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className={styles.noTasksBox}>
          <Typography variant="body1">No deleted tasks found</Typography>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        className={styles.backButton}
      >
        Back
      </Button>
    </Box>
  );
};
