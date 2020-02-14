import React, {Component} from 'react';
import classes from './Test.module.css';
import ActiveTest from "../../components/ActiveTest/ActiveTest";
import FinishedTest from "../../components/FinishedTest/FinishedTest";

export default class Test extends Component {
    state = {
        result: 0, // TODO: {questionId: success || error}
        isFinished: false,
        activeQuestion: 0,
        test: [
            {
                id: 1,
                question: 'How are you?',
                answers: [
                    {id: 1, text: 'Answer 1'},
                    {id: 2, text: 'Answer 2'},
                    {id: 3, text: 'Answer 3'},
                    {id: 4, text: 'Answer 4'},
                ],
                rightAnswerId: 1
            },
            {
                id: 2,
                question: 'What\'s the weather today?',
                answers: [
                    {id: 1, text: '1 Answer'},
                    {id: 2, text: '2 Answer'},
                    {id: 3, text: '3 Answer'},
                    {id: 4, text: '4 Answer'},
                ],
                rightAnswerId: 3
            },
        ]
    };

    componentDidMount = () => {
        console.log('Test ID =', this.props.match.params.id)
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

        const {test, activeQuestion, isFinished} = this.state;

        return (
            <div className={classes.test}>
                <div className={classes.testWrapper}>
                    <h1>Test</h1>
                    {
                        isFinished
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