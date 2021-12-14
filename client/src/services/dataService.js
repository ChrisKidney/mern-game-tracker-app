import Axios from 'axios';
import authService from './authService';

class DataService {
    createGame(data, callback) {
        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/games`, data,
        {
            headers: {
                'x-auth-token': authService.getToken()
            }
        })
        .then(response => {
            callback(null, true);
        })
        .catch(error => {
            callback(error.response, false);
        });
    }

    updateGame(data, callback) {
        Axios.put(`${process.env.REACT_APP_API_ROOT_URL}/games/${data._id}`, data,
        {
            headers: {
                'x-auth-token': authService.getToken()
            }
        })
        .then(response => {
            callback(null, true);
        })
        .catch(error => {
            callback(error.response, false);
        });
    }

    getGame(id, callback) {
        Axios.get(`${process.env.REACT_APP_API_ROOT_URL}/games/${id}`)
        .then(response => {
            callback(null,true, response.data);
        })
        .catch(error => {
            callback(error.response, false);
        });
    }

    deleteGame(id, callback) {
       if (window.confirm('Are you sure you want to delete?')) {
           Axios.delete(`${process.env.REACT_APP_API_ROOT_URL}/games/${id}`,
           {
                headers: {
                    'x-auth-token': authService.getToken()
                }
            })
           .then(response => {
               callback(null, true);
           })
           .catch(error => {
               callback(error.response, false);
           });
       }
    }
}

export default new DataService();