import { useContext, useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import classes from "./MyProfile.module.css";

function MyProfilePage() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedData, setLoadedData] = useState(true);
  const userId = authCtx.userId;
  const token = authCtx.token;

  useEffect(() => {
    setIsLoading(true);
    apiCallGetUserProfile();
  }, []);

  function apiCallGetUserProfile() {
//    fetch("http://localhost:8080/api/user/" + userId + "/info", {
    fetch("https://robs-backend.herokuapp.com/api/user/" + userId + "/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.message) {
              errorMessage = data.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("debug--data");
        console.log(data);
        setLoadedData(data);
        setIsLoading(false);
      })
      .catch((errMsg) => {
        console.log("debug--error");
        console.log(errMsg);
      });
  }

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <Spinner animation="border" variant="secondary" />
      </div>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col className={classes.profile}>
          <Row>
            <Col md={3}>
              <p className={classes.colLeft}>Name: </p>
            </Col>
            <Col>
              <p>
                {" "}
                {loadedData.firstName} {loadedData.lastName}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p className={classes.colLeft}>Email: </p>
            </Col>
            <Col>
              <p>
                {" "}
                {loadedData.email}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p className={classes.colLeft}>Phone: </p>
            </Col>
            <Col>
              <p>
                {" "}
                {loadedData.phone}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <p className={classes.colLeft}>Role: </p>
            </Col>
            <Col>
              <p>
                {" "}
                {loadedData.role}
              </p>
            </Col>
          </Row>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default MyProfilePage;
