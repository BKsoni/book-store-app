import React from "react";
import { useStyles } from "../../assets/Style";
import { useAuth } from "../../context/auth";

const HomePage = () => {
  const auth = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>Welcome to the Homepage</h2>
      {auth.user && (
        <div>
          <p>Email: {auth.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;