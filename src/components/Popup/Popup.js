import { Button, Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { AppContext } from "../CurrencyConverter/CurrencyConverter";

export default function Popup(props) {
    const { showPopup, message, setMessage, setShowPopup } = useContext(AppContext)
    return (

        <Modal show={showPopup}>
            <Modal.Header closeButton onClick={() => {
                setMessage('')
                setShowPopup(false)
            }}>
                <Modal.Title className='justify-content-center'>
                    <div>Error</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => {
                    setMessage('')
                    setShowPopup(false)
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}