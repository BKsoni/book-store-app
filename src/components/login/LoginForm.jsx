import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import axios from "../../api/axios";
import { useStyles } from "../../assets/Style";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { nav } from "../../assets/RoutePaths";
import loadingGif from "../../assets/loading.gif";
import { useAuth } from "../../context/auth";

const END_POINT = "/api/user/login";

const initialValues = {
  email: "",
  password: "",
};

const saveData = async (values, action, navigate, setIsLoading, auth) => {
  const data = {
    email: values.email,
    password: values.password,
  };
  try {
    const response = await axios.post(END_POINT, data);
    if (response.data.code === 200) {
      auth.login(response.data.result);
      setIsLoading(true);
      toast.success("Login Success!");
      navigate(nav.Home); // Redirect to the home page after successful login
    }
    action.resetForm();
  } catch (err) {
    if (!err?.response) {
      toast.error("No Server Response");
    } else if (err.response?.status === 400) {
      toast.error("Missing Username or Password");
    } else if (err.response?.status === 401) {
      toast.error("Unauthorized");
    } else {
      toast.error("Login Failed");
    }
  }
};

const LoginForm = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const classes = useStyles();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) =>
        saveData(values, action, navigate, setIsLoading, auth),
    });

  return (
    <form className={classes.form}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {errors.email && touched.email && (
        <Typography variant="body2" className={classes.errorSpan}>
          {errors.email}
        </Typography>
      )}
      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        className={classes.textField}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.password && touched.password && (
        <Typography variant="body2" className={classes.errorSpan}>
          {errors.password}
        </Typography>
      )}
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        className={classes.textField}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.submitButton}
        onClick={handleSubmit}
      >
        Login
      </Button>
      {isLoading && (
        <img
          src={loadingGif}
          alt="Loading"
          style={{ display: "block", margin: "auto", width: "50px", marginTop: "20px" }}
        />
      )}
    </form>
  );
};

export default LoginForm;
