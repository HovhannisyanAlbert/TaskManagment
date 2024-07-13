import React, { FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ITask } from "../../store/types";

interface EditTaskModalProps {
  task: ITask;
  open: boolean;
  onClose: () => void;
  onSave: (updatedTask: ITask) => void;
}

export const EditTaskModal: FC<EditTaskModalProps> = ({
  task,
  open,
  onClose,
  onSave,
}) => {
  const [editedTask, setEditedTask] = useState<ITask>({
    id: task.id,
    title: task.title,
    description: task.description || "",
    deadline: task.deadline || "",
    status: task.status,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={editedTask.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          variant="outlined"
          value={editedTask.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          name="deadline"
          label="Deadline"
          fullWidth
          variant="outlined"
          type="date"
          value={editedTask.deadline}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
