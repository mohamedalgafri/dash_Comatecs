import axios from "axios";
// import jwt from "jwt-decode";

// const token = jwt(window.localStorage.getItem("token"));
console.log(window.localStorage.getItem("token"));

// const nameIdentifier =
//   token["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
// console.log(nameIdentifier);

const baseUrl = axios.create({
  baseURL: "http://futurecanvas-001-site3.ftempurl.com",
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
});

export default baseUrl;
