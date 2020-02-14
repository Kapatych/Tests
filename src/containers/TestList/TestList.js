import React, {Component} from 'react';
import classes from './TestList.module.css';

export default class TestList extends Component {
    render() {
        return (
            <div className={classes.testList}>
                <h1>Test List</h1>
            </div>
        )
    }
}