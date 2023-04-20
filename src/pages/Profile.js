import { useParams } from "react-router-dom";
import Profile from "../components/UserProfile/Profile";

function ProfilePage() {
  const params = useParams();

  return <Profile id={params.userID} />;
}

export default ProfilePage;
