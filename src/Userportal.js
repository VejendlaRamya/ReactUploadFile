import React, { Component } from "react";
import FileService from "./FileService";
import AuthService from "./AuthService";

export default class USERPortal extends Component {
  
    constructor(props) {
        super(props);
        
       
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
     
    this.state={
        message:"",
        fileInfos:[],
        username:"",
        role:"",
        fileMessage:"",
        errmessage:""
    }
}



    onFileChangeHandler = (e) => {
      
        this.setState({
            message: ""
          });
          console.log("value");
        
          e.preventDefault(); 
         
        FileService.uploadFile(e.target.files[0]).then(res => {
            console.log(res)
            if(res.status===200) {

                console.log(res.data);
                this.setState({
                    message: res.data });
                alert("File uploaded successfully.")
                window.location.reload();
                return  FileService.getFiles();
               
            };
        },error=>{
       
        const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      this.setState({
        errmessage: resMessage });
        
    })
    };

    
   
    render(){    
        return(
          <div>
  <nav>
          <div>
           
          <ul id="nav"   style={{ display: "flex", justifyContent: 'flex-end'}}>
            <li ><a href="/signedFile">History of Signed Files</a></li>
            <li><a href="/userUploadFiles">History of Upload Files</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
         
        </div>
        </nav>
            <div className="container">
               <h1>Welcome to the User  Portal</h1>
       <div class="row">
         <div class="col-md-6">
       </div>
       
      
       </div>
       <br/>
       <br/>
       <br/>
              <div className="row">
               
                    <div className="col-md-6">
                            <div className="form-group files color">
                                <h4>Upload Your File </h4>
                                <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                            </div>
                            
                            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-success" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
                      {this.state.errmessage && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.errmessage}
                </div>
              </div>
            )}
            </div>
            </div>
          
            <br/>
            
                                
            
      </div>
      </div>
      
        )       
        
      }
    }
