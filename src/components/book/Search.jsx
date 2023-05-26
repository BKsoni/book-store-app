import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import axios from "../../api/axios";
import { useStyles } from "./Style";
import { ToastContainer, toast } from "react-toastify";

const END_POINT = "/api/user/login";

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
      toast.success("Result Found!");
    }
    action.setSubmitting(false);
    action.setStatus(response.data.message);
    action.resetForm();
  } catch (error) {
    toast.error("No Results Found, " + error);
  }
};

const LoginForm = () => {
  const classes = useStyles();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: saveData,
    });

  return (
    <>
      <ToastContainer />
      <form className={classes.form}>
        {errors.search && touched.search ? (
          <span className={classes.errorSpan}>{errors.search}</span>
        ) : null}
        <TextField
          label="Search"
          name="search"
          type="text"
          variant="outlined"
          className={classes.textField}
          value={values.search}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          onClick={handleSubmit}
        >
          Search
        </Button>
      </form>
    </>
  );
};

export default Search;
