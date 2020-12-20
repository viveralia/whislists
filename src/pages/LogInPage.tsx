import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import * as authService from "../services/auth";
import { Seo } from "../components";
import { useForm } from "../hooks";
import { handleServerError } from "../utils";

const INITIAL_FORM_VALUES = {
  email: "",
  password: "",
};

const LogInPage: FC<RouteComponentProps> = ({ history }) => {
  const { values, handleChange, handleSubmit, isSubmitting } = useForm(
    INITIAL_FORM_VALUES,
    async (credentials) => {
      try {
        await authService.logInUser(credentials);
        history.push("/wishlists");
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
      <Seo pageTitle="Log In" />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>Log In</h1>
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
        <Link className="block" to="/forgot">
          Forgot Password?
        </Link>
        <button className="block" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading..." : "Log In"}
        </button>
        <Link to="/signup">Don't have an account?</Link>
        <hr />
        <button type="button" onClick={handleLogInWithGoogle}>
          Log In with Google
        </button>
      </form>
    </>
  );
};

export default LogInPage;
