import React, {Component} from 'react';
import classes from './Test.module.css';
import ActiveTest from "../../components/ActiveTest/ActiveTest";
import FinishedTest from "../../components/FinishedTest/FinishedTest";
import axios from "../../helpers/axios";
import Loader from "../../components/UI/Loader/Loader";


export default class Test extends Component {
    state = {
        result: 0, // TODO: {questionId: success || error}
        isFinished: false,
        activeQuestion: 0,
        test: [],
        isLoading: true
    };

    async componentDidMount() {
        try {
            const response = await axios(`test-list/${this.props.match.params.id}.json`);
            this.setState({test: response.data, isLoading: false})
        } catch (e) {
            console.log(e)
        }
    };

    onAnswerClickHandler = answerId => {

        //Check result
        const activeQuestion = this.state.test[this.state.activeQuestion];
        if (answerId === activeQuestion.rightAnswerId) {
            this.setState((state) => {
                return {result: state.result + 1};
            });
        }

        //Next question or finish
        const timeout = window.setTimeout(() => {
            if (this.state.activeQuestion + 1 !== this.state.test.length) {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1
                });
            } else {
                this.setState({
                    isFinished: true
                })
            }
            window.clearTimeout(timeout)
        }, 500)

    };

    onRetryHandler = () => {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            result: 0
        })
    };

    render() {

        const {test, activeQuestion, isLoading, isFinished} = this.state;

        return (
            <div className={classes.test}>
                <div className={classes.testWrapper}>
                    <h1>Test</h1>
                    {
                        isLoading
                            ? <Loader/>
                            : isFinished
                            ? <FinishedTest onRetry={this.onRetryHandler}
                                            result={this.state.result}
                                            quantityQuestions={test.length}/>

                            : <ActiveTest answers={test[activeQuestion].answers}
                                          question={test[activeQuestion].question}
                                          questionNumber={activeQuestion + 1}
                                          onAnswerClick={this.onAnswerClickHandler}
                                          quantityQuestions={test.length}/>
                    }
                </div>
            </div>
        )
    }
}