import { Modal, Button } from "react-bootstrap";

const SlotOptionModal = (props) => {
  const response = props.response;
  const slotValid = props.slotValid;

  console.log("SlotOptionModal");
  console.log(response);
  return (
    <Modal
      show={props.show}
      onHide={props.onCancel}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {slotValid ? "Slot Confirmation" : "Oops! Slot is not available"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {slotValid ? null : <h5>Change to this one?</h5>}
        <ul>
          Booking Date: <span>{response === null ? null : response.date}</span>
        </ul>
        <ul>
          Booking Time:{" "}
          <span>{response === null ? null : response.startTime}:00 to{" "}
          {response === null ? null : response.endTime}:00</span>
        </ul>
        <ul>Room: {response===null ? null : response.roomName}</ul>
        <ul>Amount: {response===null ? null : `€${parseFloat(response.amount).toFixed(2)}`}</ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onCancel}>
          {slotValid ? "Cancel" : "Find another one"}
        </Button>
        <Button onClick={props.onConfirmed}>
          {slotValid ? "Confirmed" : "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SlotOptionModal;
