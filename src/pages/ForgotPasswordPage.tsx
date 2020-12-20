import { FC, useState } from "react";

import * as authService from "../services/auth";
import { Seo } from "../components";
import { useForm } from "../hooks";
import { handleServerError } from "../utils";

const INITIAL_FORM_VALUES = {
  email: "",
};

const ForgotPasswordPage: FC = () => {
  const [success, setSuccess] = useState(false);

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
  } = useForm(INITIAL_FORM_VALUES, async ({ email }) => {
    try {
      await authService.resetPassword(email);
      resetForm();
      setSuccess(true);
    } catch (error) {
      handleServerError(error);
    }
  });

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Seo pageTitle="Reset your password" />
      <h1>Reset your password</h1>
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
      <button className="block" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending email..." : "Send reset email"}
      </button>
      {success && <p>Check your email to reset your password</p>}
    </form>
  );
};

export default ForgotPasswordPage;
