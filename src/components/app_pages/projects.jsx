import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import CreateProject from "./create_project";

const Projects = () => {

  const theme = useSelector((state) => state.theme.value);
  const text_color = theme=='dark'?'text-light':'text-dark';

  return (
    <div className="app-container">
      
      <div className="d-flex justify-content-between align-items-center py-4">
      <h3 className={`ms-5`}>
          <i className="fa-solid fa-folder text-warning"></i>
        </h3>
        <CreateProject />
      </div>
      <Outlet />
      
    </div>
  );
};

export default Projects;
