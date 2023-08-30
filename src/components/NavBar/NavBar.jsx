import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import { useLocation } from "react-router-dom";
import Nav from "./Nav/Nav";
const imagenes = [
  { url: "postit.jpg", titulo: "Post its pegados." },
  { url: "note.jpg", titulo: "Post its de colores." },
  { url: "board.jpg", titulo: "Pizarron con fibrones." },
];

export default function NavBar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((indice + 1) % imagenes.length);
    }, 10000); // Cambiar cada 10 segundos

    return () => clearInterval(interval);
  }, [indice]);

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgb(255, 85, 85) , transparent 40%), url(/${imagenes[indice].url})`,
  };

  return (
    <>
      {location.pathname === "/" ? (
        <div className={styles.fpContainer} style={backgroundStyle}>
          <Nav
            home={location.pathname === "/"}
            setMenuOpen={setMenuOpen}
            menuOpen={menuOpen}
          />
          <div className={styles.titles}>
            <h1>Prueba SynAgro</h1>
            <p>{imagenes[indice].titulo}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <button
              className={`${styles.buttonImg} ${
                indice === 0 ? styles.buttonImgActive : ""
              }`}
              onClick={() => setIndice(0)}
            ></button>
            <button
              className={`${styles.buttonImg} ${
                indice === 1 ? styles.buttonImgActive : ""
              }`}
              onClick={() => setIndice(1)}
            ></button>
            <button
              className={`${styles.buttonImg} ${
                indice === 2 ? styles.buttonImgActive : ""
              }`}
              onClick={() => setIndice(2)}
            ></button>
          </div>
        </div>
      ) : (
        <Nav
          home={location.pathname === "/"}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
        />
      )}
    </>
  );
}
