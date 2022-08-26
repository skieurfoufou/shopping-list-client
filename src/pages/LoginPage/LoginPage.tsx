import { useState } from "react";
import classes from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { isValidEmail } from "../../utils/validation";
import NavItem from "../../app/Header/NavItem/NavItem";
import { ErrorMessage } from "@hookform/error-message";

type FormFields = {
  email: string;
  password: string;
};

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields, any>();

  const handleEmailValidation = (email: string) => isValidEmail(email);

  const onFormSubmit = async (formData: FormFields) => {
    setIsLoading(true);
    await login(formData.email, formData.password);
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
          <input type="submit" className={classes.buttonSubmit} value="Login" />
          <div className={classes.link}>
            <NavItem
              route={{
                link: "/register",
                title: "don't have an account, register",
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
