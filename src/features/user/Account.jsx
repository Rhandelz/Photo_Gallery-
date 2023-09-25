import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { selectUserById } from "./userApiSlice";
import { useSelector } from "react-redux";
import MainLoader from "../../loaders/MainLoader";

const Account = () => {
  const { id } = useAuth();

  const user = useSelector((state) => selectUserById(state, String(id)));

  return (
    <div className="user_acc">
      {user ? (
        <>
          <h1>User Account Information</h1>
          <div className="main_acc">
            <span>
              <FontAwesomeIcon icon={faUser} className="icon" />
              <h1>{user.name}</h1>
            </span>

            <span>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <h1>{user.email}</h1>
            </span>
          </div>
        </>
      ) : (
        <MainLoader />
      )}
    </div>
  );
};

export default Account;
