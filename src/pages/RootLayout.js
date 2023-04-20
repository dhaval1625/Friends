import { Outlet } from "react-router-dom";
import NavLogin from "../components/NavLogin";
import { useSelector } from "react-redux";
import NavHome from "../components/NavHome";

function RootLayoutPage() {
  const loggedIn = useSelector((state) => state.login.loggedIn);

  return (
    <>
      {loggedIn ? <NavHome /> : <NavLogin />}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayoutPage;
