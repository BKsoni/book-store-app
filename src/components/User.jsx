import { Button, Box, TextField, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    typo: {
        fontSize: 30,
        backgroundColor: 'yellow',
        color: 'black', 
        fontWeight:"bold"
    }
});

const User = ({name, pass}) => {
    const classes = useStyles()
    const handleClick = () => {
        alert("Username = "+name+ " ,Password = "+pass);
    };
    return(
        <Box className="container"> 
        <Typography component="h1" className={classes.typo}>User Management</Typography>
        <br/>
        <TextField id="username" label="Username" variant="outlined" value={name}/>
        <br/>
        <TextField id="password" type="password" label="Password" variant="outlined" value={pass} />
        <br/>
        <Button onClick={handleClick} variant="contained" color="Primary">Add User</Button>
        </Box>
    )
}

export default User;