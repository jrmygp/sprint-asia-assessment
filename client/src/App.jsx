import { useEffect, useState } from "react";

// Material UI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import "./App.css";
import axiosInstance from "./config/api";
import TaskForm from "./components/TaskForm/TaskForm";
import { useDisclosure } from "./hooks/useDisclosure";
import Kanban from "./components/Kanban/Kanban";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("On Going");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { isOpen: formIsOpen, toggle } = useDisclosure(false);

  const handleOpenForm = (status) => {
    setSelectedStatus(status);
    toggle();
  };

  const handleCloseForm = (resetForm) => {
    setSelectedStatus("");
    resetForm();
    toggle();
    setTaskToEdit(null);
  };

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task");
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Handles submission of task
   * @param {*} form
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const formSubmission = async (form, setSubmitting, setStatus) => {
    try {
      if (!taskToEdit) {
        await axiosInstance.post("/task", {
          ...form,
          status: selectedStatus,
        });
      } else {
        await axiosInstance.patch(`/task/${taskToEdit.id}`, form);
      }
      setSubmitting(false);
      setStatus("success");
      fetchTasks();
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setStatus("success");
    }
  };

  const handleOpenEditForm = (taskId) => {
    setTaskToEdit(() => {
      const filteredTask = tasks.filter((task) => {
        return task.id == taskId;
      });
      return filteredTask[0];
    });

    toggle();
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Kanban
        tasks={tasks}
        fetchTasks={fetchTasks}
        handleOpenForm={handleOpenForm}
        handleOpenEditForm={handleOpenEditForm}
      />

      <TaskForm
        open={formIsOpen}
        status={selectedStatus}
        taskToEdit={taskToEdit}
        onClose={handleCloseForm}
        onSubmit={formSubmission}
      />
    </ThemeProvider>
  );
}

export default App;
