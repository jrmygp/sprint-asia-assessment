import { useFormik } from "formik";
import * as yup from "yup";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

import classes from "./TaskForm.module.css";

const TaskForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Task title is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>Task title</FormLabel>
            <TextField
              size="small"
              placeholder="Type your task here..."
              value={formik.values.title}
              name="title"
              onChange={formik.handleChange}
            />
          </FormControl>

          <Button variant="contained" type="submit">
            Lets Work!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
