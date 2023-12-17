import { useDispatch, useSelector } from "react-redux";
import FriendDetail from "./FriendDetail";
import userImage from '../../images/user.png';
import { userActions } from "../../store/user-slice";

function FriendDetailWrapper(props) {

    const userState = useSelector(state => state.users.users);
    const authUser = useSelector(state => state.users.authUser);
    const userToDisplay = userState.find(user => user.id === props.userId);

    const dispatch = useDispatch();

    function removeFriendHandler() {
      dispatch(userActions.removeFriend({
        friendId: props.userId,
        userId: authUser.id
      }))
    }

  return (
    <FriendDetail id={userToDisplay.id} dp={userToDisplay.profilePicture || userImage} onRemoveFriend={removeFriendHandler} userName={userToDisplay.userName} isFriend={true} />
  )
}

export default FriendDetailWrapper;