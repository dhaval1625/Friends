import classes from "./FriendDetail.module.css";

import { Link } from "react-router-dom";
import ProfilePicture from "../../UI/ProfilePicture";
import Button from "../../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import userImage from "../../images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";

function FriendRequestDetail(props) {

  const dispatch = useDispatch();
  const authUser = useSelector(state => state.users.authUser);

  function addFriendHandler() {
    dispatch(userActions.undoFriendRequest({
      friendId: authUser.id,
        userId: props.userId
    }));
    dispatch(userActions.addFriend(props.userId))
  }

  function cancelFriendRequestHandler() {
    dispatch(userActions.undoFriendRequest({
      friendId: authUser.id,
        userId: props.userId
    }));
  }

  return (
    <li className={classes["user-container"]}>
      <Link
        to={`/home/profile/${props.userId}`}
        className={classes["link-container"]}
      >
        <ProfilePicture dp={props.userDp || userImage} className={classes.dp} />
        <p>{props.userName}</p>
      </Link>
      <div className={classes.actions}>
        <Button onClick={addFriendHandler} className={classes["btn-accept"]}>
          <FontAwesomeIcon className={classes["icon-add"]} icon={faCheck} />
          Accept
        </Button>
        <Button onClick={cancelFriendRequestHandler} className={classes["btn-deny"]}>
          <FontAwesomeIcon className={classes["icon-add"]} icon={faXmark} />
          Deny
        </Button>
      </div>
    </li>
  );
}

export default FriendRequestDetail;
