/* eslint-disable react/prop-types */
import moment from "moment";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Collapse from "@mui/material/Collapse";

import {
  MdOutlineCalendarToday,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdAdd,
  MdDelete,
  MdEdit,
} from "react-icons/md";

import classes from "./TaskCard.module.css";
import { useDisclosure } from "@/hooks/useDisclosure";
import axiosInstance from "@/config/api";
import ChecklistItem from "../ChecklistItem/ChecklistItem";

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

const TaskCard = ({
  id,
  deadline,
  title,
  checklists,
  status,
  task,
  fetchTasks,
  onClickEdit,
  handleOpenChecklistForm,
  handleOpenEditChecklistForm,
}) => {
  const { isOpen: dropdownIsClicked, toggle } = useDisclosure();

  const finish = checklists?.filter((item) => {
    return item.status === "Finish";
  });

  const completeTask = async () => {
    try {
      await axiosInstance.patch(`/task/${id}`, {
        status: "Complete",
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(`/task/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes["item-wrapper"]}>
      <section className={classes["title-and-deadline"]}>
        <div className={classes["title-wrapper"]}>
          <h1 className={classes.title}>{title}</h1>

          <IconButton size="small" disabled={status === "Complete"} onClick={completeTask}>
            {status === "Complete" ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </IconButton>
        </div>

        {moment(deadline).fromNow().includes("ago") ? (
          <div className={classes["deadline-passed"]}>
            <span>Over {moment(deadline).fromNow()}</span>
          </div>
        ) : (
          <div className={classes.deadline}>
            <MdOutlineCalendarToday />
            <span>{moment(deadline).format("MMM DD")}</span>
          </div>
        )}
      </section>

      <section className={classes["checklist"]}>
        <a className={classes["checklist__count"]}>
          <div className={classes["checklist-form-button"]}>
            <span>Check list : {checklists?.length || 0}</span>

            <IconButton size="small" onClick={() => handleOpenChecklistForm(task)}>
              <MdAdd />
            </IconButton>
          </div>
          <span className="text-muted">{Math.round((finish?.length / checklists?.length) * 100) || 0}%</span>
        </a>

        <div className={classes["checklist__drop-down"]}>
          <BorderLinearProgress variant="determinate" value={(finish?.length / checklists?.length) * 100 || 0} />
        </div>

        <div className={classes["button-dropdown"]}>
          <IconButton onClick={toggle}>
            {!dropdownIsClicked ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
          </IconButton>
        </div>

        <Collapse in={dropdownIsClicked}>
          <div className={classes["checklist-wrapper"]}>
            {checklists?.length > 0 &&
              checklists.map((checklist, idx) => {
                return (
                  <ChecklistItem
                    key={idx}
                    id={checklist.id}
                    status={checklist.status}
                    title={checklist.title}
                    checklist={checklist}
                    fetchTasks={fetchTasks}
                    onClickEdit={handleOpenEditChecklistForm}
                  />
                );
              })}
          </div>
        </Collapse>
      </section>

      <section className={classes["button-section"]}>
        <IconButton size="small" onClick={() => onClickEdit(task)}>
          <MdEdit />
        </IconButton>

        <IconButton size="small" color="error" onClick={deleteTask}>
          <MdDelete />
        </IconButton>
      </section>
    </div>
  );
};

export default TaskCard;
