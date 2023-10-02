import React, { useEffect, useState } from "react";
import { selectAllUser } from "./userApiSlice";
import { useSelector } from "react-redux";
import UserResult from "./UserResult";

const SearchUser = () => {
  const user = useSelector((state) => selectAllUser(state));

  const [srch, setSrch] = useState("");

  let content = user.filter((data) =>
    data.name.toLowerCase().includes(srch.toLowerCase())
  );

  return (
    <div className="main_search">
      <div className="srch_div">
        <span>
          <label htmlFor="src">
            <i class="bi bi-search"></i>
          </label>
          <input
            type="text"
            id="src"
            placeholder="search user "
            value={srch}
            onChange={(e) => setSrch(e.target.value)}
          />
        </span>
      </div>

      <div className="srch_list">
        {content.length && srch ? (
          content.map((data) => <UserResult user={data} key={data._id} />)
        ) : (
          <div className="srch_blank">
            <h1>
              <i class="bi bi-search"></i>
            </h1>
            <h4>No User Display , Search for user</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
