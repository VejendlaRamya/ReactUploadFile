import React, { Component } from "react";
import FileService from "./FileService";
import AuthService from "./AuthService";

export default class USERSignedFiles extends Component {
  
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

componentDidMount(){   
    FileService.getFiles().then((response) => {
      
      var a=this;
      var b="No uploaded Files to Download";

        console.log(response.data)
       // {this.state.fileInfos[0].name}
      
        if(response.data.length>0){
          a.setState({fileInfos:response.data});
        }else{
          a.setState({fileMessage:b});
        }
         
    });
    AuthService.getUserDetails().then((response)=>{
   
    
  
    this.setState({role:response.data.role});
    this.setState({username:response.data.username});

      
    });
 
} 




downloadFile(id,name){
  FileService.downloadFile(id,name);
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
            <li><a href="/USERPortal">Upload</a></li>
            <li ><a href="/userUploadFiles">History of Upload Files</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
         
        </div>
        </nav>
            <div className="container">
            <div class="row">
              <div class="col-md-6">

             <div className="form-group">
                 <h1>User Portal</h1>
               <h4>History of Admin Upload Files</h4>
               <br/>
              
               {this.state.fileMessage && <h4>.............{this.state.fileMessage}.............</h4>}
               <font size="2" face="Courier New" >
               <table border="1">
        <tr>
          <th>File Name</th>
           <th>Signed By</th>
          <th>Last UpdatedOn</th>
          <th>Admin's Action</th>
          <th>Comments</th>
          <th>Download</th>
        </tr>
        {this.state.fileInfos && this.state.fileInfos.map((file, key) => {
          return (
            <tr key={key}>
              <td>{file.filename}</td>
              <td>{file.signedBy}</td>
              <td>{file.uploadDateTime}</td>
              <td>{file.status}</td>
              <td>{file.comments}</td>
          <td>  <button onClick={() =>this.downloadFile(file.id,file.filename)}>Download file</button></td>

          <td></td>
            </tr>
          )
        })}
      </table>
      </font>

        </div>
           
                    </div>
                    </div>
                                
            
      </div>
      </div>
      
        )       
        
      }
    }
