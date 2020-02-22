import React, {Component} from 'react';
import classes from './TestList.module.css';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchTestList} from "../../store/actions/testList";

class TestList extends Component {

    componentDidMount() {
        this.props.fetchTestList()
    }

    renderList = () => {
        const {tests, isLoading} = this.props;
        if (isLoading || !tests ) return <Loader/>;

        return <ul>
                {
                    this.props.tests.map(test => {
                        return (
                            <li key={test.id}>
                                <NavLink to={'/test/' + test.id}>
                                    {test.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>



    };

    render() {
        return (
            <div className={classes.testList}>
                <div>
                    <h1>Test List</h1>
                    { this.renderList() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tests: state.testList.tests,
        isLoading: state.testList.isLoading
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchTestList: () => dispatch(fetchTestList())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TestList)
