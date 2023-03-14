import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  const footer_date = new Date().getFullYear();
  return (
    <>
      <div className="container-fluid bg-dark mt-5 py-5">
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="py-3 ps-5">
              <h2 className="text-light mb-3">Do-day</h2>
              <p className="text-secondary">
                Stay organized and effective with your daily tasks.
              </p>

              <p className="text-secondary">
                <small>
                  Copyright &copy; <span>{footer_date}</span>.{" "}
                  <a href="doday.me" className="text-muted">
                    Do-day.me
                  </a>
                </small>
              </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="row py-3">
              <div className="col-6">
                <h6 className="text-light mb-4">Navigation</h6>
                <ul className="footer-nav-container">
                  <li>
                    <Link to="/login" className="text-secondary nav-link">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-secondary nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-6">
                <h6 className="text-light mb-4">Support</h6>
                <ul className="footer-nav-container">
                  <li>
                    <Link to="/login" className="text-secondary nav-link">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-secondary nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12"></div>
        </div>
      </div>
    </>
  );
};

export default Footer;
