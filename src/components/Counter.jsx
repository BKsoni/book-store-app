import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";

const Counter = () =>{
    const [count,setCount] = useState(0);
    const increment = () =>{
        setCount(count + 1);
    }
    const decrement = () =>{
        setCount(count - 1);
    }

    return(
        <Box className="container"> 
        <Button onClick={increment} variant="contained" color="primary">Increment</Button>
        <Button onClick={decrement} variant="contained" color="secondary">Decrement</Button>
        <h1>{count}</h1>
        </Box>
    )
}

export default Counter;