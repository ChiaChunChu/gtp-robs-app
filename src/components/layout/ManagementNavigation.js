import { Container, Nav } from "react-bootstrap";
import classes from "./ManagementNavigation.module.css";

const ManagementNavigation = () => {
  return (
    <Container className={classes.container}>
      <Nav variant="tabs" defaultActiveKey="/management/customers-info">
        <Nav.Item>
          <Nav.Link href="/management/customers-info">Customers Info</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/management/all-bookings">All Bookings</Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};

export default ManagementNavigation;
