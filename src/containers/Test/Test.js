import React, {Component} from 'react';
import classes from './Test.module.css';
import ActiveTest from "../../components/ActiveTest/ActiveTest";
import FinishedTest from "../../components/FinishedTest/FinishedTest";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchTestItem, resetTest, testAnswerClick} from "../../store/actions/testItem";

class Test extends Component {

    componentDidMount() {
        this.props.fetchTestItem(this.props.match.params.id)
    };

    componentWillUnmount() {
        this.props.testReset()
    }

    render() {

        const {test, result, activeQuestion, isLoading, isFinished, testAnswerClick, testReset} = this.props;

        return (
            <div className={classes.test}>
                <div className={classes.testWrapper}>
                    <h1>Test</h1>
                    {
                        isLoading || !test
                            ? <Loader/>
                            : isFinished
                            ? <FinishedTest onRetry={testReset}
                                            result={result}
                                            quantityQuestions={test.length}/>

                            : <ActiveTest answers={test[activeQuestion].answers}
                                          question={test[activeQuestion].question}
                                          questionNumber={activeQuestion + 1}
                                          onAnswerClick={testAnswerClick}
                                          quantityQuestions={test.length}/>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        result: state.testItem.result,
        isFinished: state.testItem.isFinished,
        activeQuestion: state.testItem.activeQuestion,
        test: state.testItem.test,
        isLoading: state.testItem.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTestItem: testId => dispatch(fetchTestItem(testId)),
        testAnswerClick: answerId => dispatch(testAnswerClick(answerId)),
        testReset: () => dispatch(resetTest())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Test)