import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayoutPage from "./pages/RootLayout";
import LoginPage from "./pages/Login";
import RegisterPage, { registerAction } from "./pages/Register";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./store/firebase";
import HomePage from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "./store/user-slice";
import { loginAction } from "./components/Login";
import ErrorPage from "./pages/Error";
import ProfilePage from "./pages/Profile";
import Home from "./components/Home/Home";
import FriendsPage from "./pages/Friends";
import FindFriendsPage from "./pages/FindFriends";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "home",
        element: <HomePage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile/:userID",
            element: <ProfilePage />,
          },
          {
            path: "friends",
            element: <FriendsPage />,
          },
          {
            path: "find-friends",
            element: <FindFriendsPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    const logoutHandler = async function () {
      await signOut(auth);
    };

    logoutHandler();
  }, []);

  // todo: remove later
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged In");
    } else {
      console.log("Logged out");
    }
  });

  return <RouterProvider router={router} />;
}

export default App;
