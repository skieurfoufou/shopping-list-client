import { useState } from "react";
import classes from "./RegisterPage.module.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { isValidEmail, isValidRepeatPassword } from "../../utils/validation";
import { createUser } from "../../apis/user.api";
import { ErrorMessage } from "@hookform/error-message";

type FormFields = {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormFields, any>();

  const handleEmailValidation = (email: string) => isValidEmail(email);

  const handleRepeatPasswordValidation = (repeatPassword: string) => {
    const formValues = getValues();
    return isValidRepeatPassword(repeatPassword, formValues.password);
  };

  const onFormSubmit = async (formData: FormFields) => {
    setIsLoading(true);
    console.log(formData);
    await createUser({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });
    setIsLoading(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  // if (!isLoggedIn) {
  //   return <Navigate to="/register" replace />;
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className={classes.container}>
          <label className={classes.label}>Full Name</label>
          <input
            className={classes.input}
            {...register("fullName", {
              required: "full Name required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="fullName"
            render={({ message }) => <p className={classes.error}>{message}</p>}
          />
          <label className={classes.label}>Email</label>
          <input
            className={classes.input}
            {...register("email", {
              required: "email required",
              validate: handleEmailValidation,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            message="email is not valid"
            render={({ message }) => <p className={classes.error}>{message}</p>}
          />
          <label className={classes.label}>Password</label>
          <input
            className={classes.input}
            {...register("password", {
              required: { value: true, message: "password required" },
              minLength: { value: 4, message: "min 4 characters" },
            })}
            placeholder="min 4 characters"
          />
          <ErrorMessage
            errors={errors}
            name="password"
            message="password is not valid"
            render={({ message }) => <p className={classes.error}>{message}</p>}
          />
          <label className={classes.label}>Repeat Password</label>
          <input
            className={classes.input}
            {...register("repeatPassword", {
              required: { value: true, message: "repeat password required" },
              validate: handleRepeatPasswordValidation,
              minLength: { value: 4, message: "min 4 characters" },
            })}
            placeholder="min 4 characters"
          />
          <ErrorMessage
            errors={errors}
            name="repeatPassword"
            message="repeat is not valid"
            render={({ message }) => <p className={classes.error}>{message}</p>}
          />
          <input
            type="submit"
            className={classes.buttonSubmit}
            value="Register"
          />
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
