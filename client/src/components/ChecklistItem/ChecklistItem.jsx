/* eslint-disable react/prop-types */
import IconButton from "@mui/material/IconButton";
import { MdDelete, MdEdit, MdOutlineCircle, MdTaskAlt } from "react-icons/md";

import classes from "./ChecklistItem.module.css";

const ChecklistItem = ({ checklist }) => {
  return (
    <a className={classes["checklist-item"]} key={checklist.id} onClick={() => {}}>
      <span className={checklist.status === "Finish" ? classes["checked"] : ""}>{checklist.title}</span>

      <div className={classes["button-wrapper"]}>
        <IconButton size="small">
          {checklist.status === "Open" ? <MdOutlineCircle /> : <MdTaskAlt className="text-primary" />}
        </IconButton>

        <IconButton size="small">
          <MdEdit />
        </IconButton>

        <IconButton color="error" size="small">
          <MdDelete />
        </IconButton>
      </div>
    </a>
  );
};

export default ChecklistItem;
