import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setTask } from "../../slices/tasks";
const Task = () => {
  const loader_data = useLoaderData()
  const projectTask = useParams().task
  const projectId = useParams().id
  const [task, set_Task] = useState(loader_data)
  const token = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);
  const form_input_style = theme == "dark" ? "form-input-dark" : "";
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const navigate = useNavigate();
  const backlink = projectTask?`/app/projects/${projectId}`:'/app/tasks';
  const saveTask = async () => {
    const response = await fetch(`http://127.0.0.1:9000/todo/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify(task),
    });
    if (response.status == 200) {
      getTasks()
      navigate(backlink)
    }
  };
  const getTasks = async () => {
    const response = await fetch(`http://127.0.0.1:9000/todo/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    const data = await response.json();
    if(response.status==200){
      dispatch(setTask(data))
    }
  }

  const deleteTask = async () => {
    const response = await fetch(`http://127.0.0.1:9000/todo/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    if (response.status == 200) {
      navigate('/app/tasks')
    }
  };

  return (
    <>
      <div className="backdrop" onClick={()=>navigate(backlink)}></div>
      <div
        className={`py-4 bg-${theme} col-sm-10 col-md-6 px-4 rounded shadow mt-2 form-modal`}
      >
        <div className="d-flex justify-content-end"><i className={`fa-solid fa-xmark toggler ${text_color}`} onClick={()=>navigate(backlink)}></i></div>
        <label htmlFor="task_title" className={`${text_color}`}>
          Title :
        </label>
        <input
          type="text"
          name="title"
          id="task_title"
          className={`form-control ${form_input_style}`}
          placeholder="Title"
          value={task.title || ""}
          onChange={(e) => set_Task({ ...task, title: e.target.value })}
        />
        <div className="row gx-2">
          <div className="col">
            <label htmlFor="date" className={`${text_color}`}>
              Date :
            </label>
            <input
              type="date"
              name="todo_date"
              id="date"
              className={`form-control ${form_input_style}`}
              value={task.todo_date || ""}
              onChange={(e) => set_Task({ ...task, todo_date: e.target.value })}
            />
          </div>
          <div className="col">
            <label htmlFor="time" className={`${text_color}`}>
              Time :
            </label>
            <input
              type="time"
              name="todo_time"
              id="time"
              className={`form-control ${form_input_style}`}
              value={task.todo_time || ""}
              onChange={(e) => set_Task({ ...task, todo_time: e.target.value })}
            />
          </div>
        </div>
        <label htmlFor="detail" className={`${text_color}`}>
          Description :
        </label>
        <textarea
          name="detail"
          id=""
          cols="30"
          rows="7"
          className={`form-control ${form_input_style}`}
          placeholder="Task description... "
          value={task.detail || ""}
          onChange={(e) => set_Task({ ...task, detail: e.target.value })}
        ></textarea>

        <div className="d-flex align-items-center mt-2">
          <div>
            <button className="btn btn-secondary btn-sm me-2">
              Cancel 
            </button>
            <button className="btn btn-success btn-sm px-3" onClick={saveTask}>
              Save 
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
