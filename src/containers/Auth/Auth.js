import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

function validateEmail(email) {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter a valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter a valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    changeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        const validateControl = (value, validation) => {
            if (!validation) {
                return true
            }
            let isValid = true;

            if (validation.required) {
                isValid = value.trim() !== '' && isValid
            }
            if (validation.email) {
                isValid = validateEmail(value) && isValid
            }
            if (validation.minLength) {
                isValid = value.length >= validation.minLength && isValid
            }
            return isValid
        };

        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControls[controlName] = control;

        //Validation of the entire form
        let isFormValid = this.state.isFormValid;
        Object.keys(formControls).forEach(name =>  isFormValid = formControls[name].valid);

        this.setState({
            formControls,
            isFormValid
        })

    };

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.formControls.email.value, this.state.formControls.password.value)
    };
    loginHandler = () => {

    };

    registerHandler = () => {

    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map( (controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input key={controlName + index}
                       //type={control.type}
                       value={control.value}
                       label={control.label}
                       valid={control.valid}
                       touched={control.touched}
                       shouldValidate={!!control.validation}
                       errorMessage={control.errorMessage}
                       onChange={event => this.changeHandler(event, controlName)}
                />
            )
        })
    };

    render() {
        return (
            <div className={classes.auth}>
                <div>
                    <h1>Auth</h1>

                    <form className={classes.authForm} onSubmit={this.submitHandler}>
                        {this.renderInputs()}

                        <Button type='success'
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>Login</Button>
                        <Button type='primary'
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}>Register</Button>
                    </form>
                </div>
            </div>
        )
    }
}