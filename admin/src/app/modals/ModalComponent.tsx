import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";


const ModalComponent = ({children, show, onHide}) => {

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Please fill in the form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                    <button type="button">Close</button>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalComponent;