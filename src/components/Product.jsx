import { Button, Box, TextField, makeStyles, Typography} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles({
    typo: {
        fontSize: 30,
        backgroundColor: 'yellow',
        color: 'black', 
        fontWeight:"bold"
    }
});

export const Product = (props) => {
    const classes = useStyles();
    // var pname = props.name;
    // var price = props.price;
    const [pname, setPname] = useState("");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        alert("product name modified");
    },[pname])

    const handleClick = () => {
        alert("Product Name = "+pname+" ,Price = "+price);
    };
    return(
        <Box className="container"> 
        <Typography component="h1" className={classes.typo}>Product Management</Typography>
        <br/>
        <TextField id="pname" label="Product Name" variant="outlined" onChange={(e) => setPname(e.target.value)}/>
        <br/>
        <TextField id="price" label="Price" variant="outlined" onChange={(e) => setPrice(e.target.value)} />
        <br/>
        <Button onClick={handleClick} variant="contained" color="Primary">Add Product</Button>
        </Box>
    )
}

