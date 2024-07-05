import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

function CarouselFadeExample({ slides }) {
  return (
    <Carousel fade>
      {slides.map((slide, i) => (
        <Carousel.Item key={i}>
          <img className="d-block w-100" src={slide.url} alt="slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFadeExample;
