import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
//import { ToastContainer } from 'react-toastify';
import { UserProvider } from './conf/useAuth';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
    return (
        <UserProvider>
            <Outlet />
            {/*<ToastContainer />*/}
        </UserProvider>
    );
}

export default App;
