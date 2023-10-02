import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import defaultDP from "../assets/no-dp.jpg";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "../features/user/userApiSlice";

const Nav = ({ setShow }) => {
  const btnShow = useRef(false);
  const navRef = useRef();
  const navBtn = useRef();

  const { id } = useAuth();

  const user = useSelector((state) => selectUserById(state, String(id)));

  const show = () => {
    btnShow.current = !btnShow.current;

    navRef.current.style.transform = `translateX(${
      btnShow.current ? "0px" : "-120px"
    })`;

    navBtn.current.style.right = btnShow.current ? "10px" : "-30px";
  };

  console.log(user);

  return (
    <nav className="nav_main" ref={navRef}>
      <button onClick={show} ref={navBtn}>
        <i class="bi bi-list"></i>
      </button>
      <div className="profile_up">
        <div>
          <img src={user?.profile || defaultDP} alt="" />
        </div>
      </div>

      <div className="nav_bottom" style={{}}>
        <div>
          <NavLink to="/" className="a">
            <i class="bi bi-house-fill"></i>
            <h2>Home</h2>
          </NavLink>
          <NavLink to="/addpost" className="a">
            <i class="bi bi-image-fill"></i>
            <h2>Gallery</h2>
          </NavLink>
          <NavLink to="/search" className="a">
            <i class="bi bi-search"></i>
            <h2>Search</h2>
          </NavLink>
          <NavLink to="/personal" className="a">
            <i class="bi bi-person-circle"></i>
            <h2>Profile</h2>
          </NavLink>{" "}
        </div>
      </div>

      <div className="foot_btn">
        <button onClick={() => setShow(true)}>
          <i class="bi bi-three-dots-vertical"></i>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
