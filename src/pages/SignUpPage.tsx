import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import * as authService from "../services/auth";
import { Seo } from "../components";
import { useForm } from "../hooks";
import { handleServerError } from "../utils";

const INITIAL_FORM_VALUES = {
  name: "",
  email: "",
  password: "",
};

const SignUpPage: FC<RouteComponentProps> = ({ history }) => {
  const { values, handleChange, handleSubmit, isSubmitting } = useForm(
    INITIAL_FORM_VALUES,
    async (newUser) => {
      try {
        await authService.registerUser(newUser);
        history.push("/");
      } catch (error) {
        handleServerError(error);
      }
    }
  );

  async function handleLogInWithGoogle() {
    try {
      await authService.logInWithGoogle();
      history.push("/wishlists");
    } catch (error) {
      handleServerError(error);
    }
  }

  return (
    <>
      <Seo pageTitle="Sign Up" />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input
          required
          type="text"
          name="name"
          minLength={3}
          maxLength={35}
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          className="block"
        />
        <input
          required
          type="text"
          name="email"
          minLength={5}
          maxLength={50}
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
          className="block"
        />
        <input
          required
          type="password"
          name="password"
          minLength={6}
          maxLength={30}
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          className="block"
        />
        <button className="block" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
        <Link to="/login">Already have an account?</Link>
        <hr />
        <button type="button" onClick={handleLogInWithGoogle}>
          Log In with Google
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
