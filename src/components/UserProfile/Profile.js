import classes from "./Profile.module.css";
import ProfilePicture from "../../UI/ProfilePicture";
import Button from "../../UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Profile(props) {
  const users = useSelector((state) => state.users.users);
  const authUser = useSelector((state) => state.users.authUser);
  const userToDisplay = users.find((user) => user.id === props.id);
  const isAuth = props.id === authUser.id;

  return (
    <section className={classes.container}>
      <div className={classes["dp-container"]}>
        <ProfilePicture
          dp={userToDisplay.profilePicture}
          className={classes.dp}
        />
      </div>
      <div className={classes["heading-container"]}>
        <h1>{userToDisplay.userName}</h1>
        {isAuth ? (
          <Button className={classes["btn-add-friend"]}>
            <FontAwesomeIcon icon={faUserPen} /> Edit Profile
          </Button>
        ) : (
          <Button className={classes["btn-add-friend"]}>
            <FontAwesomeIcon icon={faUserPlus} /> Add Friend
          </Button>
        )}
      </div>
      <div className={classes["info-container"]}>
        <div className={classes.info}>
          <h4>Name</h4>
          <p>{userToDisplay.firstName}</p>
        </div>
        <div className={classes.info}>
          <h4>Email</h4>
          <p>{userToDisplay.email}</p>
        </div>
        <div className={classes.info}>
          <h4>Contact No</h4>
          <p>
            {userToDisplay.phoneNumber ||
              "Not provided - Edit profile to add phone number"}
          </p>
        </div>
        <div className={classes.info}>
          <h4>Address</h4>
          <p>
            {userToDisplay.address ||
              "Not provided - Edit profile to add address"}
          </p>
        </div>
        <div className={classes.info}>
          <h4>Gender</h4>
          <p>{userToDisplay.gender}</p>
        </div>
        <div className={classes.info}>
          <h4>Birth Date</h4>
          <p>{userToDisplay.birthDate}</p>
        </div>
        <div className={classes.info}>
          <h4>Interests</h4>
          <p>
            {userToDisplay.interests ||
              "Not provided - Edit profile to add interests"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Profile;
