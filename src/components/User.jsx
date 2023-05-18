import React from "react";

const User = ({name, fun}) => {

    return(
        <div className="content">
            <h2>User Name = {name}</h2>
            <button onClick={fun}>addUser</button>
        </div>
    )
}

export default User;