import React, {Component} from 'react';
import classes from './TestCreator.module.css';

export default class TestCreator extends Component {
    render() {
        return (
            <div className={classes.testCreator}>
                <h1>TestCreator</h1>
            </div>
        )
    }
}