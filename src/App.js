import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './login';
import Portal  from "./portal";
import { Switch, Route, Link } from "react-router-dom";
import Logout from "./logout";

class App extends Component {
 render() {
    return(
      <div className="container mt-3">
      <Switch>
  
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        
        <Route exact path="/portal" component={Portal} />
        <Route exact path="/logout" Component={Logout}/>
      
      </Switch>
    </div>
    )
  }
}
export default App;
