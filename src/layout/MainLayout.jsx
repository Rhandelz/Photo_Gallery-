import { Outlet, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import Nav from "../components/Nav";
import LogOut from "../modal/LogOut";

const MainLayout = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <LogOut show={show} setShow={setShow} />
      <ToastContainer
        position="top-right"
        autoClose={1200}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Nav setShow={setShow} />
      <Outlet />
    </>
  );
};

export default MainLayout;
