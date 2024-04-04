/* eslint-disable react/prop-types */
import { useState } from "react";

import { useSnackbar } from "notistack";

import Grid from "@mui/material/Grid";

import TaskForm from "../TaskForm/TaskForm";
import ChecklistForm from "../ChecklistForm/ChecklistForm";
import KanbanItem from "../KanbanItem/KanbanItem";
import axiosInstance from "@/config/api";
import { useDisclosure } from "@/hooks/useDisclosure";

const Kanban = ({ tasks, fetchTasks }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedStatus, setSelectedStatus] = useState("On Going");
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const { isOpen: taskFormIsOpen, toggle: toggleTaskForm } = useDisclosure(false);
  const { isOpen: checklistFormIsOpen, toggle: toggleChecklistForm } = useDisclosure(false);

  const statuses = ["On Going", "Complete"];

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
      enqueueSnackbar("Task saved", { variant: "success" });
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setStatus("success");
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  /**
   * Handles submission of checklist
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
      enqueueSnackbar("Checlist saved", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {statuses.map((status, idx) => {
          return (
            <KanbanItem
              key={idx}
              status={status}
              tasks={tasks}
              fetchTasks={fetchTasks}
              handleOpenChecklistForm={handleOpenChecklistForm}
              handleOpenEditChecklistForm={handleOpenEditChecklistForm}
              handleOpenEditTaskForm={handleOpenEditTaskForm}
              handleOpenTaskForm={handleOpenTaskForm}
            />
          );
        })}
      </Grid>

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
    </>
  );
};

export default Kanban;
