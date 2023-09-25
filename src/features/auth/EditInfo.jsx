import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/no-dp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faPencil,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "../user/userApiSlice";
import { useEdituserMutation } from "../user/userApiSlice";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../config/firebase.config";
import { useNavigate } from "react-router-dom";
import MainLoader from "../../loaders/MainLoader";

const EditInfo = () => {
  //Initialization od firebase Storage
  const storage = getStorage(app);
  const metadata = {
    contentType: "image/jpeg",
  };

  // hooks for our acc indicators
  const { id } = useAuth();

  //navigation
  const navigate = useNavigate();

  //getting user
  const user = useSelector((state) => selectUserById(state, String(id)));

  //mutation
  const [edit, { isLoading, isError, isSuccess, error }] =
    useEdituserMutation();

  // State
  const [name, setName] = useState("");
  const [bio, setBio] = useState("no bio available");
  const [profile, setProfile] = useState("");
  const [cDP, setCdp] = useState(false);
  const [status, setStatus] = useState(true);

  const addimg = (e) => {
    setProfile(e.target.files[0]);
    setCdp(true);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setProfile(user.profile);
    }
  }, [user]);

  console.log(bio);
  console.log(name);
  console.log(profile);

  if (isError) {
    console.log(error);
  }

  const submitForm = async (e) => {
    e.preventDefault();

    if (!cDP && name) {
      await edit({
        id,
        name: name,
        bio: bio || "not bio available",
        profile: profile,
      });
      navigate("/personal");
    } else if (cDP && name) {
      const file = profile;

      const fileT = ref(storage, `img/${file.name}`);
      const uploadTask = uploadBytesResumable(fileT, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          setStatus(false);

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
            await edit({
              id,
              name: name,
              bio: bio || "not bio available",
              profile: downloadURL,
            });
            setStatus(true);

            navigate("/personal");
          });
        }
      );
    } else {
      console.error("error");
    }
  };

  return (
    <div className="edit_info">
      {user ? (
        <form className="editForm_info" onSubmit={submitForm}>
          <div className="profile_info">
            <div>
              <label htmlFor="dp">
                <FontAwesomeIcon icon={faImage} />
              </label>

              <input type="file" id="dp" onChange={(e) => addimg(e)} />

              <img src={profile} alt={defaultImg} />
            </div>
          </div>

          <div className="info_value">
            <span>
              <h1>
                <FontAwesomeIcon icon={faPencil} />
              </h1>
              <input
                type="text"
                placeholder=""
                value={name}
                maxLength={20}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </span>

            <h1>
              <FontAwesomeIcon icon={faCalendar} />
              {"    "}
              Joined July 10 2003
            </h1>

            <span>
              <textarea
                cols="30"
                rows="10"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </span>
          </div>

          <button
            className="submit_edit"
            disabled={!status}
            style={{ background: !status && "gray" }}
          >
            Edit
          </button>
        </form>
      ) : (
        <MainLoader />
      )}
    </div>
  );
};

export default EditInfo;
