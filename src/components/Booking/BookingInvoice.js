import { useState, useEffect, useContext, Fragment } from "react";
import { Spinner, Container, Card } from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import PopModal from "../modals/PopModal";
import { convertDateString } from "../../utils/DateUtils";
import classes from "./BookingInvoice.module.css";

const BookingInvoice = (props) => {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const bookingSerial = props.bookingSerial;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState(true);
  const [popModalShow, setPopModalShow] = useState(false);
  const [popModalTitle, setPopModalTitle] = useState("");
  const [popModalMessage, setPopModalMessage] = useState("");
  const [errStsCode, setErrStsCode] = useState(0);

  const closeModalButtonHandler = () => {
    setPopModalShow(false);
    if (errStsCode === 401) {
      //unauthorized 401
      setErrStsCode(0);
      authCtx.logout();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    apiCallGetBookingInvoice();
  }, []);

  function apiCallGetBookingInvoice() {
//    fetch("http://localhost:8080/api/booking/" + bookingSerial + "/invoice", {
    fetch("https://robs-backend.herokuapp.com/api/booking/" + bookingSerial + "/invoice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setErrStsCode(res.status);
        if (res.ok) {
          return res.json();
        } else {
          setLoadedData(null);
          let errRes = res.status + "-";
          return res.json().then((data) => {
            let errorMessage = "Request failed!";
            if (data && data.error && data.message) {
              errorMessage = data.message;
            }
            errRes += errorMessage;
            throw new Error(errRes);
          });
        }
      })
      .then((data) => {
        setLoadedData(data);
        setIsLoading(false);
      })
      .catch((errRes) => {
        const errSts = errRes.message.split("-")[0];
        const errMsg = errRes.message.split("-")[1];
        setPopModalShow(true);
        setPopModalTitle("Error - " + errSts);
        setPopModalMessage(errMsg);
      });
  }

  if (isLoading && popModalShow === false) {
    return (
      <div className={classes.loader}>
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  function roomPrice(slot) {
    if (loadedData === null) {
      return null;
    } else {
      if (slot.timeOffset === 12) {
        // means a day
        return (
          <div>
            <Card.Text>
              Room Price per Day:{" "}
              {`€${parseFloat(slot.room.pricePerDay).toFixed(2)}`}
            </Card.Text>
            <Card.Text>
              Amount: {`€${parseFloat(slot.room.pricePerDay).toFixed(2)}`}
            </Card.Text>
          </div>
        );
      } else {
        return (
          <div>
            <Card.Text>
              Room Price per Hour:{" "}
              {`€${parseFloat(slot.room.pricePerHour).toFixed(2)}`}
            </Card.Text>
            <Card.Text>
              Amount:{" "}
              {`€${parseFloat(slot.timeOffset * slot.room.pricePerHour).toFixed(
                2
              )}`}
            </Card.Text>
          </div>
        );
      }
    }
  }

  return (
    <Fragment>
      <Container>
        <p>
          Name:{" "}
          {loadedData === null
            ? null
            : loadedData.firstName + " " + loadedData.lastName}
        </p>
        <p>Email: {loadedData === null ? null : loadedData.email}</p>
        <p>
          Total Amount:{" "}
          {loadedData === null
            ? null
            : `€${parseFloat(loadedData.totalAmount).toFixed(2)}`}
        </p>
        <p>Booking Slots:</p>
        {loadedData === null
          ? null
          : loadedData.bookingSlots.map((slot, key) => {
              const date = convertDateString(slot.date);
              return (
                <Card key={key} className={classes.card}>
                  <Card.Header>Slot Number {key + 1}</Card.Header>
                  <Card.Body>
                    <Card.Subtitle className={classes.cardSubtitle}>
                      {slot.roomName}
                    </Card.Subtitle>
                    <Card.Text>Booking Date: {date}</Card.Text>
                    <Card.Text>
                      Booking Time: {slot.startTime}:00 -{" "}
                      {slot.startTime + slot.timeOffset}:00
                    </Card.Text>
                    <Card.Text>Time Duration: {slot.timeOffset} hr</Card.Text>
                    {roomPrice(slot)}
                  </Card.Body>
                </Card>
              );
            })}
      </Container>
      <PopModal
        show={popModalShow}
        title={popModalTitle}
        message={popModalMessage}
        onClose={closeModalButtonHandler}
      />
    </Fragment>
  );
};

export default BookingInvoice;
