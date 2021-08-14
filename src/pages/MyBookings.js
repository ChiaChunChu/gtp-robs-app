import { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import BookingList from "../components/Booking/BookingList";
import AuthContext from "../store/AuthContext";
import PopModal from "../components/modals/PopModal";
import classes from "./MyBookings.module.css";

function MyBookingsPage() {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  const token = authCtx.token;
  const [isLoading, setIsLoading] = useState(true);
  const [loadedBookings, setLoadedBookings] = useState([]);
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

  function apiCallGetUserBookings() {
//    fetch("http://localhost:8080/api/booking/" + userId, {
    fetch("https://robs-backend.herokuapp.com/api/booking/" + userId, {
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
        setIsLoading(false);
        setLoadedBookings(data);
      })
      .catch((errRes) => {
        const errSts = errRes.message.split("-")[0];
        const errMsg = errRes.message.split("-")[1];
        setPopModalShow(true);
        setPopModalTitle("Error - " + errSts);
        setPopModalMessage(errMsg);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    apiCallGetUserBookings();
  }, []);

  if (isLoading && popModalShow === false) {
    return (
      <div className={classes.loader}>
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }
  
  let bookingContent;
  if (loadedBookings.length !== 0) {
    bookingContent = <BookingList bookings={loadedBookings} />;
  } else {
    if (popModalShow === false) {
      bookingContent = (
        <p className={classes.text}>
          You got no booking yet. <Link to="/new-booking">Book a time?</Link>
        </p>
      );
    }
  }

  return (
    <Fragment>
      <Container>{bookingContent}</Container>
      <PopModal
        show={popModalShow}
        title={popModalTitle}
        message={popModalMessage}
        onClose={closeModalButtonHandler}
      />
    </Fragment>
  );
}

export default MyBookingsPage;
