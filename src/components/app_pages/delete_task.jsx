import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setTask } from "../../slices/tasks";
const DeleteTask = () => {
  const location = useLocation().pathname
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const dispatch = useDispatch()
  const taskId_ = useParams()
  const taskId = taskId_.task
  const projectId = taskId_.id
  const path = location.charAt(5)=='t'?'/app/tasks':`/app/projects/${projectId}`;
  console.log(path)


  const saveTask = async () => {
    const response = await fetch(`http://127.0.0.1:9000/todo/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    if (response.status == 200) {
      getTasks()
      navigate(path)
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
  return (
    <>
    <div className="backdrop" onClick={()=>navigate(path)}></div>
      <div
        className={`py-4 bg-${theme} col-sm-10 col-md-6 new-item-modal px-4 rounded shadow mt-2 form-modal`}
      >
        <div className="d-flex justify-content-between">
          <h5 className={`${text_color} mb-4`}>Delete </h5>
          <i className={`fa-solid fa-xmark toggler ${text_color}`} onClick={()=>navigate(path)}></i></div>

        <i  className={`${text_color}`}>
          Are you sure?
        </i>
        <div className="d-flex align-items-center mt-2">
          <button
            className="btn btn-danger btn-sm col-2"
            onClick={saveTask}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteTask;
