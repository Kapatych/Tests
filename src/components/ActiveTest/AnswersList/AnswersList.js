import React from "react";
import classes from './AnswersList.module.css'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = ({answers, onAnswerClick}) => {

    return (
        <ul className={classes.answersList}>
            {
                answers.map( answer => <AnswerItem key={answer.id}
                                                   answer={answer.text}
                                                   onAnswerClick={() => onAnswerClick(answer.id)}/> )
            }
        </ul>
    )
};

export default AnswersList;