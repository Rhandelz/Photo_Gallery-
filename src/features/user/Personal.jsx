import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/no-dp.jpg";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllPost } from "../post/postApiSlice";
import { selectUserById } from "./userApiSlice";
import useAuth from "../../hooks/useAuth";
import { useDelpostMutation, useAddpostMutation } from "../post/postApiSlice";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../config/firebase.config";
import UserModal from "../../modal/UserModal";

const Personal = () => {
  const { id } = useAuth();

  const [show, setShow] = useState(false);

  const [urlName, setUrlName] = useState("");
  const [success, setSuccess] = useState(false);

  const storage = getStorage(app);

  const user = useSelector((state) => selectUserById(state, String(id)));

  const posts = useSelector((state) => selectAllPost(state));

  const [deleleP, { isLoading, isSuccess, isUninitialized }] =
    useDelpostMutation();

  const delelePost = async (imgUrl, postId) => {
    const dell = await deleleP({ id: postId });

    if (dell) {
      const desertRef = ref(storage, `img/${imgUrl}`);

      deleteObject(desertRef)
        .then(async () => {
          // File deleted successfully
          console.log("deleted success");
          setSuccess(false);
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    }
  };

  console.log(urlName);

  let upperContent;
  let filteredData;
  let postCount = 0;

  if (posts) {
    filteredData = posts.filter((post) => post.user == id);
  } else {
    filteredData = [];
  }

  postCount = filteredData.length;
  let content;

  if (filteredData) {
    content = filteredData.map((post) => (
      <div key={post.id} className="personal_img">
        <button
          className="delete"
          onClick={() => {
            delelePost(post.name, post.id);
          }}
        >
          <i class="bi bi-trash3-fill"></i>
        </button>
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
          <div className="img_container_me">
            <div>
              <img src={user.profile ? user.profile : defaultImg} alt="" />
            </div>
          </div>
          <div className="main_info_me">
            <span>
              <span>
                <h1>{user.name}</h1>

                <button onClick={() => setShow(true)}>
                  <i class="bi bi-gear-fill"></i>
                </button>
              </span>

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
    <>
      <UserModal show={show} setShow={setShow} />
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
            {filteredData.length < 1 ? (
              <div className="no_post">
                <h1>No Post</h1>
              </div>
            ) : (
              <div className="user_photo">{content}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
