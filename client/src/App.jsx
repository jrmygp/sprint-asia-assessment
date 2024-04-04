import { useEffect, useState } from "react";

// Snackbar
import { SnackbarProvider } from "notistack";

// Material UI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import "./App.css";
import axiosInstance from "./config/api";
import Kanban from "./components/Kanban/Kanban";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/task");
      setTasks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Kanban tasks={tasks} fetchTasks={fetchTasks} />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
