import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import Layout from "./containers/Layout/Layout";
import TestList from "./containers/TestList/TestList";
import Auth from "./containers/Auth/Auth";
import TestCreator from "./containers/TestCreator/TestCreator";
import Test from "./containers/Test/Test";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

const App = (props) => {
    //TODO: Change to class component ?!
    React.useEffect(() => {
        props.autoLogin()
    }, [props]);

    return (
        <BrowserRouter>
            <Layout isAuth={props.isAuth}>
                {props.isAuth
                    ?
                    <Switch>
                        <Route path='/' component={TestList} exact={true}/>
                        <Route path='/test/:id' component={Test}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/test-creator' component={TestCreator}/>
                        <Redirect to={'/'} />
                    </Switch>
                    :
                    <Switch>
                        <Route path='/' component={TestList} exact={true}/>
                        <Route path='/test/:id' component={Test}/>
                        <Route path='/auth' component={Auth}/>
                        <Redirect to={'/'} />
                    </Switch>
                }
            </Layout>
        </BrowserRouter>
    );
};

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
