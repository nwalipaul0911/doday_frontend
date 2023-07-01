import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTask } from "../../slices/tasks";
import { Outlet } from "react-router-dom";

const Project = () => {
  const projectId = useParams("id");
  const token = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
  const [collaborators, setCollaborators] = useState([]);

  const undoneTask = tasks.filter((task) => task.status == false);
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

  const [taskNav, setTaskNav] = useState([
    { name: "Today", active: true },
    { name: "Upcoming", active: false },
    { name: "Done", active: false },
    { name: "Missed", active: false },
    { name: "All", active: false },
  ]);

  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  // function to set the active task navigation in the UI
  const setTaskNavigation = (index) => {
    let taskNavigation = [...taskNav];
    taskNavigation.map((nav) => (nav.active = false));
    taskNavigation[index].active = true;
    setTaskNav(taskNavigation);
    setActiveTaskIndex(index);
  };
  useEffect(() => {
    getProject();
    getTasks();
    getCollaborators();
  }, []);
  const getProject = async () => {
    const response = await fetch(
      `http://127.0.0.1:9000/projects/${projectId.id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
    const data = await response.json();
    setProject(data);
  };
  const getTasks = async () => {
    const response = await fetch(
      `http://127.0.0.1:9000/projects/tasks/${projectId.id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
    const data = await response.json();
    setTasks(data);
  };
  const removeTask = async (id) => {
    const response = await fetch(
      `http://127.0.0.1:9000/projects/remove_task/${id}/${projectId.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
    if (response.status == 200) {
      getTasks();
    }
  };
  const getCollaborators = async () => {
    const response = await fetch(
      `http://127.0.0.1:9000/projects/collaborators/${projectId.id}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      }
    );
    const data = await response.json();
    setCollaborators(data);
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
      if (response.status == 200) {
        dispatch(setTask(await response.json()));
        getTasks();
      }
    }
  };
  return (
    <>
      <Outlet />
      <div className="d-flex justify-content-between m-3">
          <h4 className={`${text_color} pb-2 ms-3`}>{project.name}</h4>
        
        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`/app/projects`}
            className="fa-solid fa-arrow-left item-icons grid-item-center me-3"
            title="Back"
          > </Link>
          <Link
            to={`task/create`}
            className="fa-solid fa-plus item-icons grid-item-center me-3"
            title="Add task"
          > </Link>
          <Link
            to={`add_collaborator`}
            className="fa-solid fa-user-plus item-icons grid-item-center me-3"
            title="Add collaborator"
          ></Link>
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
        {taskList[activeTaskIndex].length > 0 ? (
          <>
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
          </>
        ) : (
          <>
            <div className="grid-item-center" style={{ height: "inherit" }}>
              <div className="text-center">
                <p className={`${text_color}`}>No tasks here</p>
                <i className="text-success">
                  Click add task to create new task
                </i>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Project;
