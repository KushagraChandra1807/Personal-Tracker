import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Replace if using a different backend URL
});

export default instance;
