import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import { useState } from "react";
const Register = () => {
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [validation, setValidation] = useState('')
  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(()=>{
    if(password1 != '' && password2 != '' && password2 == password1){
      setValidation('Password matched')
      setUser({...user, password1:password1, password2:password2})
    }
    else if (password1 != '' && password2 != '' && password2 != password1){
      setValidation('Password not matched')
    }
    else{
      setValidation('')
    }
  }, [password2, password1])

  const validate = useMemo(()=>{
    if(validation == 'Password matched'){
      return ''
    }
    return 'disabled'
  })

  const countriesList = Object.values(countries);
  const country = countriesList.map((country) => country.name).sort();
  const userRegister=async(e)=>{
    e.preventDefault()
    const request = await fetch(`http://127.0.0.1:9000/user/register/`, {
      method: 'POST',
      headers : {
        'Content-type':'application/json'
      },
      body: JSON.stringify(user)
    })
    const response = await request.json()
    if(request.status == 200){
      navigate('/login')
    }
  }

  return (
    <>
      <div
        className="container-fluid grid-item-center py-5"
        style={{ height: "fit-content" }}
      >
        <form onSubmit={e=>userRegister(e)} className="p-5 form-bg col-md-6 col-sm-10 shadow rounded my-3">
          <h5 className="form-header">Register</h5>
          <input
            type="email"
            className="form-control my-3"
            autoComplete="email"
            placeholder="E-mail"
            value={user.email || ''}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            className="form-control my-3"
            autoComplete="username"
            placeholder="Username"
            value={user.username || ''}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <div className="row gx-3 my-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                value={user.first_name || ''}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control col"
                placeholder="Last Name"
                value={user.last_name || ''}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="row gx-3 my-3">
            <div className="col">
              <select
                name="gender"
                className="form-control"
                placeholder="Gender"
                value={user.gender || ''}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option value="Gender">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="col">
              <select
                name="country"
                className="form-control"
                placeholder="Country"
                value={user.country || ''}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
              >
                <option value="Country">Country</option>
                {country.map((country, index) => (
                  <option key={index}>{country}</option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="text"
            placeholder="State"
            // autoComplete="state"
            className="form-control"
            value={user.state || ''}
            onChange={e=>setUser({...user, state:e.target.value})}
          />
          <input
            type="password"
            name="password1"
            autoComplete="current-password"
            placeholder="Password"
            className="form-control my-3"
            value={password1 || ''}
            onChange={e=>setPassword1(e.target.value)}
          />
          <input
            type="password"
            name="password2"
            autoComplete="current-password"
            placeholder="Re-Enter Password"
            className="form-control my-3"
            value={password2 || ''}
            onChange={e=>setPassword2(e.target.value)}
          />
          <button
            type="submit"
            className={`btn btn-dark form-control mb-3 ${validate}`}      
          >Register</button>
          <p className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
