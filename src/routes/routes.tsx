import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import ProtectedRoute from './protectedRoutes';
import EditVenue from '../pages/EditVenue';
import Overview from '../pages/Overview';
import Events from '../pages/Events';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, // same as path: ''
                element: <Navigate to="/login" replace />,
            },
            {
                path: 'login',
                element: <Login />,
            },

            {
                path: 'overview',
                element: (
                    <ProtectedRoute>
                        <Overview />
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
            {
                path: 'events',
                element: (
                    <ProtectedRoute>
                        <Events />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
