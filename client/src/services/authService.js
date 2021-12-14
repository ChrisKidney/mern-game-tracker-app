import Axios from 'axios';
import { decode } from 'jsonwebtoken';

class AuthService {
    constructor() {
        this.authenticated = false;
    }

    register(registrationData, callback) {
        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/users/register`, registrationData)
        .then(response => {
            localStorage.setItem('token', response.headers['x-auth-token']);
            callback(null, true);
        })
        .catch(error => {
            callback(error.response, false);
            console.log(error.response.data);
        });
    }

    login(credentials, callback) {
        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/users/login`, credentials)
            .then(response => {
                localStorage.setItem('token', response.headers['x-auth-token']);
                callback(null, true);
            })
            .catch(error => {
                callback(error.response, false);
                console.log(error.response);
            });
    }

    getUser() {
       const token = localStorage.getItem('token');
       if (token) {
           const decoded = decode(token);
           return decoded.email;
       }
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }
}

export default new AuthService();
