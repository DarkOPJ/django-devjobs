import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer theme="dark"/>

    </>
  );
};

export default PageLayout;
