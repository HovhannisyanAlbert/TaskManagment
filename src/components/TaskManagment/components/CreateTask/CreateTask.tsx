import { Typography, Container, TextField, Button } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { StatusTask } from "../../store/types";
import { addTask } from "../../store/slice/taskManagmentSlice";
import styles from "./createTask.module.css";

interface TaskFormInputs {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: StatusTask;
}

export const CreateTask: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInputs>();

  const dispatch = useDispatch();

  const onSubmit = (data: TaskFormInputs) => {
    dispatch(addTask({ ...data, id: uuidv4(), status: StatusTask.PENDING }));
    reset();
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Typography variant="h4" gutterBottom className={styles.formTitle}>
        Add New Task
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
              className={styles.textField}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              className={styles.textField}
            />
          )}
        />
        <Controller
          name="deadline"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Deadline"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              className={styles.textField}
            />
          )}
        />
        <Button type="submit" variant="contained" className={styles.button}>
          Add Task
        </Button>
      </form>
    </Container>
  );
};
