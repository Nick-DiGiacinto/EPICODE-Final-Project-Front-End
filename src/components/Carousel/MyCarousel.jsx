import { useEffect, useState } from "react";
import styles from "./carousel.module.css";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function MyCarousel({ slides, setCurrentSlide }) {
  const [slideIn, setSlideIn] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "700px",
    borderRadius: "20px",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${slides[currentIndex].url})`,
    boxShadow: "-4px 6px 9px 2px rgba(0, 0, 0, 0.99);",
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSlideIn(true);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSlideIn(true);
    console.log("slide in prima: ", slideIn);
  };

  useEffect(() => {
    setTimeout(() => {
      setSlideIn(false);
    }, 1100);
    console.log("slide in dopo: ", slideIn);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentSlide(currentIndex);
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={sliderStyles}>
      <MdNavigateBefore onClick={goToPrevious} className={`${styles.prev}`} />
      <MdNavigateNext onClick={goToNext} className={`${styles.next}`} />
      <div
        className={`${slideIn && styles.slideAnim}`}
        style={slideStyles}
      ></div>
      <div className={`${styles.bottom}`}>
        {slides.map((slide, i) => (
          <div
            onClick={() => goToSlide(i)}
            className={`${styles.bottomFiller} ${
              currentIndex === i && styles.bottomFillerCurrent
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default MyCarousel;
