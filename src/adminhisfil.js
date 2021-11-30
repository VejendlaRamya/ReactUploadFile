import React, { Component } from "react";
import FileService from "./FileService";
export default class AdminHistoryFiles extends Component {
  
  constructor(props) {
      super(props);
      this.state={
        fileInfos:[]
      }

  }
componentDidMount(){ 
  alert("component Did Mount")  
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
            <div class="row">
            <div class="col-md-6">

           <div className="form-group">
             <h4>History of Files</h4>
             <br/>
            
             {this.state.fileMessage && <h4>.............{this.state.fileMessage}.............</h4>}
             <font size="2" face="Courier New" >
             <table >
      <tr>
        <th>File Name</th>
       <th>Upload By </th>
        
        <th>Last UpdatedOn</th>
        <th>Download</th>
        <th>Delete</th>
        <th>Action</th>
      </tr>
      {this.state.fileInfos && this.state.fileInfos.map((file, key) => {
        return (
          <tr key={key}>
            <td>{file.name}</td>
            <td>{file.url}</td>
            <td>{file.type}</td>
            <td>  <button onClick={() =>this.downloadFile(file.size,file.name)}>Download</button></td>
            <td>  <button onClick={() =>this.deleteFile(file.size,file.name)}>Delete</button></td>
          <td>Pending</td>
          </tr>
        )
      })}
    </table>
    </font>

      </div>
         
                  </div>
                  </div>
  )}
    }