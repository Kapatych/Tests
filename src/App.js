import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary";
import Layout from "./containers/Layout/Layout";
import TestList from "./containers/TestList/TestList";
import Auth from "./containers/Auth/Auth";
import TestCreator from "./containers/TestCreator/TestCreator";
import Test from "./containers/Test/Test";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        return (
            <ErrorBoundary>
                <BrowserRouter>
                    <Layout isAuth={this.props.isAuth}>
                        {this.props.isAuth
                            ?
                            <Switch>
                                <Route path='/' component={TestList} exact={true}/>
                                <Route path='/test/:id' component={Test}/>
                                <Route path='/test-creator' component={TestCreator}/>
                                <Route path='/logout' component={Logout}/>
                                <Redirect to={'/'}/>
                            </Switch>
                            :
                            <Switch>
                                <Route path='/' component={TestList} exact={true}/>
                                <Route path='/test/:id' component={Test}/>
                                <Route path='/auth' component={Auth}/>
                            </Switch>
                        }
                    </Layout>
                </BrowserRouter>
            </ErrorBoundary>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
