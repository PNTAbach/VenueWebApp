/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import UserService from '../services/user.service';
import { UserLoginDTO, UserSignUpDTO } from '../models/IUser';

type UserContextType = {
    token: string | null;
    error: string | null;
    registerUser: (data: UserSignUpDTO) => void;
    loginUser: (data: UserLoginDTO) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const userService: UserService = new UserService();
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + storedToken;
        }
        setIsReady(true);
    }, []);

    const loginUser = async (data: UserLoginDTO): Promise<void> => {
        // ✅ make sure NO old token pollutes the request
        localStorage.removeItem('token');

        delete axios.defaults.headers.common['Authorization'];

        userService
            .login(data)
            .then((response) => {
                localStorage.setItem('token', response.token);
                setToken(response.token);
                setError(null);
                navigate('/home');
            })
            .catch((e) => {
                if (axios.isAxiosError(e)) {
                    const status = e.response?.status;
                    const data = e.response?.data;

                    console.error('Login failed. Status:', status);
                    console.error('Response data:', data);

                    if (status === 403) {
                        setError(
                            'Invalid credentials. Please check your email or password.'
                        );
                    } else if (data) {
                        setError(
                            typeof data === 'string'
                                ? data
                                : 'An error occurred.'
                        );
                    } else {
                        setError('Login failed. Please try again.');
                    }
                } else {
                    console.error('Unexpected error:', e);
                    setError('Unexpected error occurred.');
                }
            });
    };

    const registerUser = async (data: UserSignUpDTO): Promise<void> => {
        userService
            .register(data)
            .then((response) => {
                localStorage.setItem('token', response.token);
                setToken(response.token);
                navigate('/home');
                setError(null);
            })
            .catch((e) => {
                console.error('Login Failed' + e);
                setError(e);
            });
    };

    const isLoggedIn = (): boolean => {
        return !!token;
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    return (
        <UserContext.Provider
            value={{
                loginUser,
                token,
                logout,
                isLoggedIn,
                registerUser,
                error,
            }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);
