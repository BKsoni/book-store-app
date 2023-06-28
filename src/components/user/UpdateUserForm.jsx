import React from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { updateUserSchema } from "../../schemas";
import { useStyles } from "../../assets/Style";
import { Button, TextField } from "@material-ui/core";

const UserForm = ({ user }) => {
  const classes = useStyles();

  const initialValues = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId,
    role: user.role,
    password: user.password,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: updateUserSchema,
    onSubmit: async (values) => {
      const data = {
        id: user.id,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        roleId: user.roleId,
        role: user.role,
        password: values.password,
      };
      try {
        const response = await axios.put(`/api/user`, data);
        console.log(response);
        if (response.status === 200) {
          toast.success("User updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update user");
      }
    },
  });

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
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

export default UserForm;
