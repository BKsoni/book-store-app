import React, { useState } from "react";
import { useStyles } from "../../assets/Style";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { searchSchema } from "../../schemas";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import Result from "./Result";

const END_POINT = "/api/book/search";

const initialValues = {
  search: "",
};

const Search = () => {
  const classes = useStyles();
  const [results, setResults] = useState([]);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: initialValues,
      validationSchema: searchSchema,
      onSubmit: async (formValues, { setSubmitting, setStatus, resetForm }) => {
        try {
          const response = await axios.get(`${END_POINT}?keyword=${formValues.search}`);

          if (response.data.code === 200) {
            console.log(response.data.result);
            setResults(response.data.result);
            if (response.data.result.length > 0) {
              toast.success("Results Found!");
            } else {
              toast.error("Results Not Found! ");
            }
          }
          setStatus(response.data.message);
          resetForm();
        } catch (error) {
          toast.error(error);
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Search for a Book</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Book Name"
          name="search"
          type="text"
          variant="outlined"
          className={classes.textField}
          value={values.search}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.search && touched.search}
          helperText={errors.search && touched.search && errors.search}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          Search
        </Button>
      </form>
      {results.length > 0 && (
        <>
          <h3>Results:</h3>
          <div className={classes.cardContainer}>
            {results.map((result) => (
              <Result name={result.name} img={result.base64image} desc={result.description} price={result.price}/>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
