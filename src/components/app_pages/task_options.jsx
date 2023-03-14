import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "../../slices/projects";
import { Link } from "react-router-dom";
const TaskOptions = ({ option }) => {
  const token = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const dispatch = useDispatch()

  return (
      <ul className={`options-container bg-${theme} shadow rounded`}>
        <li className="nav-item more-options">
          <Link className={`${text_color} nav-link`}>Link</Link>
        </li>
        <li className="nav-item more-options">
          <Link className={`${text_color} nav-link`}>Link</Link>
        </li>
        <li className="nav-item more-options">
          <Link className={`${text_color} nav-link`}>Link</Link>
        </li>
        <li className="nav-item more-options">
          <Link className={`${text_color} nav-link`}>Link</Link>
        </li>
        
      </ul>
  );
};

export default TaskOptions;
