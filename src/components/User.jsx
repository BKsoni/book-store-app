import { Button, Box, TextField } from "@material-ui/core";
import React from "react";

const User = ({name, pass}) => {
    const handleClick = () => {
        alert("Username = "+name+ " ,Password = "+pass);
    };
    return(
        <Box className="container"> 
        <TextField id="username" label="Username" variant="outlined" value={name}/>
        <br/>
        <TextField id="password" type="password" label="Password" variant="outlined" value={pass} />
        <br/>
        <Button onClick={handleClick} variant="contained" color="Primary">Add User</Button>
        </Box>
    )
}

export default User;