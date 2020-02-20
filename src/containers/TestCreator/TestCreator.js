import React, {Component} from 'react';
import classes from './TestCreator.module.css';
import {connect} from "react-redux";

import {changeInput, createControl} from '../../helpers/form';
import {addQuestion, createTest} from "../../store/actions/testCreator";

import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import Form from "../../components/UI/Form/Form";

const createAnswerControls = (quantity) => {
    if (quantity === 0) return;
    const answers = {};

    for (let i = 1; i <= quantity; i++) {
        answers['option' + i] = createControl({
            id: i,
            label: `Option ${i}`,
            errorMessage: `The option ${i} cannot be empty`
        }, {required: true})
    }

    return answers;
};

const createFormControls = (quantityOptions = 0) => {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'The question cannot be empty'
        }, {required: true}),
        ...createAnswerControls(quantityOptions),
    }
};

class TestCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(4)
    };


    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        this.setState(changeInput(formControls, value, controlName))
    };

    addQuestionHandler = () => {
        const {formControls, rightAnswerId} = this.state;

        const answers = Object.keys(formControls)
            .filter(key => key.includes('option'))
            .map(optionName => {
                return {
                    id: formControls[optionName].id,
                    text: formControls[optionName].value
                }
            });

        this.props.addQuestion({
            question: formControls.question.value,
            id: this.props.test.length + 1,
            rightAnswerId,
            answers
        });

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(4)
        });
    };

    createTestHandler = () => {
        this.props.createTest();
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(4)
        })
    };

    submitHandler = event => {
        event.preventDefault();
    };

    createSelectOptions = () => {
        return Object.keys(this.state.formControls)
            .filter(key => key.includes('option'))
            .map( (option, index) => ({text: index + 1, value: index + 1}))
    };

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    render() {
        return (
            <div className={classes.testCreator}>
                <div>
                    <h1>Test Creator</h1>

                    <Form submitHandler={this.submitHandler}
                          formControls={this.state.formControls}
                          changeHandler={this.changeHandler}>
                        <Select label='Choose right answer'
                                value={this.state.rightAnswerId}
                                onChange={this.selectChangeHandler}
                                options={this.createSelectOptions()}/>
                        <Button type='primary'
                                onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}>Add question</Button>
                        <Button type='success'
                                onClick={this.createTestHandler}
                                disabled={this.props.test.length === 0}>Create test</Button>
                    </Form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        test: state.testCreator.test
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addQuestion: (question) => dispatch(addQuestion(question)),
        createTest: () => dispatch(createTest())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TestCreator);