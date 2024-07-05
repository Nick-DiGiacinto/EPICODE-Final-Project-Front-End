import React from "react";
import Navbar from "../navbar/Navbar";
import styles from "./home.module.css";
import { Route, Routes } from "react-router-dom";
import { Main } from "../Carousel/main/Main";
import RegisterPage from "../registerPage/RegisterPage";
import { Login } from "../loginPage/Login";
import { Store } from "../store/Store";
import { SingleProduct } from "../singleProduct/SingleProduct";
import { Checkout } from "../checkout/Checkout";
import { Libreria } from "../libreria/Libreria";
import NotFoundPage from "../not found page/NotFoundPage";
import ProfilePage from "../profilePage/ProfilePage";
import Footer from "../footer/Footer";

const Home = () => {
  return (
    <div className={`${styles.body}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/store/:id" element={<SingleProduct />}></Route>
        <Route path="/checkout/:id" element={<Checkout />}></Route>
        <Route path="/library/:id" element={<Libreria />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Home;
