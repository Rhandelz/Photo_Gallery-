import { Link } from "react-router-dom";
import React from "react";
import defaultDP from "../../assets/no-dp.jpg";

const UserResult = ({ user }) => {
  return (
    <div className="user_result">
      <span>
        <div>
          <img src={user.profile ? user.profile : defaultDP} alt="" />
        </div>

        <h2>{user.name}</h2>
      </span>

      <Link to={`/${user._id}`} className="go_to">
        view
      </Link>
    </div>
  );
};

export default UserResult;
