import React, { useEffect, useState, useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTask } from "../../slices/tasks";

const Tasks = () => {
  const token = useSelector((state) => state.auth.value);
  const tasks = useSelector((state) => state.tasks.value);
  const theme = useSelector((state) => state.theme.value);
  const [taskNav, setTaskNav] = useState([
    { name: "Today", active: true },
    { name: "Upcoming", active: false },
    { name: "Done", active: false },
    { name: "Missed", active: false },
    { name: "All", active: false },
  ]);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const dispatch = useDispatch();

  // list of task yet to be done for the current day
  const todayTask = tasks.filter((task) => {
    if (
      task.status == false &&
      task.todo_date == new Date().toISOString().slice(0, 10)
    ) {
      return task;
    }
  });

  // list of tasks for the coming days
  const upcomingTask = tasks.filter((task) => {
    if (
      task.status == false &&
      task.todo_date > new Date().toISOString().slice(0, 10)
    ) {
      return task;
    }
  });

  // list of tasks for past days and yet to be done
  const missedTask = tasks.filter((task) => {
    if (
      task.status == false &&
      task.todo_date < new Date().toISOString().slice(0, 10)
    ) {
      return task;
    }
  });

  // list of all done tasks yet to be deleted
  const doneTask = tasks.filter((task) => task.status == true);

  const taskList = useMemo(
    () => [todayTask, upcomingTask, doneTask, missedTask, tasks],
    [tasks]
  );
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  // function to set the active task navigation in the UI
  const setTaskNavigation = (index) => {
    let taskNavigation = [...taskNav];
    taskNavigation.map((nav) => (nav.active = false));
    taskNavigation[index].active = true;
    setTaskNav(taskNavigation);
    setActiveTaskIndex(index);
  };
  const setTaskStatus = async (arg) => {
    var response = await fetch(`http://127.0.0.1:9000/todo/set_status/${arg}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    if (response.status == 200) {
      response = await fetch("http://127.0.0.1:9000/todo/", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(setTask(data));
      }
    }
  };

  return (
    <>
      <Outlet />
      <div className="d-flex justify-content-between align-items-center py-4">
        <h3 className={`ms-5`}>
          <i className="fa-solid fa-list-check text-success"></i>
        </h3>
        <div>
          <Link
            to="create"
            className="btn btn-primary btn-sm me-3"
            title="New Task"
          >
            New Task
            <i className={`fa-solid fa-plus ms-2`}></i>
          </Link>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {taskNav.map((nav, index) =>
            nav.active ? (
              <div
                key={index}
                className={`col-2 text-center nav-link ${text_color}`}
                onClick={() => {
                  setTaskNavigation(index);
                }}
                style={{ borderBottom: "2px solid #198754" }}
              >
                {nav.name}
              </div>
            ) : (
              <div
                key={index}
                className={`col-2 text-center nav-link ${text_color}`}
                onClick={() => {
                  setTaskNavigation(index);
                }}
              >
                {nav.name}
              </div>
            )
          )}
        </div>
      </div>
      <div className="py-4 items-container">
        {taskList[activeTaskIndex]?.map((task, index) => (
          <div
            key={index}
            className={`${text_color} items py-2 d-flex justify-content-between`}
          >
            <div className="col-8">
              <div className="row g-0">
                <div className="col-1">
                  <div
                    className="checkbox-container grid-item-center p-0"
                    title="Mark as done"
                    onClick={() => setTaskStatus(task.id)}
                  >
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                </div>
                <div className="col-10">
                  <div>
                    <Link className={`${text_color} item `}>
                      {task.title.slice(0, 10)}
                      <span className="text-secondary">...</span>
                    </Link>
                  </div>
                  <div>
                    <i className="text-secondary ">
                      {task.detail.slice(0, 25)}
                      <span className="text-secondary">...</span>
                    </i>
                  </div>
                  <div>
                    <small className="text-secondary">
                      <i className={`fa-solid fa-calendar-days me-1`}></i>
                      {task.todo_date}
                    </small>
                    <small className="text-secondary ms-3">
                      <i className={`fa-solid fa-clock  me-1`}></i>
                      {task.todo_time}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="item-icons-container">
              <Link
                to={`${task.id}`}
                className="fa-solid fa-pen-to-square item-icons grid-item-center"
                title="Edit task"
              ></Link>

              <Link
                to={`${task.id}/share`}
                className="fa-solid fa-share item-icons grid-item-center"
                title="Share task"
              ></Link>

              <Link
                to={`${task.id}/add_to`}
                className="fa-solid fa-folder-plus item-icons grid-item-center"
                title="Add To Project"
              ></Link>
              <Link
                to={`${task.id}/delete`}
                className="fa-solid fa-trash item-icons grid-item-center"
                title="Delete task"
              ></Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Tasks;
