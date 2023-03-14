import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNote } from "../../slices/notes";
import { setTask } from "../../slices/tasks";
import { useEffect } from "react";
import { setProjects } from "../../slices/projects";
import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const data = useLoaderData()
  const [notes, setNotes] = useState(data[0])  
  const user = useSelector((state)=>state.user.value)
  const token = useSelector((state) => state.auth.value);
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme == "dark" ? "text-light" : "text-dark";
  const dispatch = useDispatch()
  
  return (
    <div className="app-container">
      <div className="d-flex justify-content-between align-items-center card-header py-4">
        <h3 className={`${text_color} ms-3`}>Welcome {user.username}</h3>
      </div>
    </div>
  );
};
export default Dashboard;
