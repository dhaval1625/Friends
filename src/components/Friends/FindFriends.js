import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../UI/Button";
import ProfilePicture from "../../UI/ProfilePicture";
import classes from "./FindFriends.module.css";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function FindFriends() {
  const authUser = useSelector((state) => state.users.authUser);
  const users = useSelector((state) => state.users.users);
  const usersToDisplay = users.filter((user) => user.id !== authUser.id);

  return (
    <section className={classes.container}>
      <h1>Here are some suggestions...</h1>
      <ul>
        {usersToDisplay.map((user) => (
          <li key={user.id} className={classes["user-container"]}>
            <Link
              to={`/home/profile/${user.id}`}
              className={classes["link-container"]}
            >
              <ProfilePicture dp={user.profilePicture} className={classes.dp} />
              <p>{user.userName}</p>
            </Link>
            <Button className={classes["btn-add-friend"]}>
              <FontAwesomeIcon
                className={classes["icon-add"]}
                icon={faUserPlus}
              />
              Add Friend
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FindFriends;
