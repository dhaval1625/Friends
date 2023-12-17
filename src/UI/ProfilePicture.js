import { useSelector } from "react-redux";
import userImage from "../images/user.png";
import classes from "./ProfilePicture.module.css";

function ProfilePicture(props) {
  const authUser = useSelector((state) => state.users.authUser);

  let srcDP = authUser.profilePicture;

  if (props.dp) srcDP = props.dp;

  return (
    <img
      className={`${classes["profile-picture"]} ${props.className}`}
      src={srcDP || userImage}
      alt="User DP"
    />
  );
}

export default ProfilePicture;
