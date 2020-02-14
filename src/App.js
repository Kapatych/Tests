import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from "./containers/Layout/Layout";
import TestList from "./containers/TestList/TestList";
import Auth from "./containers/Auth/Auth";
import TestCreator from "./containers/TestCreator/TestCreator";
import Test from "./containers/Test/Test";


function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path='/' component={TestList} exact={true}/>
                    <Route path='/auth' component={Auth}/>
                    <Route path='/test-creator' component={TestCreator}/>
                    <Route path='/test/:id' component={Test}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
