import Navbar from "../UI/Navbar";
import Button from "../UI/Button";
import classes from "./NavHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faGlobe,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../store/firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/login-slice";
import { userActions } from "../store/user-slice";
import userImage from "../images/user.png";
import ProfilePicture from "../UI/ProfilePicture";

function NavHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.users.authUser);

  async function logoutHandler() {
    await signOut(auth);
    console.log("signed out successfully!");
    dispatch(loginActions.logoutHandler());
    dispatch(userActions.resetAuthUser());
    navigate("/");
  }

  return (
    <Navbar>
      <ul className={classes.links}>
        <li>
          <Link>
            <FontAwesomeIcon icon={faGlobe} />
          </Link>
        </li>
        <li>
          <Link>
            <FontAwesomeIcon icon={faBell} />
          </Link>
        </li>
        <li>
          <Link>
            <FontAwesomeIcon icon={faFacebookMessenger} />
          </Link>
        </li>
        <li>
          <Link>
            <ProfilePicture className={classes["profile-picture"]} />
          </Link>
        </li>
        <li>
          <Link>
            <Button onClick={logoutHandler} className={classes.logout}>
              <FontAwesomeIcon icon={faRightFromBracket} /> Log out
            </Button>
          </Link>
        </li>
      </ul>
    </Navbar>
  );
}

export default NavHome;
