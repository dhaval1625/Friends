import { useSelector } from "react-redux";
import classes from "./FindFriends.module.css";
import FriendRequestDetail from "./FriendRequestDetail";
import FriendDetailWrapper from "./FriendDetailWrapper";

function Friends() {
  const users = useSelector((state) => state.users.users);
  const authUser = useSelector(state => state.users.authUser);
  const authUserToDisplay = users.find(user => user.id === authUser.id);

  const usersToDisplay = users.find((user) => user.id === authUserToDisplay.id);
  const friendRequests = usersToDisplay.friendRequests || null;

  const friends = authUserToDisplay.friends;
  
  return (
    <>
      <section className={classes.container}>
        <h2>Your Friends</h2>
        <ul>
          {friends?.length > 0 ?
            friends.map((friend) => (
              <FriendDetailWrapper key={friend} userId={friend} isFriend={true} />
            )) : 
            <p>No friends found. Time to add some friends 😊</p>}
        </ul>
      </section>

      <section className={classes.container}>
        <h2>Friend Requests</h2>
        {friendRequests?.length > 0 ? (
          <ul>
            {friendRequests.map((request) => (
              <FriendRequestDetail
                key={request.userId}
                userName={request.userName}
                userDp={request.userDp}
                userId={request.userId}
              />
            ))}
          </ul>
        ) : 
        <p>No Friend Requests</p>}
      </section>
    </>
  );
}

export default Friends;
