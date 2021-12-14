import React from 'react';
import authService from '../services/authService';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const auth = authService.isAuthenticated();
    return auth ? children : <Navigate to="/signin" />
}

export default ProtectedRoute;