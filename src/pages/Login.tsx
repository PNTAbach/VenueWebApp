/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, { useState } from 'react';
import CButton from '../components/button/button';
import InputField from '../components/inputField/inputField';
import { UserLoginDTO } from '../models/IUser';
import { useAuth } from '../conf/useAuth';
import '../css/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Login: React.FC = () => {
    const { loginUser, error } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // handle button click of login form
    const handleLogin = (): void => {
        const user: UserLoginDTO = {
            email: email,
            password: password,
        };

        loginUser(user);
    };

    // show error toast when error is updated
    useEffect(() => {
        if (error) {
            toast.error('Invalid email or password.');
        }
    }, [error]);

    return (
        <div className="login-main">
            <div className="login-left">
                <img
                    src={'https://pntadk.files.wordpress.com/2024/03/light.png'}
                    alt=""
                />
            </div>
            <div className="login-right">
                <div className="login-right-container">
                    <div className="login-logo">
                        <img
                            src={
                                'https://pntadk.files.wordpress.com/2024/03/dark.png?w=50'
                            }
                            alt=""
                        />
                    </div>
                    <div className="login-center">
                        <h2
                            style={{
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                        >
                            Welcome back!
                        </h2>
                        <p
                            style={{
                                color: 'black',
                            }}
                        >
                            Please enter your details
                        </p>

                        <div>
                            <InputField
                                className="inputs"
                                placeholder={'Email'}
                                value={email}
                                onChange={setEmail}
                            />
                        </div>

                        <div className="pass-input-div">
                            <InputField
                                className="inputs"
                                placeholder={'Password'}
                                type="password"
                                value={password}
                                onChange={setPassword}
                            />
                        </div>
                        <span style={{ color: 'red' }}>
                            {error ? error.toString() : ''}
                        </span>
                        <div className="login-center-buttons">
                            <CButton
                                className="button"
                                label={'Login'}
                                onClick={handleLogin}
                            />
                        </div>
                    </div>

                    <p className="login-bottom-p">
                        Don't have an account? <a href="#">Sign Up</a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Login;
