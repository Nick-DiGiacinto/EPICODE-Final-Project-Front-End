import React, { useEffect, useState } from "react";
// import MyCarousel from "../MyCarousel";
import { Col, Image, Row } from "react-bootstrap";
import styles from "./main.module.css";
import { Samples } from "../../sample/Samples";
import CarouselFadeExample from "../../carousel-test/Carousel";
import { useLocation, useNavigate } from "react-router-dom";
import { GiOldKing } from "react-icons/gi";
import MonsterHunter from "../../localImages/Monster Hunter World.jpg";
import ZeldaTODK  from  "../../localImages/Zelda Tears of the Kingdom.jpg";
import logoNextVerseHD from "../../localImages/Logo NextVerseGames FullHD.jpeg";

export const Main = () => {
  const slides = [
    {
      url:"https://cdn.mos.cms.futurecdn.net/FmipPBYeMJi5BorHCBVYPR.jpg",
      title:"Super Smash Bros Ultimate",
    },
    {
      url:"https://gamingbolt.com/wp-content/uploads/2023/12/Monster-Hunter-Wilds_02.jpg",
      title: "Monster Hunter: Wilds",
    },
    {
      url: "https://wallpaperaccess.com/full/3663099.jpg",
      title: "Xenoblade Chronicles 2",
    },
  ];

  const [navScroll, setNavScroll] = useState(0);
  const [prodotti, setProdotti] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // FETCH
  const recuperaProdotti = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/auth/vg");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProdotti(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  window.addEventListener("scroll", () =>
    window.scrollY >= 100 ? setNavScroll(window.scrollY) : setNavScroll(0)
  );

  useEffect(() => {
    recuperaProdotti();
    console.log(prodotti);
  }, []);

  useEffect(() => {
    console.log(navScroll);
  }, [navScroll]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  return (
    <div className={`${styles.body}`}>
      <div className={`${styles.carouselContainer}`}>
        <Image
          className={`${styles.banner}`}
          src={logoNextVerseHD}
        ></Image>
        { <CarouselFadeExample slides={slides} />}
      </div>
      {/* <div className={`${styles.carouselContainer}`}>
        <MyCarousel slides={slides} setCurrentSlide={setCurrentSlide} />
      </div> */}

      <Row className={`${styles.section2}`}>
        <h3 className="m-0" style={{color:'gold', textAlign:"center"}}>NextVerse Games: a universe of games from a reliable store!</h3>
 {/*        <Samples prodotti={prodotti} categoria={"RPG"} /> */}
        <Col className="text-center">
          <button
            className={`${styles.buttonToStore}`}
            onClick={() => navigate("/store")}
          >
            Enter the store
          </button>
        </Col>
      </Row>
      <div
        className={`${styles.startingPointImg} ${
          navScroll >= 800 && styles.sfondo1
        }`}
      >
        <img
          alt="alt"
          src="https://i.pinimg.com/originals/1b/81/bb/1b81bbca2e72beb48a1bb8459afb83c3.jpg"
        ></img>
      </div>

      { <div className={`${styles.overflow}`}>
        <Row>
          <Col
            xs={11}
            className={`${styles.startingPointImg} ${
              navScroll && styles.section1
            } `}
          >
            <Image
              src="https://images.hdqwalls.com/wallpapers/the-big-universe-is-here-4k-q4.jpg"
              fluid
            />
          </Col>
  {/*         <Col
            xs={8}
            className={`${styles.startingPointText} ${
              navScroll && styles.section1
            } `}
          >
            <div className={`${styles.payoff}`}>
              <p className="fs-1"></p>{" "}
              <p className="fs-3">
                Join now our community!
              </p>
            </div>
          </Col> */}
        </Row>
      </div> }
    </div>
  );
};
