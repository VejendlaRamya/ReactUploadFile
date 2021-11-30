import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from './AuthService';


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


export default class SignUp extends Component {
    constructor(props) {
        super(props);
    this.state = {
        username: "",
        password: "",
        email:"",
        loading: false,
        message: "",
        errMessage:"",
        role:"USER"
      };
      this.handleSignup = this.handleSignup.bind(this);
      this.onChangeEmail=this.onChangeEmail.bind(this);
      this.onChangeUsername=this.onChangeUsername.bind(this);
      this.onChangePassword=this.onChangePassword.bind(this);
      this.onChangeRole=this.onChangeRole.bind(this);


    }

    onChangeRole(e){
        alert(this.state.role)
            this.setState({
              role: e.target.value
            });
    }
    
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }



    handleSignup(e) {
      this.setState({
       
        loading: true
      });
        this.form.validateAll();
        
   if (this.checkBtn.context._errors.length === 0) {
   AuthService.signup(this.state.username, this.state.password,this.state.role,this.state.email).then(
    () => {
      alert("Successfully Sign Up")
     
       
     //   this.props.history.push("/login");
        
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading:false,
          message: resMessage
        });
      });
    alert("Register Successfull");
    }else {
      this.setState({
        loading: false
      });
  }
}
    render() {
        return (
            <div className="row">
        
            <div className="col-md-4"></div>
            
           <div className="col-md-4">
           <h1>Upload Binary File</h1><h3> Signup Page</h3>
           <br/>
            <div className="card card-container">
            <Form
               onSubmit={this.handleSignup}
               ref={c => {
                 this.form = c;
               }}>
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <Input type="text" className="form-control"
                     name="username"
                   
                     value={this.state.username}
                     onChange={this.onChangeUsername}
                    
                    placeholder="Enter User name"

                    validations={[required]} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <Input type="email" className="form-control"
                     name="email"
                     value={this.state.email}
                     onChange={this.onChangeEmail}
                    placeholder="Enter email" 
                    validations={[required]}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <Input type="password" className="form-control" 
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    placeholder="Enter password" 
                    validations={[required]}/>
                </div>

                <div className="form-group">
                    <label>USER Role</label>
                    <Input type="radio" 
                    name="role" id="1"
                    value="USER"
                    checked={this.state.role === "USER"}
                    onChange={this.onChangeRole}
                    validations={[required]}/>
                    </div>
<div>
                     <label>ADMIN Role</label>
                     <Input type="radio" 
                    name="role" 
                    value="ADMIN"
                    onChange={this.onChangeRole}

                    validations={[required]}/>
                </div>

                <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Sign Up</span>
              </button>
            </div>

                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
                
                
            {this.state.errMessage && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.errMessage}
                </div>
              </div>
            )}
               {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
                <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
              />

            </Form>
            </div>
            </div>
            </div>
        );
    }
}