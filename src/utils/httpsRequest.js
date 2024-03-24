import axios from "axios";

export const server = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/v1' : ''


export const httpRequest = axios.create({
    withCredentials: true,
    baseURL: server
});