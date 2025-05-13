/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface AddStaffModelProps {
    show: boolean;
    handleClose: () => void;
    handleAdd: (userId: number) => void;
}

const AddStaffModel: React.FC<AddStaffModelProps> = ({
    show,
    handleClose,
    handleAdd,
}) => {
    const [userId, setUserId] = useState('');
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="userName">User ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    {/* Add more input fields as needed */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => handleAdd(parseInt(userId))}
                    >
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddStaffModel;
