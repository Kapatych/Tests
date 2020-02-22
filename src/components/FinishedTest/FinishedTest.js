import React from "react";
import classes from './FinishedTest.module.css';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedTest = ({test, result, onRetry, quantityQuestions}) => {

    const renderQuestionsList = () => {
        return (
            test.map((item, index) => {
                const isFailure = result.hasOwnProperty(item.id);
                let cls = 'fa' + (isFailure ? ' fa-times' : ' fa-check');

                return (
                    <div key={index} className={classes.question}>
                        <i className={cls}/>
                        <div>
                            <div> {`${index + 1}. ${item.question}`}</div>
                            <div className={classes.success}>{item.answers[item.rightAnswerId - 1].text}</div>
                            {
                                isFailure
                                    ? <div>{`Your answer: ${item.answers[result[item.id] - 1].text}`}</div>
                                    : null
                            }
                        </div>
                    </div>
                )
            })
        )
    };

    return (
        <div className={classes.finishedTest}>
            <span>Test results</span>
            <p>Correct answers: {quantityQuestions - Object.keys(result).length} / {quantityQuestions}</p>

            <Button type="primary" onClick={onRetry}>Retry</Button>
            <Link to='/'>
                <Button type="success">Return</Button>
            </Link>
            <hr/>
            <div>
                {renderQuestionsList()}
            </div>
        </div>
    )
}

export default FinishedTest;