import React, { Component } from "react";
import FileService from "./FileService";
import AuthService from "./AuthService";

export default class USERUploadFiles extends Component {
  
    constructor(props) {
        super(props);
        
       
     
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
    FileService.getUserUploadFiles().then((response) => {
      
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




deleteFile(id,name){
    FileService.deleteFile(id,name);
  }

downloadFile(id,name){
  FileService.downloadFile(id,name);
}
    render(){    
        return(
          <div>
  <nav>
          <div>
           
          <ul id="nav"   style={{ display: "flex", justifyContent: 'flex-end'}}>
              <li><a href="/USERPortal">Upload File</a></li>
            <li ><a href="/signedFile">History of Signed Files</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
         
        </div>
        </nav>
            <div className="container">
            <div class="row">
              <div class="col-md-6">

             <div className="form-group">
             <h1>User Portal</h1>
               <h4>History of User Upload Files</h4>
               <br/>
              
               {this.state.fileMessage && <h4>.............{this.state.fileMessage}.............</h4>}
               <font size="2" face="Courier New" >
               <table border="1">
        <tr>
          <th>File Name</th>
          <th>Upload On</th>
          <th>Download</th>
          <th>Delete</th>
        </tr>
        {this.state.fileInfos && this.state.fileInfos.map((file, key) => {
          return (
            <tr key={key}>
              <td>{file.filename}</td>
              <td>{file.uploadDateTime}</td>
          <td>  <button onClick={() =>this.downloadFile(file.id,file.filename)}>Download</button></td>
          <td>  <button onClick={() =>this.deleteFile(file.id,file.filename)}>Delete</button></td>

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
