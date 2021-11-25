import React, { Component } from "react";
import FileService from "./FileService";
import AuthService from "./AuthService";

export default class Portal extends Component {
  
    constructor(props) {
        super(props);
        
       
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
     
    this.state={
        message:"",
        fileInfos:[],
        username:"",
        role:""
    }
}

componentDidMount(){   
    FileService.getFiles().then((response) => {
      
      var a=this;

        console.log(response.data)
       // {this.state.fileInfos[0].name}
      
        
         a.setState({fileInfos:response.data});
    });
    AuthService.getUserDetails().then((response)=>{
   
    
  
    this.setState({role:response.data.role});
    this.setState({username:response.data.username});

      
    });
 
} 




downloadFile(id,name){
  FileService.downloadFile(id,name);
}
logout(){
  
  AuthService.logout();
  this.props.history.push("/login");
}

    onFileChangeHandler = (e) => {
        this.setState({
            message: ""
          });
      
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
        message: resMessage });
    })
    };

    
   
    render(){    
      var heading = ['Name', 'Download'];
        return(

            <div className="container">
               <h1>Welcome to the {this.state.role}  Portal</h1>
       <div class="row">
         <div class="col-md-6">
       </div>
       
       <div class="col-md-6">
        <button onClick={() =>this.logout()}>Logout</button>

        <h4> Login User Name : {this.state.username}</h4>
        <h4> Login User Role : {this.state.role}</h4>
       </div>
       </div>
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
            </div>
            </div>
            <div class="row">
              <div class="col-md-6">

             <div className="form-group">
               <h4>History of Files</h4>
            <ul>
  {this.state.fileInfos && this.state.fileInfos.map(( file, index ) => {
          return (
           <li><h4>{file.name}  </h4> 
          
           <button onClick={() =>this.downloadFile(file.size,file.name)}>Download file</button>
           <br/>
           <br/>
           {this.state.role ==='USER' &&
           file.url && (<h4>File Signed By {file.url}</h4>)}
            {this.state.role ==='ADMIN' &&
           file.url && (<h4>File Upload By {file.url}</h4>)}
           <br/>
           <h4>File Last Updated By {file.url} On {file.type}</h4>
           </li>
           
          
          )})}
          </ul>



        </div>
           
                    </div>
                    </div>
                                
            
      </div>
      
        )       
        
      }
    }
