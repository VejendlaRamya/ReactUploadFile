import axios from "axios";
import authHeader from './authHeader';


const API_URL = "http://localhost:8090/";

class AuthService {
  signup(username,password,role,email){
    var data={};
      data.username=username;
     data.password=password;
      data.role=role;
      data.email=email;
    
    return axios.post(API_URL + "signup", data).then(res=>{
      console.log("response");
      console.log(res)
      if(res.status===200){
        alert("Successfully Sign Up");

      }
      
    })
  }



  login(username, password) {
     
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
getUserDetails(){
  return axios.get(API_URL + "userDetails",{headers:authHeader()});
}
  logout() {
    alert("Logout Successful")
    localStorage.removeItem("user");
  }

 

  getCurrentUser() {

    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();