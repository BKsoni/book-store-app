import React from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useFormik } from "formik";
import { registrationSchema } from "../../schemas";
import axios from "../../api/axios";
import { useStyles } from "./Style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const END_POINT = "/api/user";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

const saveData = async (values, action) => {
  //alert("Registration success! Welcome "+values.fname);
  //console.log(values);

  const data = {
    firstName: values.fname,
    lastName: values.lname,
    email: values.email,
    roleId: values.role,
    password: values.password,
  };
  console.log(data);
  try {
    const response = await axios.post(END_POINT, data);
    //console.log(response.data);
    if (response.data.code === 200) {
      toast.success("Registration Success!");
    }
    action.setSubmitting(false);
    action.setStatus(response.data.message);
    action.resetForm();
  } catch (error) {
    toast.error("Registration Failed, " + error);
  }
};

const RegistrationForm = () => {
  const classes = useStyles();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registrationSchema,
      onSubmit: saveData,
    });

  return (
    <>
      <ToastContainer />
      <form className={classes.form}>
        {errors.fname && touched.fname ? (
          <span className={classes.errorSpan}>{errors.fname}</span>
        ) : null}
        <TextField
          label="First name"
          name="fname"
          variant="outlined"
          className={classes.textField}
          value={values.fname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.lname && touched.lname ? (
          <span className={classes.errorSpan}>{errors.lname}</span>
        ) : null}
        <TextField
          label="Last name"
          name="lname"
          variant="outlined"
          className={classes.textField}
          value={values.lname}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
        {errors.role && touched.role ? (
          <span className={classes.errorSpan}>{errors.role}</span>
        ) : null}
        <InputLabel id="select-role">Role</InputLabel>
        <Select
          label="Role"
          labelId="select-role"
          name="role"
          value={values.roleId}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <MenuItem value={1}>Seller</MenuItem>
          <MenuItem value={2}>Buyer</MenuItem>
        </Select>
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
        {errors.confirmPassword && touched.confirmPassword ? (
          <span className={classes.errorSpan}>{errors.confirmPassword}</span>
        ) : null}
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          className={classes.textField}
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </form>
      </>
  );
};

export default RegistrationForm;
