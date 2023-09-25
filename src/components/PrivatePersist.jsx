import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, useNavigate, Navigate } from "react-router-dom";
import { useRefreshMutation } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, setToken } from "../features/auth/auth";

const PrivatePersist = () => {
  const token = useSelector(selectToken);

  /*   console.log(token); */

  const [refresh, { isSuccess, isUninitialized, isError, error, isLoading }] =
    useRefreshMutation();

  let content;

  if (!token) {
    content = <Navigate to="/login" />;
  } else if (isLoading) {
    content = <h1>Loading</h1>;
  } else if (isError) {
    content = <h1>{error.message}</h1>;
    console.log(error);
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PrivatePersist;
