import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import axios from "../../api/axios";
import { useStyles } from "./Style";
import { ToastContainer, toast } from "react-toastify";

const END_POINT = "/api/user/login";

const initialValues = {
  email: "",
  password: "",
};

const saveData = async (values, action) => {
  //console.log(values);
  const data = {
    email: values.email,
    password: values.password,
  };
  console.log(data);
  try {
    const response = await axios.post(END_POINT, data);
    console.log(response.data);
    if (response.data.code === 200) {
      toast.success("Login Success!");
    }
    action.setSubmitting(false);
    action.setStatus(response.data.message);
    action.resetForm();
  } catch (error) {
    toast.error("Login Failed, " + error);
  }
};

const LoginForm = () => {
  const classes = useStyles();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: saveData,
    });

  return (
    <Box className="container">
      <ToastContainer />
      <form className={classes.form}>
        {errors.email && touched.email ? (
          <span className={classes.errorSpan}>{errors.email}</span>
        ) : null}
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
        {errors.password && touched.password ? (
          <span className={classes.errorSpan}>{errors.password}</span>
        ) : null}
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
      </form>
    </Box>
  );
};

export default LoginForm;
