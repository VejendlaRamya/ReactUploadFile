import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './login';
import USERPortal  from "./Userportal";
import USERUploadFiles from "./useruploadfilehistory"

import USERSignedFiles  from "./usersignedfilehistory";
import { Switch, Route, Link } from "react-router-dom";
import Login1 from './login1'

import Signup from "./signup";
import HistoryOfFiles from './adminhisfil';
import AdminPortal from './AdminPortal';
import Logout from './logout';

class App extends Component {
 render() {
    return(
      <div className="container mt-3">
      <Switch>
  
        <Route exact path="/" component={Signup} />
        <Route exact path="/file" component={Login} />
        <Route exact path="/login" component={Login1}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path="/signedFile" component={USERSignedFiles}/>
        <Route exact path="/userUploadFiles" component={USERUploadFiles}/>
        
        <Route exact path="/ADMINportal" component={AdminPortal} />
<Route exact path="/USERportal" component={USERPortal} />
       
      
      </Switch>
    </div>
    )
  }
}
export default App;
