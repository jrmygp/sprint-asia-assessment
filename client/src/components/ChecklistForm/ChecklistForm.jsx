/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as yup from "yup";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

import classes from "./ChecklistForm.module.css";

const ChecklistForm = ({ open, onClose, checklistToEdit, onSubmit }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: checklistToEdit?.title || "",
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("Check list title is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values, resetForm);
    },
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      PaperProps={{
        style: { width: "100%" },
      }}
      open={open}
      onClose={() => onClose(formik.resetForm)}
    >
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <FormControl fullWidth error={formik.errors.title}>
          <FormLabel sx={{ mb: 1 }}>Check list title</FormLabel>
          <TextField
            size="small"
            placeholder="Type your check list here..."
            value={formik.values.title}
            name="title"
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
          <FormLabel>{formik.errors.title}</FormLabel>
        </FormControl>

        <Button variant="contained" type="submit">
          Add check list
        </Button>
      </form>
    </Dialog>
  );
};

export default ChecklistForm;
