import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import {changeInput, createControl} from '../../helpers/form';
import Form from "../../components/UI/Form/Form";
import axios from "axios";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: createControl({
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter a valid email',
            }, {
                email: true
            }),
            password: createControl({
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter a valid password',
            }, {
                minLength: 6
            })
        }
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        this.setState(changeInput(formControls, value, controlName))
    };

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.formControls.email.value, this.state.formControls.password.value)
    };

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8cPXHxl2UvGwmJUhQ-y15A46W0WMnTSA', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8cPXHxl2UvGwmJUhQ-y15A46W0WMnTSA', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        return (
            <div className={classes.auth}>
                <div>
                    <h1>Auth</h1>

                    <Form submitHandler={this.submitHandler}
                          formControls={this.state.formControls}
                          changeHandler={this.changeHandler}>
                        <Button type='success'
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>Login</Button>
                        <Button type='primary'
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}>Register</Button>
                    </Form>

                </div>
            </div>
        )
    }
}

export default Auth;