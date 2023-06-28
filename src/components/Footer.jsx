import React from 'react';
import { useStyles } from "./CommonStyle";

const Footer = () => {
    const classes = useStyles();
  
    return (
      <footer className={classes.footer}>
        Copyrighted by BhavyaSoni
      </footer>
    );
  };

export default Footer;