import React, { Component } from "react";
import FileService from "./FileService";
import AuthService from "./AuthService";


export default class AdminPortal extends Component {
  
    constructor(props) {
        super(props);
        
       
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeComments = this.onChangeComments.bind(this);

        
     
    this.state={
        message:"",
        username:"",
        role:"",
        errmessage:"",
        fileStatus:"Signed",
        comments:""
    }
}
 

onChangeStatus(e) 
{
  this.setState({
    fileStatus: e.target.value
  });
}
onChangeComments(e){
  alert("comments")
  this.setState({
    comments:e.target.value
  });
  
}
    onFileChangeHandler = (e) => {
      
        this.setState({
            message: ""
          });
          console.log("value");
          e.preventDefault(); 
         alert(this.state.fileStatus)
        FileService.uploadAdminFile(e.target.files[0],this.state.fileStatus,this.state.comments).then(res => {
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
          <>
           <nav>
          <div>
           
          <ul id="nav"   style={{ display: "flex", justifyContent: 'flex-end'}}>
            <li ><a href="/file">History</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
         
        </div>
        </nav>
            <div className="container">
               <h1>Welcome to the Admin  Portal</h1>
       <div class="row">
         <div class="col-md-6">
       </div>
       
      
       </div>
              <div className="row">
               
                    <div className="col-md-6">
                            <div className="form-group files color">
                                <h4>Upload Your File </h4>
                                <input type="file" className="form-control" name="file" onChange={this.onFileChangeHandler}/>
                               <br/> 
                    <label>Accept File</label>
                    <input type="radio" 
                    name="fileStatus" 
                    value="Signed"
                    checked={this.state.fileStatus === "Signed"}
                    onChange={this.onChangeStatus}
                   />
                    

                     <label>Reject File</label>
                     <input type="radio" 
                    name="fileStatus" 
                    value="Reject"
                    onChange={this.onChangeStatus}

                   />
                   <br/>
                   <textarea id="w3review" name="comments"
                   placeholder="Enter Comments"  rows="4" onChange={this.onChangeComments} cols="50"></textarea>
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
      </>
   
      
        )       
        
      }
    }
