import React, {Component} from 'react';
import classes from './TestCreator.module.css';
import {connect} from "react-redux";

import {changeInput, createControl} from '../../helpers/form';
import {addQuestion, addSettings, createTest, testCreatorReset} from "../../store/actions/testCreator";

import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import Form from "../../components/UI/Form/Form";
import Loader from "../../components/UI/Loader/Loader";
import Error from "../../components/Error/Error";

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

const createInfoForm = () => {
    return {
        name: createControl({
            label: 'Enter test name',
            errorMessage: 'The name cannot be empty'
        }, {required: true}),
        answersQuantity: createControl({
            label: 'Enter answers quantity',
            errorMessage: 'The quantity cannot be empty and less then 1'
        }, {required: true, minValue: 2}),

    }
};

class TestCreator extends Component {

    formControls = this.props.name ? createFormControls(+this.props.answersQuantity) : createInfoForm();

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: this.formControls
    };

    componentWillUnmount() {
        this.props.testCreatorReset()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        this.setState(changeInput(formControls, value, controlName))
    };

    addSettings = () => {
        const {name, answersQuantity} = this.state.formControls;

        this.props.addSettings({
            name: name.value,
            answersQuantity: answersQuantity.value
        });

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(+answersQuantity.value)
        });
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
            id: this.props.questions.length + 1,
            rightAnswerId,
            answers
        });

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(+this.props.answersQuantity)
        });
    };

    createTestHandler = () => {
        this.props.createTest();

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createInfoForm()
        });
    };

    submitHandler = event => {
        event.preventDefault();
    };

    createSelectOptions = () => {
        return Object.keys(this.state.formControls)
            .filter(key => key.includes('option'))
            .map((option, index) => ({text: index + 1, value: index + 1}))
    };

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    };

    renderForm = () => {

        if (this.props.isLoading) return <Loader/>;
        if (this.props.isError) return <Error/>;

        return (
            <Form submitHandler={this.submitHandler}
                  formControls={this.state.formControls}
                  changeHandler={this.changeHandler}>
                {
                    this.props.name
                        ?
                        <React.Fragment>
                            <Select label='Choose right answer'
                                    value={this.state.rightAnswerId}
                                    onChange={this.selectChangeHandler}
                                    options={this.createSelectOptions()}/>
                            <Button type='primary'
                                    onClick={this.addQuestionHandler}
                                    disabled={!this.state.isFormValid}>Add question</Button>
                            <Button type='success'
                                    onClick={this.createTestHandler}
                                    disabled={this.props.questions.length === 0}>Create test</Button>

                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button type='primary'
                                    onClick={this.addSettings}
                                    disabled={!this.state.isFormValid}>Confirm</Button>
                        </React.Fragment>
                }
            </Form>
        )
    };

    render() {
        return (
            <div className={classes.testCreator}>
                <div>
                    <h1>Test Creator</h1>
                    {this.renderForm()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.testCreator.name,
        answersQuantity: state.testCreator.answersQuantity,
        questions: state.testCreator.questions,
        isLoading: state.testCreator.isLoading,
        isError: state.testCreator.isError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addSettings: (settings) => dispatch(addSettings(settings)),
        addQuestion: (question) => dispatch(addQuestion(question)),
        createTest: () => dispatch(createTest()),
        testCreatorReset: () => dispatch(testCreatorReset())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TestCreator);