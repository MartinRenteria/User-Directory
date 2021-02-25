import axios from "axios"; 

function ListOfUsers() {
    return axios.get("https://randomuser.me/api/?results=200&nat=US");
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    ListOfUsers
};