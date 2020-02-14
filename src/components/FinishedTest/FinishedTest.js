import React from "react";
import classes from './FinishedTest.module.css';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedTest = ({result, onRetry, quantityQuestions}) => {

    return (
        <div className={classes.finishedTest}>
            <p>You are finished</p>
            <p>Right {result} / {quantityQuestions}</p>
            <Button type="primary" onClick={onRetry}>Retry</Button>
            <Link to='/'>
                <Button type="success">Return</Button>
            </Link>
        </div>
    )
}

export default FinishedTest;