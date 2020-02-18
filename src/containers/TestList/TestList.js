import React, {Component} from 'react';
import classes from './TestList.module.css';
import axios from '../../helpers/axios';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";

export default class TestList extends Component {

    state = {
        tests: [],
        isLoading: true
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/test-list.json');

            const tests = Object.keys(response.data).map((key, index) => {
                return {
                    id: key,
                    name: `Test № ${index + 1}`
                }
            });

            this.setState({tests, isLoading: false});
        } catch (e) {
            console.log(e)
        }
    }

    renderTests = () => {
        return this.state.tests.map(test => {
            return (
                <li key={test.id}>
                    <NavLink to={'/test/' + test.id}>
                        {test.name}
                    </NavLink>
                </li>
            )
        })
    };

    render() {

        return (
            <div className={classes.testList}>
                <div>
                    <h1>Test List</h1>
                    {
                        this.state.isLoading
                            ? <Loader/>
                            : <ul>{ this.renderTests() }</ul>
                    }

                </div>
            </div>
        )
    }
}