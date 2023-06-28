import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "500px", // Set the minimum height as desired
    maxHeight: "100%", // Allow the container to expand to maximum height
    overflow: "auto", // Add scrollbars if content exceeds the height
    display: "flex", // Use flexbox for centering
    flexDirection: "column", // Stack items vertically
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
    padding: theme.spacing(2),
    backgroundColor: "#ffffcc",
    color: "black",
    width: "80%",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid #ccc",
    margin: "0 auto", // Center the container horizontally
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    borderBottom: "2px solid red",
    
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
    minWidth: "300px",
    maxWidth:"100%",
  },
  textField: {
    marginBottom: theme.spacing(2),
    width:"100%"
  },
  submitButton: {
    alignSelf: "flex-center",
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
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      width: "300px", // Adjust the desired width of the cards here
      margin: "10px",
    },
  },
  card: {
    width: "calc(33.33% - 10px)", // Set the width of each card to 33.33% of the container minus spacing
    height: "100%",
    marginBottom: "20px",
    
  },
  media: {
    height: 200,
  },
  cardContent: {
    padding: "10px",
  },
  // Media queries for responsive card widths
  "@media (max-width: 768px)": {
    card: {
      width: "calc(50% - 10px)", // For smaller screens, display two cards per row
    },
  },
  "@media (max-width: 480px)": {
    card: {
      width: "100%", // For even smaller screens, display one card per row
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  paginationButton: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1),
    border: "1px solid #ccc",
    borderRadius: theme.shape.borderRadius,
    background: "transparent",
    cursor: "pointer",
    "&:hover": {
      background: "#f5f5f5",
    },
    "&:disabled": {
      cursor: "default",
      opacity: 0.6,
    },
  },
  filterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    margin: "0 0 10px 0",
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    marginTop: theme.spacing(2),
    maxWidth:"80%",
    
    boxShadow: `0 0 10px rgba(0, 0, 0, 0.2)`,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
  },
  tableHeadCell: {
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  tableBodyRow: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
      
    },
  },
  tableBodyCell: {
    maxWidth: "300px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    
  },
  actionButtons: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  editDialog: {
    minWidth: 400,
  },
  addDialog: {
    minWidth: 400,
  },
  confirmationDialog: {
    minWidth: 300,
    padding: theme.spacing(2),
  },
  confirmationButtons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));
