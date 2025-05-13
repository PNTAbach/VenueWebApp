import React, { useState } from 'react';
import { AllUserVenueDTO } from '../../models/IUser';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Form, Button, Alert } from 'react-bootstrap';
import EditStaffModel from '../model/editStaffModel';
import '../../css/staffTable.css';
import UserVenueService from '../../services/userVenue.service';
import { Roles } from '../../models/IUserVenue';
import AddStaffModel from '../model/addStaffModel';

const StaffTable: React.FC<{
    userData: AllUserVenueDTO[];
    venueId: number;
    reRenderList: () => void;
}> = ({ userData, venueId, reRenderList }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<number>();
    const [model, setModel] = useState(false);
    const [modelAdd, setModelAdd] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlerVariant] = useState('');

    const ITEMSPERPAGE = 5;

    const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

    const showAlert = (message: string, variant: string): void => {
        setAlertMessage(message);
        setAlerVariant(variant);
        setTimeout(() => {
            setAlertMessage('');
        }, 1500);
    };

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredItems = userData
        .filter((user) => {
            const searchWords = searchTerm.toLowerCase().split(' ');

            return searchWords.every(
                (word) =>
                    user.fname?.toLowerCase().includes(word) ||
                    user.lname?.toLowerCase().includes(word) ||
                    user.email?.toLowerCase().includes(word) ||
                    user.phoneNumber?.toLowerCase().includes(word) ||
                    user.userId?.toString().includes(word)
            );
        })
        .sort((a, b) => {
            const userIdA = a.userId || 0;
            const userIdB = b.userId || 0;
            return userIdA - userIdB;
        });
    const indexOfLastItem = currentPage * ITEMSPERPAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const handleEditUser = (user: number): void => {
        setSelectedUser(user);
        setModel(true);
    };

    const handleClose = (): void => {
        setModel(false);
    };
    const handleCloseAdd = (): void => {
        setModelAdd(false);
    };

    const openAddUserModel = (): void => {
        setModelAdd(true);
    };
    const handleSave = (role: Roles | null): void => {
        const userVenueService = new UserVenueService();

        if (role === Roles.Staff) {
            userVenueService
                .setVenueStaff(selectedUser!, venueId)
                .then(() => {
                    showAlert('Staff assigned successfully 🚀', 'success');
                    reRenderList();
                })
                .catch((error) => {
                    console.error(error);
                    showAlert('User is already STAFF 😅', 'danger');
                });
            setModelAdd(false);
        } else if (role === Roles.Manager) {
            userVenueService
                .setVenueManager(selectedUser!, venueId)
                .then(() => {
                    showAlert('Manager assigned successfully 🚀', 'success');
                    reRenderList();
                })
                .catch((error) => {
                    console.error(error);
                    showAlert('User is already MANAGER 😅', 'danger');
                });
            setModelAdd(false);
        } else {
            userVenueService
                .removeVenueStaff(selectedUser!, venueId)
                .then(() => {
                    showAlert('Staff removed successfully 😓', 'success');
                    reRenderList();
                })
                .catch((error) => {
                    console.error(error);
                    showAlert('Error removing user 😅', 'danger');
                });
            setModelAdd(false);
        }

        setModel(false);
    };
    const handleAdd = (userId: number): void => {
        const userVenueService = new UserVenueService();

        userVenueService
            .addVenueStaff(userId, venueId)
            .then(() => {
                showAlert('Staff added successfully 🚀', 'success');
                reRenderList();
                setModelAdd(false);
            })
            .catch((error) => {
                console.error(error);
                showAlert('User is already part of a Venue 😅', 'danger');
                setModelAdd(false);
            });
    };
    return (
        <>
            {alertMessage && (
                <Alert
                    variant={alertVariant}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '40px',
                        fontWeight: 'bold',
                        padding: '10px',
                        fontSize: '16px',
                    }}
                >
                    {alertMessage}
                </Alert>
            )}
            <div className="compnentStaffTableP">
                <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex flex-column align-items-start">
                        <h2 className="mb-0">Staff List</h2>
                        <span>Number of employees: {userData.length}</span>
                    </div>

                    <div>
                        <Button
                            variant="success"
                            onClick={() => openAddUserModel()}
                        >
                            Add Staff
                        </Button>
                    </div>
                </div>
                <div className="d-flex align-items-center flex-grow-1">
                    <FontAwesomeIcon
                        icon={faSearch}
                        size="lg"
                        className="me-2 "
                    />
                    <Form.Group
                        controlId="searchBar"
                        className="ml-2 mb-0 flex-grow-1"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </div>

                {filteredItems.length === 0 ? (
                    <div className="py-5 text-center">No user found.</div>
                ) : (
                    <Table bordered hover responsive="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user, index) => (
                                <tr key={index}>
                                    <td
                                        className="text-center"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        {user.userId}
                                    </td>
                                    <td>{user.fname + ' ' + user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        {user.venueRole ===
                                        'VENUE_STAFF_ROLE' ? (
                                            <span
                                                style={{
                                                    color: 'orange',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Staff
                                            </span>
                                        ) : user.venueRole ===
                                          'VENUE_MANAGER_ROLE' ? (
                                            <span
                                                style={{
                                                    color: 'red',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Manager
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: 'orange',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Admin
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <FontAwesomeIcon
                                            icon={faPencil}
                                            onClick={() =>
                                                handleEditUser(user.userId!)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {filteredItems.length > ITEMSPERPAGE && (
                    <div className="d-flex justify-content-center">
                        <Pagination>
                            {Array.from(
                                {
                                    length: Math.ceil(
                                        filteredItems.length / ITEMSPERPAGE
                                    ),
                                },
                                (_, i) => (
                                    <Pagination.Item
                                        key={i}
                                        active={i + 1 === currentPage}
                                        onClick={() => paginate(i + 1)}
                                    >
                                        {i + 1}
                                    </Pagination.Item>
                                )
                            )}
                        </Pagination>
                    </div>
                )}
                <EditStaffModel
                    show={model}
                    handleClose={handleClose}
                    handleSave={handleSave}
                />
                <AddStaffModel
                    show={modelAdd}
                    handleClose={handleCloseAdd}
                    handleAdd={handleAdd}
                />
            </div>
        </>
    );
};

export default StaffTable;
