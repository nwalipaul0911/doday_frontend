import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNote } from "../../slices/notes";
const CreateNote = () => {
  const token = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const form_input_style = theme == "dark" ? "form-input-dark" : "";
  const [note, set_Note] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saveNote = async () => {
    const response = await fetch(`http://127.0.0.1:9000/note/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      body: JSON.stringify(note),
    });
    if (response.status == 200) {
      getNotes();
      navigate("/app/notes");
    }
  };
  const getNotes = async () => {
    const response = await fetch(`http://127.0.0.1:9000/note/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      dispatch(setNote(data));
    }
  };

  return (
    <>
      <div className="backdrop" onClick={() => navigate("/app/notes")}></div>
      <div
        className={`py-4 bg-${theme} col-sm-10 col-md-6 px-4 rounded shadow mt-2 form-modal`}
      >
        <div className="d-flex justify-content-end">
          <i
            className={`fa-solid fa-xmark toggler ${text_color}`}
            onClick={() => navigate("/app/notes")}
          ></i>
        </div>
        <label htmlFor="note_title" className={`${text_color}`}>
          Title :
        </label>
        <input
          type="text"
          name="note_title"
          id="note_title"
          className={`form-control ${form_input_style}`}
          placeholder="Title"
          value={note.title || ""}
          onChange={(e) => set_Note({ ...note, title: e.target.value })}
        />
        <label htmlFor="detail" className={`${text_color}`}>
          Detail :
        </label>
        <textarea
          name="detail"
          id=""
          cols="30"
          rows="6"
          className={`form-control ${form_input_style}`}
          placeholder="Write your note here..."
          value={note.detail || ""}
          onChange={(e) => set_Note({ ...note, detail: e.target.value })}
        ></textarea>

        <div className="d-flex justify-content-end align-items-center mt-2">
          <button className="btn btn-secondary btn-sm me-2">Cancel</button>
          <button className="btn btn-success btn-sm px-3" onClick={saveNote}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
