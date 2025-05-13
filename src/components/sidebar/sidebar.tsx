/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bootstrap'; // Import Bootstrap JavaScript
import '../../css/sidebar.css';
import { useAuth } from '../../conf/useAuth';
import { Button } from 'react-bootstrap';
import { UserDTO } from '../../models/IUser';
import UserService from '../../services/user.service';

interface SidebarProps {
    navItems: { href: string; text: string; icon: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
    const [userData, setUserData] = useState<UserDTO | null>(null); // Initialize user data as null
    const [loading, setLoading] = useState<boolean>(true); // Initialize loading state as true

    const { logout } = useAuth();
    const handleLogout = (): void => {
        logout();
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (localStorage.getItem('token')) {
                    const userService = new UserService();
                    const data = await userService.getUserByToken();
                    // Check if data is a UserDTO
                    if (typeof data === 'object' && data !== null) {
                        setUserData(data);
                        console.log(data.fname);
                    } else {
                        console.error('Invalid user data:', data);
                    }
                } else {
                    throw new Error('Token not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Update loading state after fetching data
            }
        };

        fetchUserData();
    }, []);

    return (
        <nav
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar-full-height"
            style={{
                width: '250px',
                position: 'fixed',
                top: '0',
                left: '0',
                height: '100%',
                overflowY: 'auto',
                zIndex: 1000,
            }}
        >
            {loading ? (
                // Render loading state if data is being fetched
                <div>Loading...</div>
            ) : (
                <>
                    <a
                        href="/g"
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                    >
                        <svg className="bi me-2" width="40" height="32">
                            <use xlinkHref="#bootstrap" />
                        </svg>
                        <span className="fs-4">PNTA</span>
                    </a>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        {navItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <a
                                    href={item.href}
                                    className="nav-link text-white"
                                    aria-current="page"
                                >
                                    <svg
                                        className="bi me-2"
                                        width="16"
                                        height="16"
                                    >
                                        <use xlinkHref={item.icon} />
                                    </svg>
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <hr />
                    <div className="dropdown">
                        <a
                            href="/g"
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                            id="dropdownUser1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://github.com/mdo.png"
                                alt=""
                                width="32"
                                height="32"
                                className="rounded-circle me-2"
                            />
                            <strong>
                                {userData
                                    ? `${userData.fname} ${userData.lname}`
                                    : 'Loading...'}
                            </strong>{' '}
                            {/* Render user name or "Loading..." */}
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-dark text-small shadow"
                            aria-labelledby="dropdownUser1"
                        >
                            <li>
                                <a className="dropdown-item" href="/g">
                                    New Venue...
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/g">
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="/g">
                                    Profile
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Button
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </Button>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Sidebar;
