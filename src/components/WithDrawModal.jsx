import React, { useState } from "react";
import { Button, Modal , Form} from "react-bootstrap";
import "./index.scss";

const WithDrawModal = (props) => {

    const [withDrawAmount, setWithDrawAmount] = useState(0);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const updateWithDrawAmount = () => {
        if(props.currentAmount <= 0){
            setErrorStatus(true);
            setErrorMessage('The account balance is insufficient!');
        }
        else {
            if(props.currentAmount < withDrawAmount){
                setErrorStatus(true);
                setErrorMessage('Please ensure that the withdrawal amount does not exceed the balance!');
            }else{
                props.withDrawHistory(withDrawAmount);
                props.handleClose();
                setWithDrawAmount(0);
            }
        }
    }

    const closePopup = () => {
        props.handleClose();
        setErrorStatus(false);
        setErrorMessage('');
    }

    return (
        <Modal show={props.show} onHide={closePopup}>
            <Modal.Header closeButton>
                <Modal.Title>With Draw Money</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="number"
                        id="input"
                        placeholder="Enter amount"
                        name="deposit-amount"
                        onChange={e => setWithDrawAmount(e.target.value )}
                        defaultValue={0}
                        className={errorStatus ? 'error' : ''}
                    />
                    {errorMessage && <p className="text-danger mt-1">{errorMessage}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closePopup}>
                    Close
                </Button>
                <Button variant="primary" onClick={updateWithDrawAmount}>
                    OK
                </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default WithDrawModal;