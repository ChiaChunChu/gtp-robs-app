import { Container } from "react-bootstrap";
import classes from "./CustomersInfo.module.css";

const CustomersInfo=()=>{
  return (
    <Container className={classes.container}>
    <h5 className={classes.h5}>Customers Info</h5>    
    <h5 className={classes.h5}>Not supprt yet</h5>
</Container>
  );
}

export default CustomersInfo;