import React, {Component} from 'react';
import classes from './Test.module.css';
import {connect} from "react-redux";
import {fetchTestItem, resetTest, testAnswerClick} from "../../store/actions/testItem";

import ActiveTest from "../../components/ActiveTest/ActiveTest";
import FinishedTest from "../../components/FinishedTest/FinishedTest";
import Loader from "../../components/UI/Loader/Loader";
import Error from "../../components/Error/Error";

class Test extends Component {

    componentDidMount() {
        this.props.fetchTestItem(this.props.match.params.id)
    };

    componentWillUnmount() {
        this.props.testReset()
    }

    renderTest = () => {
        const {isLoading, isError, isFinished, test, result, activeQuestion, testAnswerClick, testReset} = this.props;

        if (isError) return <Error/>;
        if (isLoading || !test) return <Loader/>;
        if (isFinished) {
            return <FinishedTest test={test}
                                 onRetry={testReset}
                                 result={result}
                                 quantityQuestions={test.length}/>
        }
        return <ActiveTest answers={test[activeQuestion].answers}
                           question={test[activeQuestion].question}
                           questionNumber={activeQuestion + 1}
                           onAnswerClick={testAnswerClick}
                           quantityQuestions={test.length}/>
    };

    render() {
        return (
            <div className={classes.test}>
                <div className={classes.testWrapper}>
                    <h1>Test</h1>
                    {this.renderTest()}
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
        isLoading: state.testItem.isLoading,
        isError: state.testItem.isError
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