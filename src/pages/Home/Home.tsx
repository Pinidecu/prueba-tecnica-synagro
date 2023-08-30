import React from "react";
import Publicaciones from "../../components/Publicaciones/Publicaciones";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Publicaciones />
    </div>
  );
}

export default Home;
