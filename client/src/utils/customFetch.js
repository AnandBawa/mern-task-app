import axios from "axios";

// axios custom fetch function to query the server
const customFetch = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export default customFetch;
