import React from "react";
import classes from './ActiveTest.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveTest = ({questionNumber, question, answers, onAnswerClick, quantityQuestions}) => {

    return (
        <div className={classes.activeTest}>
            <p className={classes.activeQuestion}>
                <span> {questionNumber}. {question}</span>
                <span> {questionNumber} / {quantityQuestions}</span>
            </p>

            <AnswersList answers={answers} onAnswerClick={onAnswerClick}/>
        </div>
    )
};

export default ActiveTest;