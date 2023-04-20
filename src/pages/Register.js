import Register from "../components/Register";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../store/firebase";

function RegisterPage() {
  return <Register />;
}

export default RegisterPage;

export async function registerAction({ request, params }) {
  const data = await request.formData();

  const birthDate = new Date(data.get("birth-date"))
    .toUTCString()
    .split(" ")
    .slice(1, 4)
    .join(" ");

  const userData = {
    firstName: data.get("first-name"),
    lastName: data.get("last-name"),
    email: data.get("email"),
    phoneNumber: data.get("phone-number") || null,
    birthDate: birthDate,
    gender: data.get("gender"),
  };

  const password = data.get("password");

  try {
    const newUser = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      password
    );

    return {
      message:
        "Created new account successfully. Go to login page to sign into your account!",
      status: "success",
      userData,
    };
  } catch (err) {
    // todo: error handling
    return {
      message: "Email already in use. try different email instead.",
      status: "error",
    };
  }
}
