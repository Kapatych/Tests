import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import {changeInput, createControl} from '../../helpers/form';
import Form from "../../components/UI/Form/Form";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

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
        //console.log(this.state.formControls.email.value, this.state.formControls.password.value)
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    render() {
        return (
            <div className={classes.auth}>
                <div>
                    <h1>Auth</h1>

                    <Form submitHandler={this.submitHandler}
                          formControls={this.state.formControls}
                          changeHandler={this.changeHandler}
                          loginError={this.props.loginError}>
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

const mapStateToProps = state => {
    return {
        loginError: state.auth.isError
    }
};

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);