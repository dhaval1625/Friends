import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { sendUserData, userActions } from "../store/user-slice";
import userImage from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../store/firebase";
import imageCompression from "browser-image-compression";

function Register() {
  const data = useActionData();
  const uploadDP = useRef();
  const [DP, setDP] = useState(null);
  const [dpURL, setDpURL] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [pwdType, setPwdType] = useState("password");

  const nav = useNavigation();
  const sending = nav.state === "submitting";

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.users);

  useEffect(() => {
    if (data && data.userData) {
      const fullUserData = { ...data.userData, profilePictureURL: dpURL };

      dispatch(userActions.addUser(fullUserData));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (userState.changedUsers === true) {
      dispatch(sendUserData(userState.users));
      dispatch(userActions.resetChange());
    }
  }, [userState, dispatch]);

  function uploadImageHandler() {
    uploadDP.current.click();
  }

  // * This function will upload the image to firebase
  async function displayImageHandler(e) {
    const displayPicture = e.target.files[0];
    setDP(displayPicture);

    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedImage = await imageCompression(displayPicture, options);

    const path = ref(storage, `dp-images/${displayPicture.name}`);

    await uploadBytes(path, compressedImage);
    const url = await getDownloadURL(path);
    setDpURL(url);
  }

  // * This will read the uploaded image and display it on preview
  useEffect(() => {
    if (DP) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;

        if (result) setFileURL(result);
      };

      fileReader.readAsDataURL(DP);
    }
  }, [DP]);

  // * Toggle password input to visible or hidden
  const togglePwdTypeHandler = () =>
    setPwdType((prevType) => (prevType === "password" ? "text" : "password"));

  return (
    <section className={classes.container}>
      <Form method="post" className={classes["form-container"]}>
        <div className={classes["dp-container"]}>
          <label htmlFor="profile-picture">Upload Profile Picture</label>
          <div>
            <img
              src={fileURL ? fileURL : userImage}
              alt="profile picture icon"
            />
            <Button
              onClick={uploadImageHandler}
              type="button"
              className={classes["btn-upload-dp"]}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
          </div>
          <input
            onChange={displayImageHandler}
            ref={uploadDP}
            type="file"
            id="profile-picture"
            name="profile-picture"
            hidden
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            type="text"
            placeholder="Enter your first name"
            name="first-name"
            required
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            type="text"
            placeholder="Enter your last name"
            name="last-name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className={classes["pwd-container"]}>
            <input
              id="password"
              type={pwdType}
              placeholder="Enter your password"
              name="password"
              required
            />
            <button
              onClick={togglePwdTypeHandler}
              type="button"
              className={classes["btn-toggle-visible"]}
            >
              <FontAwesomeIcon
                icon={pwdType === "password" ? faEyeSlash : faEye}
              />
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="phone-number">Phone Number</label>
          <input
            id="phone-number"
            type="number"
            placeholder="Enter your phone number"
            name="phone-number"
          />
        </div>
        <div>
          <label htmlFor="birth-date">Birth Date</label>
          <input
            id="birth-date"
            type="date"
            placeholder="Enter your birth date"
            name="birth-date"
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option defaultChecked value="male">
              Male
            </option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Button className={classes["btn-register"]} type="submit">
          Register
        </Button>
      </Form>
      {data && (
        <div
          className={`${classes.info} ${
            data.status === "error" ? classes.error : ""
          }`}
        >
          <p>{data.message}</p>
        </div>
      )}
      {sending && (
        <div className={classes.info}>
          <p>Sending data...</p>
        </div>
      )}
      <div className={classes.info}>
        <p>
          Already have an account? Go to
          <Link to=".." className={classes["link-login"]}>
            Login Page
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
