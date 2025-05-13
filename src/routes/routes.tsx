import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from './protectedRoutes';
import EditVenue from '../pages/EditVenue';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            { path: 'login', element: <Login /> },
            {
                path: 'home',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'editVenue',
                element: (
                    <ProtectedRoute>
                        <EditVenue />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
