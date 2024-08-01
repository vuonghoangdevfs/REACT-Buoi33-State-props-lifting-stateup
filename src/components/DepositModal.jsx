import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const DepositModal = (props) => {
  const [depositNumber, setDepositNumber] = useState(0);
  const updateDeponsit = () => {
    props.depositHistory(depositNumber);
    props.handleClose();
    setDepositNumber(0);
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deposit Money</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="number"
            id="input"
            placeholder="Enter amount"
            name="deposit-amount"
            onChange={(e) => setDepositNumber(e.target.value)}
            defaultValue={0}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateDeponsit}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepositModal;
