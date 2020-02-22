import React from "react";
import classes from './Error.module.css'
import error_img from './robot-msg-error.png';

const Error = () => {
    return (
        <div className={classes.error}>
            <img src={error_img} alt="error"/>
            <span>Something has gone terribly wrong.</span>
            <span>But we are already fixing it!</span>
        </div>
    )
};

export default Error;