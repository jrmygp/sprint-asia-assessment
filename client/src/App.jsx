import { useEffect, useState } from "react";

// Material UI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import "./App.css";
import axiosInstance from "./config/api";
import TaskForm from "./components/TaskForm/TaskForm";
import { useDisclosure } from "./hooks/useDisclosure";
import Kanban from "./components/Kanban/Kanban";
import ChecklistForm from "./components/ChecklistForm/ChecklistForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("On Going");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const { isOpen: taskFormIsOpen, toggle: toggleTaskForm } = useDisclosure(false);
  const { isOpen: checklistFormIsOpen, toggle: toggleChecklistForm } = useDisclosure(false);

  console.log(selectedTask);

  const handleOpenTaskForm = (status) => {
    setSelectedStatus(status);
    toggleTaskForm();
  };

  const handleCloseTaskForm = (resetForm) => {
    setSelectedStatus("");
    resetForm();
    toggleTaskForm();
    setSelectedTask(null);
  };

  const handleOpenChecklistForm = (task) => {
    setSelectedTask(task);
    toggleChecklistForm();
  };

  const handleCloseChecklistForm = () => {
    setSelectedTask(null);
    setSelectedChecklist(null);
    toggleChecklistForm();
  };

  const handleOpenEditTaskForm = (task) => {
    setSelectedTask(task);
    toggleTaskForm();
  };

  const handleOpenEditChecklistForm = (checklist) => {
    setSelectedChecklist(checklist);
    toggleChecklistForm();
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
   * @param {*} form - form to send to back end
   * @param {*} setSubmitting - formik state to handle close form
   * @param {*} setStatus - formik state to handle close form
   */
  const taskSubmission = async (form, setSubmitting, setStatus) => {
    try {
      if (!selectedTask) {
        await axiosInstance.post("/task", {
          ...form,
          status: selectedStatus,
        });
      } else {
        await axiosInstance.patch(`/task/${selectedTask.id}`, form);
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

  /**
   *
   * @param {*} form - form to send to back end
   * @param {*} resetForm - formik method to reset fields in the form
   */
  const checklistSubmission = async (form, resetForm) => {
    try {
      if (!selectedChecklist) {
        await axiosInstance.post("/checklist", { ...form, task_id: selectedTask.id, status: "Open" });
        resetForm();
      } else {
        await axiosInstance.patch(`/checklist/${selectedChecklist.id}`, form);
        handleCloseChecklistForm();
      }
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Kanban
        tasks={tasks}
        fetchTasks={fetchTasks}
        handleOpenForm={handleOpenTaskForm}
        handleOpenEditForm={handleOpenEditTaskForm}
        handleOpenChecklistForm={handleOpenChecklistForm}
        handleOpenEditChecklistForm={handleOpenEditChecklistForm}
      />

      <TaskForm
        open={taskFormIsOpen}
        status={selectedStatus}
        taskToEdit={selectedTask}
        onClose={handleCloseTaskForm}
        onSubmit={taskSubmission}
      />

      <ChecklistForm
        open={checklistFormIsOpen}
        checklistToEdit={selectedChecklist}
        onClose={handleCloseChecklistForm}
        onSubmit={checklistSubmission}
      />
    </ThemeProvider>
  );
}

export default App;
