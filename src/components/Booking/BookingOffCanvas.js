import { Offcanvas } from "react-bootstrap";
import BookingInvoice from "./BookingInvoice";

const BookingOffCanvas = (props) => {
  const bookingSerial = props.bookingSerial;
  return (
    <Offcanvas show={props.show} onHide={props.onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Invoice {bookingSerial}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <BookingInvoice bookingSerial={bookingSerial} />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BookingOffCanvas;
