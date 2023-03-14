import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark shadow">
        <div className="container-fluid">
          <Link className="navbar-brand ms-5 text-light" to="/">
            Do-day
          </Link>
          
          <ul className="navbar-nav ms-auto me-5">
              <li className="nav-item">
                <Link to="login" className="nav-link text-light">
                  Login
                </Link>
              </li>
            </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
