import axios from 'axios';
import authHeader from './authHeader';
import AuthService  from './AuthService';

const API_URL = 'http://localhost:8090/api/';
class FileService{
    
        uploadFile(FileData){
            const formData = new FormData();
            formData.append("file",FileData );
            var newfile = formData.get('file');
            console.log(newfile.name);       //filename
            console.log(newfile.size);  
            
            console.log(formData)
           
 
            return axios
            .post(API_URL + "upload",formData, {headers:authHeader(),'Accept': 'application/json','Content-Type': 'multipart/form-data; boundary=${formData._boundary}','credentials': 'include', 'Access-Control-Allow-Origin':'*' });  
            };

            getFiles(){
                return axios.get(API_URL+"fetchFiles",{headers:authHeader()});
            }
                //download a file
            downloadFile(id,filename){
           
                return axios.get(API_URL+"files/"+id,{headers:authHeader()}).then((response)=>{
                    console.log("response");
                    console.log(response);
                    if(response.status===200){
                        alert("hi")
                        const url=window.URL.createObjectURL(new Blob([response.data]));
                        const link=document.createElement('a');
                        link.href=url;
                        link.setAttribute('download',filename);
                        link.click();
                    }
                });
            }

        
    }
        
        export default new FileService();








       
         
