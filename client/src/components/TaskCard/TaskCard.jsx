/* eslint-disable react/prop-types */
import { useState } from "react";

import moment from "moment";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";

import {
  MdOutlineCalendarToday,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineCircle,
  MdTaskAlt,
} from "react-icons/md";

import axiosInstance from "@/config/api";
import classes from "./TaskCard.module.css";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  marginTop: "11px",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
  },
}));

const TaskCard = ({ deadline, title, checklists }) => {
  const [dropdownIsClicked, setDropdownIsClicked] = useState(false);

  const finish = checklists?.filter((item) => {
    return item.status === "Finish";
  });

  return (
    <div className={classes["item-wrapper"]}>
      <section className={classes["title-and-deadline"]}>
        <h1 className={classes.title}>{title}</h1>

        <div className={classes.deadline}>
          <MdOutlineCalendarToday />
          <span>{moment(deadline).format("MMM DD")}</span>
        </div>
      </section>

      {checklists?.length > 0 && (
        <section className={classes["checklist"]}>
          <a className={classes["checklist__count"]}>
            <span>CHECK LIST: {checklists.length}</span>
            <span className="text-muted">{(finish?.length / checklists.length) * 100}%</span>
          </a>

          <div className={classes["checklist__drop-down"]}>
            <BorderLinearProgress variant="determinate" value={(finish?.length / checklists.length) * 100} />
          </div>

          <div className={classes["button-dropdown"]}>
            {!dropdownIsClicked ? (
              <IconButton onClick={() => setDropdownIsClicked(true)}>
                <MdOutlineKeyboardArrowDown />
              </IconButton>
            ) : (
              <IconButton onClick={() => setDropdownIsClicked(false)}>
                <MdOutlineKeyboardArrowUp />
              </IconButton>
            )}
          </div>

          <Collapse in={dropdownIsClicked}>
            <div className={classes["checklist-wrapper"]}>
              {checklists.length > 0 &&
                checklists.map((checklist) => {
                  return (
                    <a className={classes["checklist-item"]} key={checklist.id} onClick={() => {}}>
                      <span className={checklist.status === "Finish" ? classes["checked"] : ""}>{checklist.title}</span>
                      {checklist.status === "Open" ? <MdOutlineCircle /> : <MdTaskAlt className="text-primary" />}
                    </a>
                  );
                })}
            </div>
          </Collapse>
        </section>
      )}
    </div>
  );
};

export default TaskCard;
