import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0 0 10px rgba(0, 0, 0, 0.2)`,
    background: `linear-gradient(to bottom right, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    alignSelf: "flex-end",
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.3)`,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  errorSpan: {
    color: theme.palette.error.main,
    fontSize: "0.875rem",
    marginTop: theme.spacing(1),
  },
}));
