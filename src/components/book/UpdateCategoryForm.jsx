import React, { useState} from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { categoryFormSchema } from "../../schemas";
import { useStyles } from "../../assets/Style";
import { Button, TextField } from "@material-ui/core";

const UpdateCategoryForm = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const initialValues = {
    name: category.name
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: categoryFormSchema,
    onSubmit: async (values) => {
      const data = {
        "id": category.id,
        "name": values.name,
    }
      setLoading(true);
      try {
        const response = await axios.put(
          `/api/category`,
          data
          
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("Category updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update Category");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={classes.formContainer}>
      <form onSubmit={formik.handleSubmit}>
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

export default UpdateCategoryForm;