import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import IndexPage from './pages/index';

class App extends Component<any,any> {
    render() {
        return (
            <Router>
                <Route path='/' component={IndexPage}></Route>
            </Router>
        );
    }
}

export default App;