import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { registrationSchema } from "../../schemas";
import axios from "../../api/axios";
import { useStyles } from "../../assets/Style";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { nav } from "../../assets/RoutePaths";
import loadingGif from "../../assets/loading.gif";

const END_POINT = "/api/user";

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

const saveData = async (values, action, navigate, setIsLoading) => {
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
      setIsLoading(true);
      navigate(nav.Login); // Redirect to the login page after successful register
    }
    action.setSubmitting(false);
    action.setStatus(response.data.message);
    action.resetForm();
  } catch (error) {
    toast.error("Registration Failed, " + error);
  }
};

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const classes = useStyles();
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: registrationSchema,
      onSubmit: (values, action) => saveData(values, action, navigate, setIsLoading),
    });

  return (
    <form className={classes.form}>
     <Typography variant="h4" gutterBottom>
        Registration
      </Typography>
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
      <FormControl fullWidth className={classes.textField}>
        <InputLabel id="select-role" className={classes.label}>
          &nbsp;&nbsp;&nbsp;Role
        </InputLabel>
        <Select
          labelId="select-role"
          name="role"
          value={values.role}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
        >
          <MenuItem value={2} className={classes.menuItem}>
            Seller
          </MenuItem>
          <MenuItem value={3} className={classes.menuItem}>
            Buyer
          </MenuItem>
        </Select>
      </FormControl>
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

      {/* Loading GIF */}
      {isLoading && (
        <img
          src={loadingGif}
          alt="Loading"
          style={{ display: "block", margin: "auto", width: "50px" }}
        />
      )}

    </form>
  );
};

export default RegistrationForm;
