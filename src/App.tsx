import React, { JSX } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { UserProvider } from './conf/useAuth';
import Sidebar from '../src/components/sidebar/sidebar'; // Adjust path as needed

function App(): JSX.Element {
    const location = useLocation();
    const hideSidebar = location.pathname === '/login';

    const navItems = [
        { href: '/overview', text: 'Overview', icon: '#overview-icon' },
        { href: '/editVenue', text: 'Edit Venue', icon: '#edit-icon' },
        { href: '/events', text: 'Events', icon: '#calendar-icon' },
        // Add more pages here as needed
    ];

    return (
        <UserProvider>
            <div className="app-layout">
                {!hideSidebar && <Sidebar navItems={navItems} />}

                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </UserProvider>
    );
}

export default App;
