import axios from 'axios';
import authHeader from './authHeader';
import AuthService  from './AuthService';

const API_URL = 'http://localhost:8090/api/';
class FileService{
    uploadAdminFile(FileData,status,comments){
        const formData = new FormData();
        formData.append("file",FileData );
        formData.append("status",status);
        formData.append("comments",comments);
       return axios.post(API_URL + "upload",formData, {headers:authHeader(),'Accept': 'application/json',
       'credentials': 'include', 'Access-Control-Allow-Origin':'*' });
    }
        uploadFile(FileData){
            const formData = new FormData();
            formData.append("file",FileData );
            console.log(formData.get('file'));
                return axios.post(API_URL + "upload",formData, {headers:authHeader(),'Accept': 'application/json',
                'Content-Type': 'multipart/form-data; boundary=${formData._boundary}',
                'credentials': 'include', 'Access-Control-Allow-Origin':'*' });  
            };

            getFiles(){
                return axios.get(API_URL+"fetchFiles",{headers:authHeader()});
            }

            getUserUploadFiles(){
                return axios.get(API_URL+"fetchUserUploadFiles",{headers:authHeader()});
            }
                //download a file
            downloadFile(id,filename){
    
                return axios.get(API_URL+"files/"+id,{headers:authHeader(),responseType:'arraybuffer'}).then((response)=>{
                    console.log("response");
                    console.log(response);
                    if(response.status===200){
                        var fileExt = filename.split('.').pop();
                        var url="";
                        url=window.URL.createObjectURL(new Blob([response.data]));
                        if(fileExt==="pdf"){
                             url=window.URL.createObjectURL(new Blob([response.data],{type:"application/json"}));
                        }
                       
                        const link=document.createElement('a');
                        link.href=url;
                        link.setAttribute('download',filename);
                        link.click();
                    }
                });
            }

            deleteFile(id,filename){
                return axios.get(API_URL+"deleteFile/"+id,{headers:authHeader()}).then((res)=>{
                    if(res.status===200){
                        alert(filename+" file is deleted Successfully");
                        window.location.reload();
                    }
            });
    }
}
        
        export default new FileService();










       
         
