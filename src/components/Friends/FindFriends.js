import { useSelector } from "react-redux";
import userImage from "../../images/user.png";
import FriendDetail from "./FriendDetail";

import classes from "./FindFriends.module.css";

function FindFriends() {
  const users = useSelector((state) => state.users.users);
  const authUser = useSelector((state) => state.users.authUser);
  const authUserToDisplay = users.find((user) => user.id === authUser.id);
  const friends = authUserToDisplay.friends;
  const friendRequests = authUserToDisplay.friendRequests;
  const usersToDisplay = users.filter(
    (user) =>
      user.id !== authUserToDisplay.id &&
      !friends?.find((friend) => friend === user.id) &&
      !friendRequests?.find((request) => request.userId === user.id)
  );

  return (
    <section className={classes.container}>
      <h2>Here are some suggestions...</h2>
      <ul>
        {usersToDisplay.map((user) => (
          <FriendDetail
            key={user.id}
            id={user.id}
            dp={user.profilePicture || userImage}
            friendRequests={user.friendRequests || null}
            userName={user.userName}
            authUser={authUserToDisplay}
          />
        ))}
      </ul>
    </section>
  );
}

export default FindFriends;
