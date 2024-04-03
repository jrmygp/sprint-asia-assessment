// Material UI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Button from "@mui/material/Button";

import { MdAdd } from "react-icons/md";

import "./App.css";
import axiosInstance from "./config/api";
import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);
  const statuses = ["On Going", "Complete"];

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task");
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
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
                    <div className="item-length">0</div>
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
                  // onClick={() => openEditFormHandler(column.status)}
                >
                  <MdAdd fontSize={20} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
}

export default App;
