import axios from "axios"; 
const APIURL = "https://randomuser.me/api/?results=99"

const API = {
  ListOfUsers: function() {
    
    return axios.get(APIURL);
  }
};

export default API;