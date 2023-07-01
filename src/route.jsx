import React from "react";
import Home from "./components/home";
import App from "./components/app";
import Register from "./components/register";
import Login from "./components/login";
import Features from "./components/features";
import Notes from "./components/app_pages/notes";
import Tasks from "./components/app_pages/tasks"
import Projects from "./components/app_pages/projects";
import Project from "./components/app_pages/project";
import Dashboard from "./components/app_pages/dashboard";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Task from "./components/app_pages/task";
import CreateTask from "./components/app_pages/create_task";
import Note from "./components/app_pages/note";
import CreateNote from "./components/app_pages/create_note";
import ProjectList from "./components/app_pages/projectlist";
import { setProjects } from "./slices/projects";
import { setNote } from "./slices/notes";
import { setTask } from "./slices/tasks";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./slices/user";
import { setToken } from "./slices/auth";
import Share from "./components/app_pages/share";
import AddProject from "./components/app_pages/addtoproject";
import DeleteTask from "./components/app_pages/delete_task";
import AddCollaborator from "./components/app_pages/addcollaborator";

const Route = () => {
  const token = useSelector((state)=>state.auth.value)
  
  const dispatch = useDispatch();;
  useEffect(()=>{
    updateTokens()
  }, [])
  const updateTokens = async () => {
    const refreshToken = JSON.parse(localStorage.getItem("refresh"));
    if (refreshToken) {
      const response = await fetch(
        `http://127.0.0.1:9000/user/login/refresh/`,
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
        dispatch(setToken({"access":data.access}));
        localStorage.setItem("refresh", JSON.stringify(data.refresh));
      }
    }
  };
  const user = useSelector((state)=>state.user.value)
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      loader : async()=>{
        if(user){
          return redirect('/app')
        }
        return null
      },
      children: [
        { index: true, element: <Features /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/app",
      element: <App />,
      loader : async()=>{
        
        if(!user){
          return redirect('/login')
        }
        return null
      },
      children: [
        {
          index: true,
          element: <Dashboard />,
          loader : async () => {
            let dashboardData = []
            let response = await fetch(`http://127.0.0.1:9000/note/`, {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.access}`,
              },
            });
            if(response.status==200){
              const notes = await response.json();
              dispatch(setNote(notes))
              dashboardData.push(notes)
            }
            response = await fetch(`http://127.0.0.1:9000/todo/`, {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.access}`,
              },
            });
            if(response.status==200){
              const tasks = await response.json();
              dispatch(setTask(tasks))
              dashboardData.push(tasks)
            }
            response = await fetch(`http://127.0.0.1:9000/projects/`, {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token.access}`,
              },
            });
            if(response.status==200){
              const projects = await response.json();
              dispatch(setProjects(projects))
              dashboardData.push(projects)
            }
            
            return dashboardData
          }
        },
        {
          path: "tasks",
          element: <Tasks />,
          children: [
            {
              path : ':id',
              element : <Task />,
              loader : async({params})=>{
                const response = await fetch(`http://127.0.0.1:9000/todo/${params.id}`, {
                  headers : {
                    'content-type': 'application/json',
                  Authorization: `Bearer ${token.access}`}
                })
                const data = response.json()
                return data
              }
            },
            {
              path: 'create',
              element : <CreateTask />
            },
            {
              path: ':task/share',
              element: <Share />
            },
            {
              path: ':id/add_to',
              element: <AddProject />
            },
            {
              path: ':task/delete',
              element: <DeleteTask />
            }
          ]

        },
        
        {
          path: "notes",
          element: <Notes />,
          children: [
            {
              path : ':id',
              element : <Note />,
              loader : async({params})=>{
                const response = await fetch(`http://127.0.0.1:9000/note/${params.id}`, {
                  headers : {
                    'content-type': 'application/json',
                  Authorization: `Bearer ${token.access}`}
                })
                const data = response.json()
                return data
              }
            },
            {
              path: 'create',
              element : <CreateNote />
            }
          ]
          
        },
        {
          path: 'projects',
          element : <Projects />,
          children : [
            {
              index : true,
              element : <ProjectList />,
            },
            {
              path : ':id',
              element : <Project />,
              children : [
                {
                  path : ':task',
                  element : <Task />,
                  loader : async({params})=>{
                    const response = await fetch(`http://127.0.0.1:9000/todo/${params.task}`, {
                      headers : {
                        'content-type': 'application/json',
                      Authorization: `Bearer ${token.access}`}
                    })
                    const data = response.json() 
                    return data
                  }
                },
                {
                  path: ':task/share',
                  element: <Share />
                },
                {
                  path: ':task/delete',
                  element: <DeleteTask />
                },
                {
                  path: 'add_collaborator',
                  element: <AddCollaborator />
                },
                {
                  path: 'task/create',
                  element : <CreateTask />
                }
              ]
              
            },

          ]
        }
        
        
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default Route;
