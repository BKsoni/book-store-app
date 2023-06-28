import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { userFormSchema } from "../../schemas";
import { useStyles } from "../../assets/Style";
import { Button, Input, TextField, Typography } from "@material-ui/core";
const onSelectFile = (e, setFieldValue, setFieldError) => {
  const files = e.target.files;
  if (files?.length) {
    const fileSelected = e.target.files[0];
    const fileNameArray = fileSelected.name.split(".");
    const extension = fileNameArray.pop();
    if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
      if (fileSelected.size > 50000) {
        toast.error("File size must be less then 50KB");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(fileSelected);
      reader.onload = function () {
        setFieldValue("base64image", reader.result);
      };
      reader.onerror = function (error) {
        throw error;
      };
    } else {
      toast.error("only jpg,jpeg and png files are allowed");
    }
  } else {
    setFieldValue("base64image", "");
  }
};

const AddUserForm = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const initialValues = {
    name: "",
    description: "",
    price: "",
    categoryId: "",
    img: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userFormSchema,

    onSubmit: async (values) => {
      const data = {
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.categoryId,
        base64image: "data:image/jpeg;base64,/9juh/",
      };
      console.log(data)
      setLoading(true);
      try {
        const response = await axios.post(`/api/user`, data);
        console.log(response);
        if (response.status === 200) {
          toast.success("User added successfully");
        }
      } catch (error) {
        toast.error("Failed to add user");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={classes.formContainer}>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.formField}>
          <Input
            id="img"
            name="img"
            type="file"
            inputProps={{ className: "small" }}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              onSelectFile(e, formik.setFieldValue, formik.setFieldError);
            }}
          />
        </div>
        <div className={classes.formField}>
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>

        <div className={classes.formField}>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>

        <div className={classes.formField}>
          <TextField
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
          />
        </div>

        <div className={classes.formField}>
          <TextField
            id="categoryId"
            name="categoryId"
            label="categoryId"
            type="number"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.categoryId && formik.errors.categoryId}
            helperText={formik.touched.categoryId && formik.errors.categoryId}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          color="primary"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default AddUserForm;
