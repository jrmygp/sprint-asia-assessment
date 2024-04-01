import { createTheme } from "@mui/material";
import ComponentsOverrides from "./core/components";

const theme = createTheme({});

theme.components = ComponentsOverrides(theme);

export default theme;
