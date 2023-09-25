import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import profile from "../../assets/loginprofile.png";
import { useLoginMutation } from "./authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setToken, selectToken } from "./auth";
import { useSelector } from "react-redux";

export const loader = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return redirect("/");
  }

  return null;
};

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logIn, setLogIn] = useState("");

  const token = useSelector(selectToken);

  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const visible = useRef(false);
  const shotButton = useRef();
  const passType = useRef();

  const handleSubmit = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    if (canSave) {
      const { accessToken } = await login({ ...data }).unwrap();
      dispatch(setToken({ accessToken }));
      sendData({
        email: "",
        password: "",
      });

      toast.success("Log In Succesfulyy ");
      navigate("/");
    }
  };

  const showPass = () => {
    visible.current = !visible.current;
    shotButton.current.textContent = visible.current
      ? "visibility"
      : "visibility_off";

    passType.current.type = visible.current ? "text" : "password";
  };

  const canSave = [data.email, data.password].every(Boolean);

  return (
    <div className="login_main">
      <div className="left">
        <img src={profile} alt="" />
      </div>

      <div className="right">
        <h1>PhotoGallery</h1>
        <form className="login_form" onSubmit={sendData}>
          <div>
            <span>
              <input
                type="text"
                placeholder="Email Adress"
                name="email"
                onChange={(e) => handleSubmit(e)}
              />
            </span>

            <span>
              <input
                ref={passType}
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleSubmit(e)}
              />
              <span
                ref={shotButton}
                className="eye_icon material-symbols-outlined"
                onClick={showPass}
              >
                visibility_off
              </span>
            </span>
          </div>

          <button disabled={isLoading || !canSave}>
            <p>Log In</p>
          </button>
        </form>

        <span className="to_sign">
          <p>don't have account ? </p>
          <Link to="/register">sign in</Link>
        </span>
      </div>
    </div>
  );
};

export default LogIn;
