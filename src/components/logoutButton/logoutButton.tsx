import React from 'react';
import CButton from '../button/button';
import { useAuth } from '../../conf/useAuth';

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    const handleLogin = (): void => {
        logout();
    };
    return <CButton label="Logout" onClick={handleLogin} />;
};

export default LogoutButton;
