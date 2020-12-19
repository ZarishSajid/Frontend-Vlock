import React, { Component } from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Login from "../src/views/Login";
import { ToastContainer } from 'react-toastify';
import components from "../src/components";
import Errors from "../src/common/Errors";
import Register from "../src/views/Register";
import ResetPassword from "../src/views/ResetPassword";
// const ngrok = require('ngrok');
class App extends Component {
  state = {}
  render() {
    // (async function() {
    //   const url = await ngrok.connect(8080);
     


    // })();
    return (
      <div>
  
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/Login' component={Login} />
        <Route path='/Register' component={Register} />
        <Route path ='/ResetPassword' component={ResetPassword}/>
        <Route path='/components' component={components} />

        </Switch>
      </Router>
      <ToastContainer />
      </div>
    );
  }
}

export default App;