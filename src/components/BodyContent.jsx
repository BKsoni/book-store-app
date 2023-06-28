import React from 'react';
import { useStyles } from "./CommonStyle";
import MainNavigation from './MainNavigation';

const BodyContent = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.mainContainer}>
        <MainNavigation/>
      </div>
    );
  };

export default BodyContent;