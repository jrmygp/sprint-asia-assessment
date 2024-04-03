// Material UI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Button from "@mui/material/Button";

import { MdAdd } from "react-icons/md";

import "./App.css";
import axiosInstance from "./config/api";
import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard/TaskCard";
import TaskForm from "./components/TaskForm/TaskForm";
import { useDisclosure } from "./hooks/useDisclosure";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("On Going");
  const { isOpen: formIsOpen, toggle } = useDisclosure(false);

  const statuses = ["On Going", "Complete"];

  const handleOpenForm = (status) => {
    setSelectedStatus(status);
    toggle();
  };

  const handleCloseForm = (resetForm) => {
    setSelectedStatus("");
    resetForm();
    toggle();
  };

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task");
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmission = async (form, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post("/task", {
        ...form,
        status: selectedStatus,
      });
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
   * Handles filter task by its status (on going or complete)
   * @param {string} status
   * @returns {Array} array of filtered task accordingly to desired status
   */
  const filterTaskByStatus = (status) => {
    return tasks.filter((task) => {
      return task.status === status;
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="kanban-wrapper">
        {statuses.map((status, idx) => {
          return (
            <div className="wrapper" key={idx}>
              <div className="kanban-column">
                <div
                  className="border-color"
                  style={{
                    background: status === "On Going" ? "#FFD240" : "#49C96D",
                  }}
                >
                  &nbsp;
                </div>

                <section className="column-title">
                  <div className="column-title__text">
                    <h2 className="title">{status}</h2>
                    <div className="item-length">{filterTaskByStatus(status)?.length}</div>
                  </div>
                </section>

                <div className="droppable-space">
                  {filterTaskByStatus(status)?.map((task) => {
                    return (
                      <TaskCard
                        key={task.id}
                        title={task.title}
                        checklists={task.checklists}
                        deadline={task.deadline}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="button-wrapper">
                <Button
                  sx={{
                    minWidth: "40px",
                    padding: "10px",
                    background: "#eaedff",
                  }}
                  onClick={() => handleOpenForm(status)}
                >
                  <MdAdd fontSize={20} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <TaskForm open={formIsOpen} status={selectedStatus} onClose={handleCloseForm} onSubmit={formSubmission} />
    </ThemeProvider>
  );
}

export default App;
