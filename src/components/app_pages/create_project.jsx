import React, { useCallback } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "../../slices/projects";
const CreateProject = () => {
  const token = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const form_input_style = theme == "dark" ? "form-input-dark" : "";
  const [modal, setModal] = useState(false);
  const [project, setProject] = useState({});
  const dispatch = useDispatch();
  const saveProject = async () => {
    var response = await fetch(`http://127.0.0.1:9000/projects/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify(project),
    });

    if (response.status == 201) {
      getProjects();
      setModalState();
    }
  };
  const getProjects = async () => {
    const response = await fetch(`http://127.0.0.1:9000/projects/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      dispatch(setProjects(data));
    }
  };
  const setModalState = () => {
    modal == false ? setModal(true) : setModal(false);
  };

  return (
    <>
      <button
        className="btn btn-primary btn-sm me-3"
        title="New Project"
        onClick={setModalState}
      >
        New Project<i className={`fa-solid fa-plus ms-2`}></i>
      </button>
      {modal && (
        <>
          <div className="backdrop" onClick={setModalState}></div>
          <div
            className={`py-4 bg-${theme} col-sm-10 col-md-6 px-4 rounded shadow mt-2 form-modal`}
          >
            <div className="d-flex justify-content-end">
              <i
                className={`fa-solid fa-xmark toggler ${text_color}`}
                onClick={setModalState}
              ></i>
            </div>
            <label htmlFor="note_title" className={`${text_color} mb-2`}>
              Project name :
            </label>
            <input
              type="text"
              name="note_title"
              id="note_title"
              className={`form-control ${form_input_style} mb-3`}
              placeholder="Project name"
              value={project.name || ""}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />

            <button
              className="btn btn-secondary btn-sm me-2"
              onClick={setModalState}
            >
              Cancel
            </button>
            <button
              className="btn btn-success btn-sm px-3"
              onClick={saveProject}
            >
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreateProject;
