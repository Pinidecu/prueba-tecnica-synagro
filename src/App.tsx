import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import DetallePublicacion from "./pages/DetallePublicacion/DetallePublicacion";
import Registro from "./pages/registro/Registro";
import Login from "./pages/login/Login";
import MisPublicaciones from "./pages/MisPublicaciones/MisPublicaciones";
import { usePostContext } from "./contexts/PostContext";

function App() {
  const { user } = usePostContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/mis-publicaciones"
          element={user ? <MisPublicaciones /> : <Navigate to="/" />}
        />
        <Route
          path="/publicacion/:idPublicacion"
          element={<DetallePublicacion />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
