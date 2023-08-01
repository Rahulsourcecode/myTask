import axios from 'axios'

const baseURL = "http://localhost:3001/api";
const Axios = axios.create({
  baseURL,
  withCredentials: true,
});

export default Axios