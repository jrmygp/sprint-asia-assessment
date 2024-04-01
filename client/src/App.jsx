// Material UI
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TaskForm />
    </ThemeProvider>
  );
}

export default App;
