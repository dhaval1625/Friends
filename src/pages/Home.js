import { useSelector } from "react-redux";
import Home from "../components/Home/Home";
import { Fragment } from "react";
import SideNav from "../components/Home/SideNav";
import { Outlet } from "react-router-dom";

function HomePage() {
  const isAuth = useSelector((state) => state.login.loggedIn);

  return (
    <>
      {isAuth ? (
        <Fragment>
          <SideNav />
          <Outlet />
        </Fragment>
      ) : (
        <h1>You are logged out!</h1>
      )}
    </>
  );
}

export default HomePage;
