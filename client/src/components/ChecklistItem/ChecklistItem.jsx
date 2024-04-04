/* eslint-disable react/prop-types */
import { useSnackbar } from "notistack";

import IconButton from "@mui/material/IconButton";
import { MdDelete, MdEdit, MdOutlineCircle, MdTaskAlt } from "react-icons/md";

import classes from "./ChecklistItem.module.css";
import axiosInstance from "@/config/api";

const ChecklistItem = ({ id, status, title, fetchTasks, onClickEdit, checklist }) => {
  const { enqueueSnackbar } = useSnackbar();

  const changeChecklistStatus = async () => {
    try {
      await axiosInstance.patch(`/checklist/${id}`, {
        status: status === "Open" ? "Finish" : "Open",
      });
      fetchTasks();
      enqueueSnackbar("Checklist saved", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };
  return (
    <div className={classes["checklist-item"]}>
      <span className={status === "Finish" ? classes["checked"] : ""}>{title}</span>

      <div className={classes["button-wrapper"]}>
        <IconButton size="small" onClick={changeChecklistStatus}>
          {status === "Open" ? <MdOutlineCircle /> : <MdTaskAlt className="text-primary" />}
        </IconButton>

        <IconButton size="small" onClick={() => onClickEdit(checklist)}>
          <MdEdit />
        </IconButton>

        <IconButton color="error" size="small">
          <MdDelete />
        </IconButton>
      </div>
    </div>
  );
};

export default ChecklistItem;
