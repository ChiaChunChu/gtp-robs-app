import { Container } from "react-bootstrap";
import classes from "./AllBookings.module.css";

const AllBookings = () => {
  return (
    <Container className={classes.container}>
      <h5 className={classes.h5}>All Bookings</h5>
      <h5 className={classes.h5}>Not supprt yet</h5>
    </Container>
  );
};

export default AllBookings;
