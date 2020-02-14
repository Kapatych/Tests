import React, {Component} from 'react';
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

export default class Auth extends Component {

    state = {
        email: '',
        pass: '',
    };

    changeHandler = (event) => {
        const value = event.target.value;
        this.setState( state => {
            return {email: value}
        })
    };

    submitHandler = (event) => {
        event.preventDefault();

    };
    loginHandler = () => {

    };

    registerHandler = () => {

    };

    render() {
        return (
            <div className={classes.auth}>
                <div>
                    <h1>Auth</h1>

                    <form className={classes.authForm} onSubmit={this.submitHandler}>
                        <Input type='text'
                               label='Email'
                               value={this.state.email}
                               onChange={this.changeHandler}/>
                        <Input type='text'
                               label='Password'
                               value={this.state.pass}
                               onChange={this.changeHandler}/>
                        <Button type='success'
                                onClick={this.loginHandler}>Login</Button>
                        <Button type='primary'
                                onClick={this.registerHandler}>Register</Button>
                    </form>
                </div>
            </div>
        )
    }
}