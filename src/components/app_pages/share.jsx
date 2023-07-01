import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setTask } from "../../slices/tasks";
const Share = () => {
  const location = useLocation().pathname
  const token = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [email, setEmail] = useState({});
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const form_input_style = theme == "dark" ? "form-input-dark" : "";
  const dispatch = useDispatch()
  const ids_ = useParams()
  const taskId = ids_.task
  const projectId = ids_.id
  const path = location.charAt(5)=='t'?'/app/tasks':`/app/projects/${projectId}`;


  const saveTask = async () => {
    const response = await fetch(`http://127.0.0.1:9000/todo/execution_response/${taskId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify(email),
    });
    if (response.status == 200) {
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
      dispatch(setTask(email))
    }
  }
  return (
    <>
    <div className="backdrop" onClick={()=>navigate(path)}></div>
      <div
        className={`py-4 bg-${theme} col-sm-10 col-md-6 new-item-modal px-4 rounded shadow mt-2 form-modal`}
      >
        <div className="d-flex justify-content-between">
          <h5 className={`${text_color} mb-4`}>Share </h5>
          <i className={`fa-solid fa-xmark toggler ${text_color}`} onClick={()=>navigate(path)}></i></div>

        <label htmlFor="email" className={`${text_color}`}>
          E-mail :
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={email.email || ''}
          onChange={e=>setEmail({...email, email:e.target.value})}
          className={`form-control ${form_input_style}`}
          placeholder="E-mail"
        />

        <div className="d-flex align-items-center mt-2">
          <button
            className="btn btn-success btn-sm col-2"
            onClick={saveTask}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Share;
