import React from "react";
import ReactDOM from "react-dom/client";
import Route from "./route";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import  userReducer  from "./slices/user";
import authReducer from "./slices/auth"
import noteReducer from "./slices/notes"
import taskReducer from "./slices/tasks"
import themeReducer from "./slices/theme"
import projectsReducer from "./slices/projects"


const store = configureStore(
  {
    reducer : {
      user : userReducer,
      auth : authReducer,
      notes : noteReducer,
      tasks : taskReducer,
      theme : themeReducer,
      projects : projectsReducer,
    }
  }
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <Route />
    </Provider>
  </React.StrictMode>
);