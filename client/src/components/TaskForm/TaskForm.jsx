/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import classes from "./TaskForm.module.css";

const TaskForm = ({ open, onClose, onSubmit, taskToEdit }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: taskToEdit?.title || "",
      deadline: taskToEdit?.deadline || moment().format("YYYY/MM/DD"),
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Task title is required"),
      deadline: yup.string().required("Task deadline is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      onSubmit(values, setSubmitting, setStatus);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      onClose(formik.resetForm);
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => !formik.isSubmitting && formik.status !== "processing" && onClose(formik.resetForm)}
    >
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <FormControl fullWidth error={formik.errors.title}>
          <FormLabel sx={{ mb: 1 }}>Task title</FormLabel>
          <TextField
            size="small"
            placeholder="Type your task here..."
            value={formik.values.title}
            name="title"
            onChange={(e) => formik.setFieldValue("title", e.target.value)}
            error={formik.errors.title}
          />
          <FormLabel>{formik.errors.title}</FormLabel>
        </FormControl>

        <FormControl fullWidth error={formik.errors.deadline}>
          <FormLabel sx={{ mb: 1 }}>Deadline</FormLabel>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              name="deadline"
              disablePast
              renderInput={(params) => <TextField {...params} size="small" onKeyDown={(e) => e.preventDefault()} />}
              value={formik.values.deadline}
              onChange={(value) => formik.setFieldValue("deadline", moment(value).format("YYYY/MM/DD"))}
            />
          </LocalizationProvider>
          <FormLabel>{formik.errors.deadline}</FormLabel>
        </FormControl>

        <Button variant="contained" type="submit">
          Lets Work!
        </Button>
      </form>
    </Dialog>
  );
};

export default TaskForm;
