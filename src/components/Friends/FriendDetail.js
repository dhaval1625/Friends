import { faCheck, faUserPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../UI/Button";
import ProfilePicture from "../../UI/ProfilePicture";
import classes from "./FriendDetail.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";

function FriendDetail(props) {
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const sentAllready = props.friendRequests?.find(
      (request) => request.userId === props.authUser.id
    );

    if (sentAllready) setRequestSent(true);
  }, [props]);

  const dispatch = useDispatch();

  function sendFriendRequestHandler() {
    console.log("button clicked", requestSent);
    if (!requestSent) {
      dispatch(
        userActions.sendFriendRequest({
          friendId: props.id,
          userId: props.authUser.id,
          userName: props.authUser.userName,
          userDp: props.authUser.profilePicture,
        })
      );

      setRequestSent(true);
      console.log("button clicked", requestSent);
    } else {
      dispatch(
        userActions.undoFriendRequest({
          friendId: props.id,
          userId: props.authUser.id,
        })
      );

      setRequestSent(false);
      console.log("button clicked", requestSent);
    }
  }

  return (
    <li className={classes["user-container"]}>
      <Link
        to={`/home/profile/${props.id}`}
        className={classes["link-container"]}
      >
        <ProfilePicture dp={props.dp} className={classes.dp} />
        <p>{props.userName}</p>
      </Link>
      {props.isFriend ? (
        <Button
          onClick={props.onRemoveFriend}
          className={classes["btn-remove-friend"]}
        >
          <FontAwesomeIcon
            className={classes["icon-add"]}
            icon={faX}
          />
          Remove Friend
        </Button>
      ) : (
        <Button
          onClick={sendFriendRequestHandler}
          className={
            requestSent ? classes["btn-friend"] : classes["btn-add-friend"]
          }
        >
          <FontAwesomeIcon
            className={classes["icon-add"]}
            icon={requestSent ? faCheck : faUserPlus}
          />
          {requestSent ? "Request Sent" : "Add Friend"}
        </Button>
      )}
    </li>
  );
}

export default FriendDetail;
