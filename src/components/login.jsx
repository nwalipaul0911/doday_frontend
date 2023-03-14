import React from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setToken } from "../slices/auth";
import { login } from "../slices/user";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = async(e)=>{
    e.preventDefault()
    const response = await fetch(`http://127.0.0.1:9000/user/login/`, {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify({"email":e.target.email.value, "password":e.target.password.value})
    })
    const data = await response.json()
    if(response.status == 200){ 
      const jwt_decode = jwtDecode(data.access)
      dispatch(login(jwt_decode))
      dispatch(setToken({"access": data.access}))
      localStorage.setItem("refresh", JSON.stringify(data.refresh))
      navigate('/app')
    }
  }
  return (
    <>
      <div
        className="container-fluid grid-item-center py-5"
        style={{ height: "fit-content" }}
      >
        <form onSubmit={e=>userLogin(e)} className="p-5 my-3 form-bg col-md-6 col-sm-10 shadow rounded">
          <h5 className="form-header">Login</h5>
          <div className="form-group">
            <input
              type="email"
              autoComplete="email"
              name="email"
              className="form-control my-3"
              placeholder="E-mail"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
              className="form-control my-3"
            />
            <input
              className="btn btn-dark form-control mb-3"
              type="submit"
            />
            <p className="text-center">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
