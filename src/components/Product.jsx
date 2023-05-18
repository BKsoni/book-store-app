import React from "react";

export const Product = (props) => {
    const pname = props.name;
    const fun = props.fun;
    return(
        <div className="content">
        <h2>Product Name = {pname}</h2>
        <button onClick={fun}>addProduct</button>
        </div>
    )
}

