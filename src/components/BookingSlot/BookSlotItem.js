import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import BookSlotContext from "../../store/BookSlotContext";
import classes from "./BookSlotItem.module.css";

const BookSlotItem = (props) => {
  const bookSlotCtx = useContext(BookSlotContext);
  const amount = `€${parseFloat(props.slot.amount).toFixed(2)}`;

  const removeSlotHandler = (event) => {
    console.log("removeSlotHandler");
    bookSlotCtx.removeSlot(props.slot.slotId);
  };

  return (
    <Card className={classes.card}>
      <Card.Header>Slot: {props.slot.slotId}</Card.Header>
      <Card.Body>
        <Card.Title>{props.slot.roomName}</Card.Title>
        <Card.Text>Booking Date: {props.slot.date}</Card.Text>
        <Card.Text>
          Booking Time: {props.slot.startTime}:00 to {props.slot.endTime}:00
        </Card.Text>
        <Card.Text>Amount: {amount}</Card.Text>
        <Button variant="outline-dark" onClick={removeSlotHandler}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookSlotItem;
