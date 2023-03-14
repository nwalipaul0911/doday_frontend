import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const AddProject = () => {
  const token = useSelector((state) => state.auth.value);
  const projects = useSelector((state) => state.projects.value);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.value);
  const [projectId, setProjectId] = useState(projects[0].id);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const form_input_style = theme == "dark" ? "form-input-dark" : "";
  const dispatch = useDispatch();
  const taskId = useParams().id;

  const saveTask = async () => {
    const response = await fetch(
      `http://127.0.0.1:9000/projects/add_task/${taskId}/${projectId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token.access}`,
        }
      }
    );
    if (response.status == 200) {
      navigate("/app/tasks");
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
      <div className="backdrop" onClick={() => navigate("/app/tasks")}></div>
      <div
        className={`py-4 bg-${theme} col-sm-10 col-md-6 new-item-modal px-4 rounded shadow mt-2 form-modal`}
      >
        <div className="d-flex justify-content-between">
          <h5 className={`${text_color} mb-4`}>Select Project</h5>
          <i
            className={`fa-solid fa-xmark toggler ${text_color}`}
            onClick={() => navigate("/app/tasks")}
          ></i>
        </div>


        <select
          name="project"
          id="project"
          onChange={(e) => setProjectId(e.target.value)}
          className={`form-control ${form_input_style}`}
          defaultValue={`${projects[0].id}`}
        >
          {projects?.map((project, index) => (
            <option key={index} value={project.id} className={`${text_color} bg-${theme}`}>
              {project.name}
            </option>
          ))}
        </select>

        <div className="d-flex align-items-center mt-2">
          <button className="btn btn-success btn-sm col-2" onClick={saveTask}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProject;
