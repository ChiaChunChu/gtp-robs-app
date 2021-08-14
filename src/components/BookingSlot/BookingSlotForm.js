import { useState, useContext, Fragment } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import BookSlotContext from "../../store/BookSlotContext";
import BookSlotList from "./BookSlotList";
import BookSlotShowAmount from "./BookSlotShowAmount";
import SlotOptionModal from "../modals/SlotOptionModal";
import PopModal from "../modals/PopModal";
import { disableDate, convertDateString } from "../../utils/DateUtils";
import { timeTable } from "../../utils/TimeTable";
import classes from "./BookingSlotForm.module.css";

const BookingSlotForm = () => {
  const authCtx = useContext(AuthContext);
  const bookSlotCtx = useContext(BookSlotContext);
  const [data, setData] = useState(null);
  const [slotValid, setSlotValid] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [roomSelet, setRoomSelect] = useState(0);
  const [slotOptionModalShow, setSlotOptionModalShow] = useState(false);
  const [popModalShow, setPopModalShow] = useState(false);
  const [popModalTitle, setPopModalTitle] = useState("");
  const [popModalMessage, setPopModalMessage] = useState("");
  const [errStsCode, setErrStsCode] = useState(0);

  // User information
  const token = authCtx.token;
  const userId = authCtx.userId;

  // booking time handling
  const timeOffset = endTime - startTime;
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  maxDate.setMonth(minDate.getMonth() + 6);

  let slotListContent;
  if (bookSlotCtx.totalSlots === 0) {
    slotListContent = <p>No slot has been added</p>;
  } else {
    slotListContent = <BookSlotList slots={bookSlotCtx.slotList} />;
  }

  let slotSubmitButton;
  if (
    startDate === null ||
    startDate.value === null ||
    startTime === 0 ||
    endTime === 0 ||
    roomSelet === 0
  ) {
    slotSubmitButton = true;
  }

  const confirmedModalButtonHandler = () => {
    console.log("confirmedButtonHandler");
    console.log(data);

    bookSlotCtx.addSlot(data);
    setSlotOptionModalShow(false);
  };
  const cancelModalButtonHandler = () => {
    setSlotOptionModalShow(false);
  };

  const closeModalButtonHandler = () => {
    setPopModalShow(false);
    console.log(errStsCode);
    if (errStsCode === 401) {
      //unauthorized 401
      setErrStsCode(0);
      bookSlotCtx.cleanAllSlot();
      authCtx.logout();
    }
  };

  const SlotFormHandler = (event) => {
    event.preventDefault();
    const date = startDate.value.toLocaleDateString().replaceAll("/", "-");

//    fetch("http://localhost:8080/api/booking/slotsrequest", {
    fetch("https://robs-backend.herokuapp.com/api/booking/slotsrequest", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        startTime: startTime,
        timeOffset: timeOffset,
        roomType: roomSelet,
      }),
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
        const resData = {
          date: convertDateString(data.bookingSlot.date),
          startTime: data.bookingSlot.startTime,
          endTime: data.bookingSlot.startTime + data.bookingSlot.timeOffset,
          roomName: data.bookingSlot.roomName,
          amount: data.amount,
        };
        setSlotValid(data.slotValid);
        setData(resData);
        setSlotOptionModalShow(true);
      })
      .catch((errRes) => {
        const errSts = errRes.message.split("-")[0];
        const errMsg = errRes.message.split("-")[1];
        setPopModalShow(true);
        setPopModalTitle("Error - " + errSts);
        setPopModalMessage(errMsg);
      });
  };

  const submitBookingHandler = (event) => {
    event.preventDefault();
    bookSlotCtx.slotList.map((slot, key) => console.log(slot));
    let requestSlots = [];
    bookSlotCtx.slotList.map((slot, key) => {
      const reqSlot = {
        date: slot.date,
        startTime: slot.startTime,
        timeOffset: slot.endTime - slot.startTime,
        roomName: slot.roomName,
      };
      requestSlots[key] = reqSlot;
      return requestSlots;
    });

    fetch("http://localhost:8080/api/booking/" + userId + "/add", {
      method: "POST",
      body: JSON.stringify(requestSlots),
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
        setPopModalShow(true);
        setPopModalTitle("Booking Succeed");
        setPopModalMessage(
          "Your booking serial number is " + data.bookingSerial
        );
        bookSlotCtx.cleanAllSlot();
      })
      .catch((errRes) => {
        const errSts = errRes.message.split("-")[0];
        const errMsg = errRes.message.split("-")[1];
        setPopModalShow(true);
        setPopModalTitle("Error - " + errSts);
        setPopModalMessage(errMsg);
      });
  };
  return (
    <Fragment>
      <Container className={classes.pickerContainer}>
        <Row>
          <Col md={5}>
            <Form className={classes.col} onSubmit={SlotFormHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Choose a Time Slot</Form.Label>
                <DatePickerComponent
                  id="datepicker"
                  onChange={(date) => setStartDate(date)}
                  min={minDate}
                  max={maxDate}
                  placeholder="Select a date"
                  format="dd-MMM-yyyy"
                  openOnFocus={true}
                  renderDayCell={disableDate}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="Start from"
                    >
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setStartTime(parseInt(e.target.value))}
                      >
                        <option value="0">Select Start Time</option>
                        {timeTable.map(
                          (item, key) =>
                            item.value < 19 && (
                              <option value={item.value} key={key}>
                                {item.time}
                              </option>
                            )
                        )}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="End to"
                    >
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setEndTime(parseInt(e.target.value))}
                      >
                        <option value="0">Select End Time</option>
                        {timeTable.map(
                          (item, key) =>
                            item.value > 7 &&
                            item.value > startTime && (
                              <option value={item.value} key={key}>
                                {item.time}
                              </option>
                            )
                        )}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Choose a type of room</Form.Label>
                <Row>
                  {/* <Col md={2}></Col> */}
                  <Col>
                    <Form.Check
                      type="radio"
                      label="Compartment Room"
                      name="rooms"
                      value="Compartment Room"
                      onChange={(e) => setRoomSelect(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Small Meeting Room"
                      name="rooms"
                      value="Small Meeting Room"
                      onChange={(e) => setRoomSelect(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Check
                      type="radio"
                      label="Medium Meeting Room"
                      name="rooms"
                      value="Medium Meeting Room"
                      onChange={(e) => setRoomSelect(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Large Meeting Room"
                      name="rooms"
                      value="Large Meeting Room"
                      onChange={(e) => setRoomSelect(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button
                type="submit"
                variant="outline-dark"
                disabled={slotSubmitButton}
              >
                Submit Slot
              </Button>
            </Form>
          </Col>
          <Col className={classes.col}>
            {slotListContent}
            <hr />
            <BookSlotShowAmount />
            <Button
              type="submit"
              variant="outline-dark"
              disabled={bookSlotCtx.totalSlots === 0}
              className={classes.Button}
              onClick={submitBookingHandler}
            >
              Submit Booking
            </Button>
          </Col>
        </Row>
      </Container>
      <SlotOptionModal
        show={slotOptionModalShow}
        response={data}
        slotValid={slotValid}
        onConfirmed={confirmedModalButtonHandler}
        onCancel={cancelModalButtonHandler}
      />
      <PopModal
        show={popModalShow}
        title={popModalTitle}
        message={popModalMessage}
        onClose={closeModalButtonHandler}
      />
    </Fragment>
  );
};

export default BookingSlotForm;
