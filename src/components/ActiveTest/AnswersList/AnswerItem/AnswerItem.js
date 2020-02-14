import React from "react";
import classes from './AnswerItem.module.css';

const AnswerItem = ({answer,onAnswerClick}) => {
    return (
        <li className={classes.answerItem}
            onClick={onAnswerClick}>
            { answer }
        </li>
    )
};

export default AnswerItem