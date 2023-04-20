import { Link } from "react-router-dom";
import logo from "../images/logo-full.png";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";

function Navbar(props) {
  const isAuth = useSelector((state) => state.login.loggedIn);

  return (
    <nav className={classes.navbar}>
      <Link to={isAuth ? "/home" : "/"}>
        <img className={classes["logo-image"]} src={logo} alt="friends logo" />
      </Link>
      {props.children}
    </nav>
  );
}

export default Navbar;
