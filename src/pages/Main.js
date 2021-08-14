import { Carousel } from "react-bootstrap";
import compartment from "../assets/compartment.jpg";
import sMeeting from "../assets/sMeeting.jpg";
import mMeeting from "../assets/mMeeting.jpg";
import lMeeting from "../assets/lMeeting.jpg";
import main from "../assets/main.jpg";

function MainPage() {
  //  const {height , width} = useWindowDimensions();
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={main} alt="Main slide" />
        <Carousel.Caption>
          <h3>Book a Time?</h3>
          <p>Remote Office Booking System</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={compartment}
          alt="Compartment slide"
        />
        <Carousel.Caption>
          <h3>Compartment Room</h3>
          <p>€2 per Hour / €20 per Day</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sMeeting}
          // width="100%" height="100%"
          alt="Small room slide"
        />
        <Carousel.Caption>
          <h3>Small Meeting Room</h3>
          <p>€12 per Hour / €120 per Day</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={mMeeting} alt="Medium room slide" />
        <Carousel.Caption>
          <h3>Medium Meeting Room</h3>
          <p>€20 per Hour / €200 per Day</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={lMeeting} alt="Large room slide" />
        <Carousel.Caption>
          <h3>Large Meeting Room</h3>
          <p>€32 per Hour / €320 per Day</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainPage;
