import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  //Regiser Form Data

  const navigate = useNavigate();

  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    }
  }, [isSuccess]);

  //Manipulating DOM
  const visible = useRef(false);
  const shotButton = useRef();
  const passType = useRef();

  //function
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const showPass = () => {
    visible.current = !visible.current;
    shotButton.current.className = visible.current
      ? "bi bi-eye eye_icon"
      : "bi bi-eye-slash eye_icon";

    passType.current.type = visible.current ? "text" : "password";
  };

  //Button Control
  const submit = [data.name, data.email, data.password].every(Boolean);

  //FORM SUBMIT
  const submitForm = async (e) => {
    e.preventDefault();
    if (submit) {
      await register({ ...data });
    }
  };

  //ERROR HANDLER
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message.toString());
      console.log(error.data);
    }
  }, [isError]);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <div className="register_main">
        <div className="register_div">
          <h1>PhotoGallery</h1>
          <p>Sign up for amazing expirience and see more photos</p>
          <form action="" className="register_form" onSubmit={submitForm}>
            <div>
              <span>
                <input
                  type="text"
                  placeholder="Name / Username"
                  name="name"
                  onChange={(e) => handleSubmit(e)}
                />
              </span>

              <span>
                <input
                  type="email"
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
                <i
                  ref={shotButton}
                  className="bi bi-eye-slash eye_icon"
                  onClick={showPass}
                ></i>
              </span>
            </div>

            <button disabled={isLoading || !submit}>
              <p>Sign In</p>
            </button>
          </form>

          <span className="to_sign">
            <Link to="/">back to login</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
