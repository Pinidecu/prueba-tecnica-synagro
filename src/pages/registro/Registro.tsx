import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Registro.module.css";
import { Button, CircularProgress } from "@mui/material";
import { AuthService } from "../../configuration/services/auth/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/users/usersAPI";

interface CreateUserInput {
  id?: number;
  mail: string;
  name: string;
  lastName: string;
  auth?: string;
}

export default function Registro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mail: "",
    name: "",
    lastName: "",
    contraseña: "",
    contraseña2: "",
  });

  const clearFormData = () => {
    setFormData({
      mail: "",
      name: "",
      lastName: "",
      contraseña: "",
      contraseña2: "",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [error, setError] = useState<string | null>(null);

  // Funcion para registrar un usuario en firebase
  const signUp = async () => {
    try {
      const resSignup = await AuthService.createUser(
        formData.mail,
        formData.contraseña
      );
      const err: any = resSignup.err;
      // Si hay error seteamos el error segun el codigo que devuelve firebase
      if (err) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("El correo electrónico ya está en uso por otro usuario.");
            break;
          case "auth/invalid-email":
            setError("La dirección de correo electrónico no es válida.");
            break;
          case "auth/weak-password":
            setError(
              "La contraseña es demasiado débil. Debe tener al menos 6 caracteres."
            );
            break;
          default:
            setError(
              "Ocurrió un error al crear la cuenta. Por favor, inténtalo de nuevo más tarde."
            );
            break;
        }
      } else {
        // Si no hay error creamos el usuario en nuestra base de datos
        const obj: CreateUserInput = {
          ...formData,
          auth: resSignup?.user?.uid,
        };
        try {
          const response = await createUser(obj);
          console.log("Usuario creado exitosamente:", response);
          navigate("/");
          clearFormData();
        } catch (error) {
          console.error("Error al crear el usuario:", error);
        }
      }
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.contraseña === formData.contraseña2) {
      setCargando(true);
      console.log("Formulario enviado:", formData);
      await signUp();
      setCargando(false);
    } else {
      setError("Las contraseñas no coinciden");
    }
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

          <h1>Formulario de registro</h1>
          <div className={styles.opciones}>
            <p>¿Ya tienes cuenta?</p>
            <Link to="/login">
              <Button
                variant="contained"
                style={{
                  backgroundColor: "var(--primary-color)",
                }}
              >
                Inicia sesión
              </Button>
            </Link>
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              required
              className={styles.input}
              type="email"
              name="mail"
              placeholder="Correo electrónico"
              value={formData.mail}
              onChange={handleChange}
            />
            <input
              required
              className={styles.input}
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              required
              className={styles.input}
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              required
              className={styles.input}
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
            />
            <input
              required
              className={styles.input}
              type="password"
              name="contraseña2"
              placeholder="Repita su contraseña"
              value={formData.contraseña2}
              onChange={handleChange}
            />

            <div className={styles.buttons}>
              {error && <p className={styles.error}>{error}</p>}
              <div className="self-center">
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "var(--primary-color)",
                  }}
                >
                  {cargando ? (
                    <CircularProgress sx={{ color: "white" }} size={20} />
                  ) : (
                    "Registrarse"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
