import React from "react";
import defaultImg from "../../assets/no-dp.jpg";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPost } from "../post/postApiSlice";
import { selectUserById } from "./userApiSlice";

const UserPost = () => {
  //NOTE  : were using a more if & an place holder to memoize our components and i can lessen the error , since sometimes our selector returning a null value
  //todo make more memoize by make a another componentd for map rirendering

  //In help by useparams we can get an id ha can match what were looking for
  const { id } = useParams();

  //getting a specific user that match the post
  const user = useSelector((state) => selectUserById(state, String(id)));

  const posts = useSelector((state) => selectAllPost(state));

  let upperContent;
  let filteredData;
  let postCount = 0;

  //get the specific post of this user have
  if (posts) {
    filteredData = posts.filter((post) => post.user == id);
  } else {
    filteredData = [];
  }

  postCount = filteredData.length;
  let content;

  if (filteredData) {
    content = filteredData.map((post) => (
      <div key={post.id}>
        <img src={post.photoUrl} alt="" />
      </div>
    ));
  } else {
    content = <h1>Loadingg..</h1>;
  }

  if (!user) upperContent = <h1>Loadiingg...</h1>;

  if (user) {
    upperContent = (
      <div className="upper">
        <div className="dp_info">
          <div className="img_container">
            <div>
              <img src={user.profile ? user.profile : defaultImg} alt="" />
            </div>
          </div>
          <div className="main_info">
            <span>
              <h1>{user.name}</h1>
              <p>
                {" "}
                <b>{`${postCount} post`}</b> <b>Joined november 16 2002</b>{" "}
              </p>
            </span>

            <span>
              <h3>{user.bio ? user.bio : "No Bio Available "}</h3>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="single_post">
      {upperContent}
      <hr />

      <div className="lower">
        <nav>
          <span>
            <h2>Gallery</h2>
            <i class="bi bi-image-fill"></i>
          </span>
        </nav>

        <div className="user_post">
          <div className="user_photo">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
