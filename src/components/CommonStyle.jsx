import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333", // Customize the background color
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    color: "#fff", // Customize the logo color
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navItems: {
    display: "flex",
    alignItems: "center",
  },
  navItem: {
    marginLeft: theme.spacing(3), // Adjust the spacing between nav items
    color: "#fff", // Customize the nav item color
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  mainContainer: {
    flexGrow: 1,
    height: '100%', // Set the height to 100vh for full viewport height
    width: '100%', 
    padding: theme.spacing(3),
    margin:"auto",
    marginTop: '64px', // Adjust the top margin to accommodate the Navbar
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Add a shadow effect
    display: 'flex',
    flexDirection: 'column',
    border:'2px solid red',
    alignItems: "center",
  },
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: 'auto', 
  },
}));
