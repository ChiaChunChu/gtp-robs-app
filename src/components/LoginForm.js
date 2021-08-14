import { useState, useRef, useContext, Fragment } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import PopModal from "../components/modals/PopModal";
import classes from "./LoginForm.module.css";

function LoginForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [popModalShow, setPopModalShow] = useState(false);
  const [popModalTitle, setPopModalTitle] = useState("");
  const [popModalMessage, setPopModalMessage] = useState("");

  const closeModalButtonHandler = () => {
    setPopModalShow(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitHandler");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

//    fetch("http://localhost:8080/api/user/login", {
    fetch("https://robs-backend.herokuapp.com/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
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
  };

  return (
    <Fragment>
      <Container className={classes.container}>
        <Row>
          <Col md="3"></Col>
          <Col>
            <Form className={classes.form} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>E-Mail Address</Form.Label>
                <Form.Control
                  type="email"
                  required
                  placeholder="Enter email"
                  ref={emailInputRef}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  minLength="8"
                  required
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </Form.Group>
              <Button variant="dark" type="submit">
                Submit
              </Button>
              <Link to="/signup" className={classes.link}>
                Haven't got an account?
              </Link>
            </Form>
          </Col>
          <Col md="3"></Col>
        </Row>
        <PopModal
          show={popModalShow}
          title={popModalTitle}
          message={popModalMessage}
          onClose={closeModalButtonHandler}
        />
      </Container>
    </Fragment>
  );
}

export default LoginForm;
