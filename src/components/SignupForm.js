import { useRef, useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import AuthContext from "../store/AuthContext";
import PopModal from "../components/modals/PopModal";
import classes from "./SignupForm.module.css";
import "react-phone-number-input/style.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function SignupForm() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [phoneValue, setPhoneValue] = useState(null);
  const [validated, setValidated] = useState(false);
  const [popModalShow, setPopModalShow] = useState(false);
  const [popModalTitle, setPopModalTitle] = useState("");
  const [popModalMessage, setPopModalMessage] = useState("");
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const closeModalButtonHandler = () => {
    setPopModalShow(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

//    fetch("http://localhost:8080/api/registration", {
      fetch("https://robs-backend.herokuapp.com/api/registration", {
          method: "POST",
          body: JSON.stringify({
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmail,
            password: enteredPassword,
            phone: phoneValue,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
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
            authCtx.login(data.token, data.id, data.firstName, data.role);
            history.replace("/");
          })
          .catch((errRes) => {
            const errSts = errRes.message.split("-")[0];
            const errMsg = errRes.message.split("-")[1];
            setPopModalShow(true);
            setPopModalTitle("Error - " + errSts);
            setPopModalMessage(errMsg);
          });
    }
  };

  return (
    <Fragment>
      <Container className={classes.container}>
        <Row>
          <Col md={3}></Col>
          <Col>
            <Form noValidate validated={validated} onSubmit={submitHandler}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="firstName">First Name *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter first name"
                      ref={firstNameInputRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your frist name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastName">Last Name *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter last name"
                      ref={lastNameInputRef}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your last name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="email">E-Mail Address *</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter e-mail address"
                  ref={emailInputRef}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter an email address
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Password *</Form.Label>
                <Form.Control
                  type="password"
                  required
                  minLength="8"
                  placeholder="Enter password"
                  aria-describedby="passwordHelper"
                  ref={passwordInputRef}
                />
                <Form.Text id="passwordHelper" muted>
                  Your password must be at least 8 characters.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please enter a password
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="phone">Phone Number</Form.Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phoneValue}
                      defaultCountry="IE"
                      onChange={setPhoneValue}
                      id="phone-input"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button
                    variant="dark"
                    type="submit"
                    className={classes.button}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
      <PopModal
        show={popModalShow}
        title={popModalTitle}
        message={popModalMessage}
        onClose={closeModalButtonHandler}
      />
    </Fragment>
  );
}

export default SignupForm;
