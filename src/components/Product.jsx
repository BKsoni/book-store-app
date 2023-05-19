import { Button, Box, TextField } from "@material-ui/core";
import React from "react";

export const Product = (props) => {
    var pname = props.name;
    var price = props.price;
    const handleClick = () => {
        alert("Product Name = "+pname+" ,Price = "+price);
    };
    return(
        <Box className="container"> 
        <TextField id="pname" label="Product Name" variant="outlined" value={pname}/>
        <br/>
        <TextField id="price" label="Price" variant="outlined" value={price} />
        <br/>
        <Button onClick={handleClick} variant="contained" color="Primary">Add Product</Button>
        </Box>
    )
}

