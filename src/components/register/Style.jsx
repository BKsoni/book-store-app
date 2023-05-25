import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
    margin: "0 auto",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    alignSelf: "flex-end",
    marginTop: theme.spacing(2),
  },
  errorSpan: {
    color: theme.palette.error.main,
    fontSize: "0.875rem",
    marginTop: theme.spacing(0.5),
  },
}));
