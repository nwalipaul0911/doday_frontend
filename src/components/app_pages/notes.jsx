import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Notes = () => {
  const notes = useSelector((state) => state.notes.value);
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";

  return (
    <div className="app-container">
      <Outlet />
      <div className="d-flex justify-content-between align-items-center py-4">
      <h3 className={`ms-5`}>
          <i className="fa-solid fa-note-sticky text-primary"></i>
        </h3>
        <div>
        <Link
        to='create'
        className="btn btn-primary btn-sm me-3"
        title="New note"
      >
        New note
        <i className={`fa-solid fa-plus ms-2`}></i>
      </Link>
        </div>
        
      </div>
      <div className="py-4 items-container">
      {notes?.map((note, index) => (
          <div
            key={index}
            className={`${text_color} items py-2 d-flex justify-content-between`}
          >
            <div className="col-8">
            <div className="row">
              <div className="col-4">
                <Link to={`${note.id}`} className={`${text_color} item `}>
                  {note.title}
                </Link>
              </div>
              <div className="col-8">
                <i className="text-secondary">{note.detail}</i>
              </div>
            </div>
            </div>
            

            <div className="item-icons-container">
              <Link
                to={`${note.id}`}
                className="fa-solid fa-pen-to-square item-icons grid-item-center"
                title="Edit task"
              ></Link>

              <Link
                
                className="fa-solid fa-share item-icons grid-item-center"
                title="Share task"
              ></Link>

              <Link
                
                className="fa-solid fa-folder-plus item-icons grid-item-center"
                title="Add To Project"
              ></Link>
              <Link
                
                className="fa-solid fa-trash item-icons grid-item-center"
                title="Delete task"
              ></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
