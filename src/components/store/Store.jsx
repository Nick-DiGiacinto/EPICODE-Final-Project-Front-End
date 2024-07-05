import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { PacmanLoader } from "react-spinners";
import styles from "./store.module.css";

import { Prova } from "../prova/Prova";
import { Chip } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Store = () => {
  // HOOKS
  const [search, setSearch] = useState("");
  const [prodotti, setProdotti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [hovered, setHovered] = useState(0);
  const location = useLocation();
  const libreria = useSelector((state) => state?.libraryReducer?.library);

  const token = useSelector(
    (state) => state?.authReducer?.bearerToken?.accessToken
  );

  // const dispatch = useDispatch();

  // FETCH
  const recuperaProdotti = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/auth/vg");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProdotti(data);
        setFiltered(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT
  useEffect(() => {
    console.log(libreria);
    if (prodotti.length === 0) {
      recuperaProdotti();
      setInterval(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  //CATEGORIE
  const categorie = prodotti.map((cat) => cat?.categoria);
  const categorieFiltrate = [...new Set(categorie)];

  //HANDLE CLICK CATEGORIE
  const handleClick = (cat) => {
    setSearch("");
    if (cat !== "TUTTI") {
      setFiltered(prodotti?.filter((element) => element.categoria === cat));
    } else {
      setFiltered(prodotti);
    }
    console.log("Chip cliccata: ", filtered);
  };

  return (
    <div className={`${styles.body}  ${isLoading && styles.loading}`}>
      <Col className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <h2 className="mt-4 ms-1">Our best games</h2>
        <Form className="mt-4">
          <Form.Control
            onChange={(e) => (setSearch(e.target.value), setFiltered(false))}
            value={search}
            type="text"
            placeholder="Search a videogame"
          />
        </Form>
      </Col>
      <div>
        {categorieFiltrate.map((cat, i) => (
          <Chip
            key={i}
            label={cat}
            variant="outlined"
            onClick={() => handleClick(cat)}
            style={{ margin: "30px 15px 10px", padding: "2px 15px" }}
          />
        ))}
        <Chip
          label="TUTTI"
          variant="outlined"
          onClick={() => handleClick("TUTTI")}
          style={{ margin: "30px 15px 10px", padding: "2px 15px" }}
        />
      </div>
      <div>
        <Row>
          {isLoading && (
            <div className={`${styles.pacman}`}>
              <PacmanLoader color="#FFE900" />
            </div>
          )}
          {!search &&
            !filtered &&
            prodotti?.map((p, i) => (
              <>
                <Prova
                  key={i}
                  videogioco={p}
                  selected={selected}
                  setSelected={setSelected}
                  setHovered={setHovered}
                  hovered={hovered}
                ></Prova>
              </>
            ))}
          {search &&
            !filtered &&
            prodotti
              .filter((videogioco) =>
                videogioco.titolo
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
              .map((p, i) => (
                <>
                  <Prova
                    key={i}
                    videogioco={p}
                    selected={selected}
                    setSelected={setSelected}
                    setHovered={setHovered}
                    hovered={hovered}
                  ></Prova>
                </>
              ))}
          {filtered &&
            filtered.map((p, i) => (
              <>
                <Prova
                  key={i}
                  videogioco={p}
                  selected={selected}
                  setSelected={setSelected}
                  setHovered={setHovered}
                  hovered={hovered}
                ></Prova>
              </>
            ))}
        </Row>
      </div>
    </div>
  );
};
