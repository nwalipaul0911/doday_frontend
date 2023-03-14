import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { setToken } from "../slices/auth";
import { login } from "../slices/user";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import AppNav from "./templates/appnav";

const App = () => {
  const theme = useSelector((state) => state.theme.value);
  const theme_bg = theme == "dark" ? "bg-dark" : "bg-light";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarState = localStorage.getItem("sidebar");
  const [sidebar, setSidebar] = useState(() =>
    sidebarState ? sidebarState : "hidden"
  );
  // navbar toggle function
  const toggleSidebar = () => {
    if (sidebar == "hidden") {
      setSidebar("visible");
      localStorage.setItem("sidebar", "visible");
    } else {
      setSidebar("hidden");
      localStorage.setItem("sidebar", "hidden");
    }
  };

  // token update section
  useEffect(() => {
    let updateUser = setInterval(() => {
      updateTokens();
    }, 1800000);
    return () => clearInterval(updateUser);
  }, []);
  const updateTokens = async () => {
    const refreshToken = JSON.parse(localStorage.getItem("refresh"));
    if (refreshToken) {
      const response = await fetch(
        "http://127.0.0.1:9000/user/login/refresh/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        const jwt_decode = jwtDecode(data.access);
        dispatch(login(jwt_decode));
        dispatch(setToken({ access: data.access }));
        localStorage.setItem("refresh", JSON.stringify(data.refresh));
      }
    }
  };
  const app_ui =
    sidebar == "hidden"
      ? "app-content-container-sidebar-hidden"
      : "app-content-container";
  return (
    <>
      <div className="main-app-container">
        <AppNav sidebar={sidebar} toggleSidebar={toggleSidebar} />

        <div className={`${theme_bg} ${app_ui}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
