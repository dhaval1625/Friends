import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import connectingImage from "../images/connecting.svg";
import classes from "./Login.module.css";
import { redirect } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../store/firebase";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/login-slice";
import { userActions } from "../store/user-slice";
import { useEffect } from "react";

function Login() {
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      if (data.status === "success") {
        dispatch(loginActions.loginHandler());
        dispatch(userActions.setAuthUser(data.userData.email));
        navigate("/home");
      }
    }
  }, [data, dispatch, navigate]);

  return (
    <section className={classes.container}>
      <div>
        <img
          className={classes.display}
          src={connectingImage}
          alt="connecting people"
        />
      </div>
      <div className={classes["form-container"]}>
        <Form method="POST">
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            required
          />
          <Button className={classes["btn-login"]} type="submit">
            Log in
          </Button>
        </Form>

        {data && data.status === "error" && (
          <div className={classes.info}>
            <p
              className={
                data.status === "error" ? classes.error : classes.success
              }
            >
              {data.message}
            </p>
          </div>
        )}

        <hr />
        <p>Don't have an account? Click below to register...</p>
        <Link className={classes["link-register"]} to="register">
          <Button className={classes["btn-register"]} type="button">
            Register
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Login;

export async function loginAction({ request }) {
  const data = await request.formData();

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    const user = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    // console.log(user);

    return {
      message: "Login successfull",
      status: "success",
      userData,
    };
  } catch (error) {
    return {
      message: "Wrong email or password!",
      status: "error",
    };
  }
}
