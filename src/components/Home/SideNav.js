import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePicture from "../../UI/ProfilePicture";
import classes from "./SideNav.module.css";
import {
  faNewspaper,
  faUserGroup,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideNav() {
  const authUser = useSelector((state) => state.users.authUser);

  return (
    <aside className={classes.aside}>
      <ul>
        <li>
          <NavLink
            to={`/home/profile/${authUser.id}`}
            className={({ isActive }) =>
              isActive
                ? `${classes["link-container"]} ${classes.active}`
                : classes["link-container"]
            }
          >
            <ProfilePicture className={classes["profile-picture"]} />
            <h3>{authUser.userName}</h3>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              isActive
                ? `${classes["link-container"]} ${classes.active}`
                : classes["link-container"]
            }
          >
            <FontAwesomeIcon icon={faNewspaper} />
            <p>Your Feed</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/friends"
            className={({ isActive }) =>
              isActive
                ? `${classes["link-container"]} ${classes.active}`
                : classes["link-container"]
            }
          >
            <FontAwesomeIcon icon={faUserGroup} />
            <p>Friends</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/find-friends"
            className={({ isActive }) =>
              isActive
                ? `${classes["link-container"]} ${classes.active}`
                : classes["link-container"]
            }
          >
            <FontAwesomeIcon icon={faUsersViewfinder} />
            <p>Find Friends</p>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideNav;
