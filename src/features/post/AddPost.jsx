import { faImage, faX, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAddpostMutation } from "./postApiSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../config/firebase.config";
import PostLoader from "../../loaders/PostLoader";
import { Link } from "react-router-dom";

const AddPost = () => {
  const { id, name } = useAuth();

  //Initiation of Storage for our cloud
  const storage = getStorage(app);
  const metadata = {
    contentType: "image/jpeg",
  };

  //Status for rendering complex UI
  const [status, setStatus] = useState("adding");

  useEffect(() => {
    setStatus("adding");
  }, []);

  //Main State for handling our data
  const [img, setImg] = useState("");
  const [caption, setCaption] = useState("");

  //Endpoints Mutation
  const [addpost, isSuccess, isError, error] = useAddpostMutation();

  //our hooks for displaying id and name for our response data

  //HANDLERS
  const onChange = (e) => {
    setImg(e.target.files[0]);
  };

  console.log(img.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id && img && caption) {
      const file = img;

      const fileT = ref(storage, `img/${file.name}`);
      const uploadTask = uploadBytesResumable(fileT, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          setStatus("loading");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;

            // ...

            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setStatus("success");
            await addpost({
              user: id,
              caption,
              photoUrl: downloadURL,
              name: img.name,
            });
            setCaption("");
            setImg("");

            toast.success("Post Success !");
          });
        }
      );
    } else {
      toast.error("Supply All Fields");
    }
  };

  const remove = () => {
    setImg("");
  };

  //FOR BUTTON DISABLE
  const able = [img, id, caption].every(Boolean);

  //For Optional rendering
  let content;

  if (status === "adding") {
    content = (
      <form onSubmit={handleSubmit}>
        <div className="name_but">
          <h3>{name ? name : "unknown "}</h3>
          <button
            disabled={!able}
            style={{
              background: able
                ? "linear-gradient(92.73deg, #7426c1 11.58%, #3c26c1 92.75%)"
                : "gray",
            }}
          >
            Post
          </button>
        </div>

        <input
          type="text"
          placeholder="Write your caption...."
          maxLength={30}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <div className="img_select">
          {img ? (
            <>
              <button onClick={remove}>
                <FontAwesomeIcon icon={faX} />
              </button>
              <div className="photo">
                <img src={URL.createObjectURL(img)} />
              </div>
            </>
          ) : (
            <>
              <span>
                <FontAwesomeIcon icon={faImage} />{" "}
              </span>
              <h3>Select your image from your Device</h3>
              <label htmlFor="file" className="file">
                Select from Device
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => onChange(e)}
                />
              </label>
            </>
          )}
        </div>
      </form>
    );
  } else if (status === "loading") {
    content = (
      <div className="add_loader">
        <PostLoader />
        <h1>Uploading..</h1>
      </div>
    );
  } else if (status === "success") {
    content = (
      <div className="add_success">
        <h1>
          <FontAwesomeIcon icon={faCircleCheck} />
        </h1>
        <h2>Post Sucess</h2>

        <Link to={`/${id}`} className="view">
          view post
        </Link>
      </div>
    );
  }

  return (
    <div className="add_main">
      <ToastContainer limit={1} />
      <h1>Photo Gallery</h1>
      {content}
    </div>
  );
};

export default AddPost;
