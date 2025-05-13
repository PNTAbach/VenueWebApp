/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Roles } from '../../models/IUserVenue';
interface EditStaffModelProps {
    show: boolean;
    handleClose: () => void;
    handleSave: (role: Roles | null) => void;
}

const EditStaffModel: React.FC<EditStaffModelProps> = ({
    show,
    handleClose,
    handleSave,
}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning"
                        onClick={() => handleSave(Roles.Staff)}
                    >
                        Update to Staff
                    </Button>
                    <Button
                        variant="warning"
                        onClick={() => handleSave(Roles.Manager)}
                    >
                        Update to Manager
                    </Button>
                    <Button variant="danger" onClick={() => handleSave(null)}>
                        Remove User
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditStaffModel;
