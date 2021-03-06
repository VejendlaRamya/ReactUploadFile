import React, { Component } from "react";
import FileService from "./FileService";
export default class AdminHistoryFiles extends Component {
  
  constructor(props) {
      super(props);
      this.state={
        fileInfos:[],
        fileMessage:""
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
}
downloadFile(id,name){
  FileService.downloadFile(id,name);
}

deleteFile(id,name){
  FileService.deleteFile(id,name);
}

render(){    
  return(
    <div>
    <nav>

     
    <ul id="nav"   style={{ display: "flex", justifyContent: 'flex-end'}}>
      <li ><a href="/ADMINportal">Upload File</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>

  </nav>
     
  
            <div class="row">
            <div class="col-md-6">

           <div className="form-group">
             <h1>Admin Portal</h1>
             <h4>History of Files</h4>
             <br/>
            
             {this.state.fileMessage && <h4>.............{this.state.fileMessage}.............</h4>}
             <font size="2" face="Courier New" >
             <table border="1">
             <tr>
        <th>File Name</th>
       <th>Upload By </th>
        
        <th>Last UpdatedOn</th>
        <th>Action</th>
        <th>Download</th>
        <th>Delete</th>
       
      </tr>

      {this.state.fileInfos && this.state.fileInfos.map((file, key) => {
        return (
          <tr key={key}>
            <td>{file.filename}</td>
            <td>{file.uploadBy}</td>
            <td>{file.uploadDateTime}</td>
            <td>{file.status}</td>
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
  )}
    }