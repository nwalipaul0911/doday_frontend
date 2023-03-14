import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./templates/navbar";
import Footer from "./templates/footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
