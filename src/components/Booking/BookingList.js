import { Fragment, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import BookingOffCanvas from "./BookingOffCanvas";
import classes from "./BookingList.module.css";
import cardImage from "../../assets/card.jpg";

const BookingList = (props) => {
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const [bookingSerial, setBookingSerial] = useState("");

  function clickedLinkHandler(arg) {
    setBookingSerial(arg);
    setOffCanvasShow(true);
  }

  const closeOffCanvasHandler = () => {
    setOffCanvasShow(false);
  };

  return (
    <Fragment>
      <Container className={classes.bookingContainer}>
        <Row md={4} className="g-4">
          {props.bookings.map((booking, key) => (
            <Col key={key}>
              <Card>
                <Card.Img
                  variant="top"
                  src={cardImage}
                  className={classes.image}
                />
                <Card.Body>
                  <Card.Title>
                    <center>
                      <Button
                        variant="outline-dark"
                        onClick={() =>
                          clickedLinkHandler(booking.bookingSerial)
                        }
                      >
                        {booking.bookingSerial}
                      </Button>
                    </center>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <BookingOffCanvas
        show={offCanvasShow}
        bookingSerial={bookingSerial}
        onHide={closeOffCanvasHandler}
      />
    </Fragment>
  );
};

export default BookingList;
