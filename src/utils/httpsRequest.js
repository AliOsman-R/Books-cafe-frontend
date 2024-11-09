import axios from "axios";

export const server = process.env.REACT_APP_NODE_ENV === 'dev' ? 'http://localhost:5000/api/v1' : 'https://books-cafe-backend.vercel.app/api/v1'


export const httpRequest = axios.create({
    withCredentials: true,
    baseURL: server
});