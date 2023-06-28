import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useStyles } from "../../assets/Style";
import { useAuth } from "../../context/auth";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { updateUserSchema } from "../../schemas";
import { toast } from "react-toastify";
import { nav } from "../../assets/RoutePaths";
import axios from "../../api/axios";

const END_POINT = "/api/user";

const handleUpdateProfile = async (values, action, navigate, setIsLoading, auth) => {
  const data = {
    id: auth.user.id,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    roleId: auth.user.roleId, 
    role: auth.user.role,
    password: values.password,
  };
  console.log(data);
  try {
    const response = await axios.put(END_POINT, data);
    //console.log(response.data);
    if (response.data.code === 200) {
      toast.success("Data Updated Successfully!");
      // setIsLoading(true);
      if (auth.user.password!==values.password) {
        navigate(nav.Login); // Redirect to the login page after successful register
      }
      
    }
    action.setSubmitting(false);
    action.setStatus(response.data.message);
    action.resetForm();
  } catch (error) {
    toast.error("Failed to update Data, " + error);
  }
};

const ProfilePage = () => {
  const classes = useStyles();
  const auth = useAuth();

  const initialValues = {
    id: auth.user.id,
    email: auth.user.email,
    firstName: auth.user.firstName,
    lastName: auth.user.lastName,
    roleId: auth.user.roleId,
    role: auth.user.role,
    password: auth.user.password,
  };

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: updateUserSchema,
      onSubmit: (values, action) =>
        handleUpdateProfile(values, action, navigate, auth),
    });

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        Profile Page
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          className={classes.textField}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />
        <TextField
          name="firstName"
          label="First Name"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          className={classes.textField}
          error={touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          className={classes.textField}
          error={touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          name="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          fullWidth
          type="password"
          className={classes.textField}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <Button
          type="submit" // Change the type to "submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
