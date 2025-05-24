/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bootstrap';
import '../../css/sidebar.css';
import { useAuth } from '../../conf/useAuth';
import { Button } from 'react-bootstrap';
import { UserDTO } from '../../models/IUser';
import UserService from '../../services/user.service';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
    navItems: { href: string; text: string; icon: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
    const [userData, setUserData] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
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
                    if (typeof data === 'object' && data !== null) {
                        setUserData(data);
                    } else {
                        console.error('Invalid user data:', data);
                    }
                } else {
                    throw new Error('Token not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
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
                <div>Loading...</div>
            ) : (
                <>
                    <NavLink
                        to="/overview"
                        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                    >
                        <svg className="bi me-2" width="40" height="32">
                            <use xlinkHref="#bootstrap" />
                        </svg>
                        <span className="fs-4">PNTA</span>
                    </NavLink>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        {navItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                        `nav-link text-white ${isActive ? 'active' : ''}`
                                    }
                                    end // <-- this forces absolute path match
                                >
                                    {item.icon && (
                                        <svg
                                            className="bi me-2"
                                            width="16"
                                            height="16"
                                        >
                                            <use xlinkHref={item.icon} />
                                        </svg>
                                    )}
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <hr />
                    <div className="dropdown">
                        <button
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle btn btn-dark"
                            id="dropdownUser1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://github.com/mdo.png"
                                alt="User avatar"
                                width="32"
                                height="32"
                                className="rounded-circle me-2"
                            />
                            <strong>
                                {userData
                                    ? `${userData.fname} ${userData.lname}`
                                    : 'Loading...'}
                            </strong>
                        </button>
                        <ul
                            className="dropdown-menu dropdown-menu-dark text-small shadow"
                            aria-labelledby="dropdownUser1"
                        >
                            <li>
                                <NavLink
                                    className="dropdown-item"
                                    to="/new-venue"
                                >
                                    New Venue...
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="dropdown-item"
                                    to="/settings"
                                >
                                    Settings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="dropdown-item"
                                    to="/profile"
                                >
                                    Profile
                                </NavLink>
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
