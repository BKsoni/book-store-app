  import React, { useState} from "react";
  import axios from "../../api/axios";
  import { toast } from "react-toastify";
  import { useFormik } from "formik";
  import { bookFormSchema } from "../../schemas";
  import { useStyles } from "../../assets/Style";
  import { Button, TextField } from "@material-ui/core";

  const BookForm = ({ book }) => {
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const initialValues = {
      name: book.name,
      description: book.description,
      price: book.price,
      categoryId: book.categoryId,
      img: book.base64image
    };

    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: bookFormSchema,
      onSubmit: async (values) => {
        const data = {
          "id": book.id,
          "name": values.name,
          "description": values.description,
          "price": values.price,
          "categoryId": values.categoryId,
          "base64image": values.img
      }
        setLoading(true);
        try {
          const response = await axios.put(
            `/api/book`,
            data
            
          );
          console.log(response);
          if (response.status === 200) {
            toast.success("Book updated successfully");
          }
        } catch (error) {
          toast.error("Failed to update book");
        } finally {
          setLoading(false);
        }
      },
    });

    return (
      <div className={classes.formContainer}>
        <form onSubmit={formik.handleSubmit}>
        <div className={classes.formField}>
            <img src={formik.values.img} height="100" width="100" alt="404"/>
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

  export default BookForm;