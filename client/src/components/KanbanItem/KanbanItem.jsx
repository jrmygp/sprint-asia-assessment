/* eslint-disable react/prop-types */

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MdAdd } from "react-icons/md";

import TaskCard from "@/components/TaskCard/TaskCard";
import classes from "./KanbanItem.module.css";

const KanbanItem = ({
  status,
  tasks,
  fetchTasks,
  handleOpenEditChecklistForm,
  handleOpenEditTaskForm,
  handleOpenChecklistForm,
  handleOpenTaskForm,
}) => {
  /**
   * Handles filter task by its status (on going or complete)
   * @param {string} status
   * @returns {Array} array of filtered task accordingly to desired status
   */
  const filterTaskByStatus = (status) => {
    return tasks.filter((task) => {
      return task.status === status;
    });
  };

  return (
    <Grid item xs={12} sm={6}>
      <div className={classes.wrapper}>
        <div className={classes["kanban-column"]}>
          <div
            className={classes["border-color"]}
            style={{
              background: status === "On Going" ? "#FFD240" : "#49C96D",
            }}
          >
            &nbsp;
          </div>

          <section className={classes["column-title"]}>
            <div className={classes["column-title__text"]}>
              <h2 className={classes.title}>{status}</h2>
              <div className={classes["item-length"]}>{filterTaskByStatus(status)?.length}</div>
            </div>
          </section>

          <div className={classes["droppable-space"]}>
            {filterTaskByStatus(status)?.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  checklists={task.checklists}
                  deadline={task.deadline}
                  status={task.status}
                  task={task}
                  fetchTasks={fetchTasks}
                  onClickEdit={handleOpenEditTaskForm}
                  handleOpenChecklistForm={handleOpenChecklistForm}
                  handleOpenEditChecklistForm={handleOpenEditChecklistForm}
                />
              );
            })}
          </div>
        </div>

        <div className={classes["button-wrapper"]}>
          <Button
            sx={{
              minWidth: "40px",
              padding: "10px",
              background: "#eaedff",
            }}
            onClick={() => handleOpenTaskForm(status)}
          >
            <MdAdd fontSize={20} />
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default KanbanItem;
