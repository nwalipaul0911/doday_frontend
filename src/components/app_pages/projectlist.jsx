import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setProjects } from "../../slices/projects";

const ProjectList = () => {
  const projects = useSelector((state)=>state.projects.value)
  const theme = useSelector((state) => state.theme.value);
  const text_color = theme=='dark'?'text-light':'text-dark';

  return ( 
    <>
    <div className="py-4 items-container">
      {projects?.map((project, index) => (
        <div key={index} className={`${text_color} items py-2 d-flex justify-content-between`}>
          <Link to={`${project.id}`} className={`${text_color} item`}>
          {project.name}
          </Link>
          <div className="project-item-icons-container">
              
              <i className={`fa-solid fa-ellipsis-vertical me-3 item-icons grid-item-center`} title='More Options'></i>
          </div>
          
        </div>
      ))}
    </div>
    
    </>
   );
}
 
export default ProjectList;