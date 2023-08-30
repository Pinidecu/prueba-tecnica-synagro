import React, { useState } from "react";
import styles from "./Login.module.css";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../configuration/services/auth/AuthService";
import { usePostContext } from "../../contexts/PostContext";
import { getUserByAuth } from "../../api/users/usersAPI";

export default function Login() {
  const { setUser } = usePostContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<String>("");

  const [cargando, setCargando] = useState(false);

  const signIn = async () => {
    setCargando(true);
    setError("");
    const response = await AuthService.signIn(email, password);
    console.log("response", response);
    const err: any = response.err;
    if (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("La dirección de correo electrónico no es válida.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Las credenciales de inicio de sesión son incorrectas.");
          break;
        default:
          setError(
            "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
          );
          break;
      }
    } else {
      if (response.user) {
        const userDB = await getUserByAuth(response?.user?.uid);
        setUser(userDB); // Guarda el usuario en el contexto
        navigate("/");
      }
    }
    setCargando(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn();
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.imageLeft}></div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.deco1}></div>
          <div className={styles.deco2}></div>
          <div className={styles.deco3}></div>
          <div className={styles.deco4}></div>
          <img
            src="/LogoProvisorio.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logo}
          />
          <h1>Ingresar</h1>
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              type="email"
              name="mail"
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              // required
              className={styles.input}
              type="password"
              name="name"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.buttons}>
              {error && (
                <p style={{ color: "var(--error)", textAlign: "center" }}>
                  {error}
                </p>
              )}
              <div className="self-center">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "var(--primary-color)",
                  }}
                  type="submit"
                  disabled={!email || !password}
                >
                  {cargando ? (
                    <CircularProgress sx={{ color: "white" }} size={20} />
                  ) : (
                    "Ingresar"
                  )}
                </Button>
              </div>
            </div>
          </form>{" "}
          <div className="flex  items-center  text-xs">
            <p>No tienes cuenta?</p>
            <Link to="/registro">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--primary-color)",
                }}
              >
                Registrate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
