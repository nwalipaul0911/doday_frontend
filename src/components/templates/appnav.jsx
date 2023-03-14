import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/user";
import { setTheme } from "../../slices/theme";

const AppNav = ({ sidebar, toggleSidebar }) => {
  const theme = useSelector((state) => state.theme.value);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text_color = theme == "dark" ? "text-light" : "text-dark";

  const active_nav_style = theme == "dark" ? "nav-link-dark" : "nav-link-light";

  const userLogout = () => {
    localStorage.removeItem("refresh");
    dispatch(logout());
    location.reload();
  };
  const useTheme = () => {
    if (theme == "dark") {
      dispatch(setTheme("light"));
      localStorage.setItem("theme", "light");
    } else {
      dispatch(setTheme("dark"));
      localStorage.setItem("theme", "dark");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark shadow">
        <div className="container-fluid">
          <i
            className="navbar-brand fa-solid fa-bars text-light ms-5 toggler"
            onClick={() => toggleSidebar()}
          ></i>

          <ul className="navbar-nav ms-auto me-5">
            <li
              className="nav-item profile-icon grid-item-center"
              title={user.username}
            >
              <small className="text-info ">
                {user.username.charAt(0).toUpperCase()}
              </small>
            </li>
          </ul>
        </div>
      </nav>

      <div className={`sidebar ${sidebar} bg-${theme} card`}>
        <div className="d-flex justify-content-end pt-3 pe-3">
          <i
            className={`fa-solid fa-xmark ${text_color} toggler`}
            onClick={() => toggleSidebar()}
          ></i>
        </div>
        <ul className="mt-3">
          <li className="nav-list">
            <NavLink end to="/app" className={`nav-link ${active_nav_style} `}>
              <i className="fa-solid fa-chart-simple me-2 text-info"></i>{" "}
              Dashboard
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="notes" className={`nav-link ${active_nav_style} `}>
              <i className="fa-solid fa-note-sticky me-2 text-primary"></i>{" "}
              Notes
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="projects" className={`nav-link ${active_nav_style}`}>
              <i className="fa-solid fa-folder me-2 text-warning"></i> Projects
            </NavLink>
          </li>
          <li className="nav-list">
            <NavLink to="tasks" className={`nav-link ${active_nav_style}`}>
              <i className="fa-solid fa-list-check me-2 text-success"></i> Tasks
            </NavLink>
          </li>
          <div className="dropdown">
            <li className="nav-list">
              <a className={`nav-link ${active_nav_style}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fa-solid fa-sliders me-2 text-secondary"></i>{" "}
                    Manage
                  </div>
                  <i className="fa-solid fa-caret-down me-3"></i>
                </div>
              </a>
            </li>
            <ul className="dropdown-content">
              <a
                className={`dropdown-links ${active_nav_style}`}
                onClick={() => useTheme()}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`${text_color}`}>Theme</span>
                  <i
                    className={`${text_color} fa-solid fa-circle-half-stroke`}
                  ></i>
                </div>
              </a>

              <a
                className={`dropdown-links ${active_nav_style}`}
                onClick={() => userLogout()}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`${text_color}`}>Log out</span>
                  <i
                    className={`fa-solid fa-arrow-right-from-bracket ${text_color}`}
                  ></i>
                </div>
              </a>
            </ul>
          </div>
        </ul>
      </div>
    </>
  );
};

export default AppNav;
