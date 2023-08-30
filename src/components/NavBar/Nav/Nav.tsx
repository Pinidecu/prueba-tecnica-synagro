import React from "react";
import styles from "./Nav.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Tooltip } from "@mui/material";
import { usePostContext } from "../../../contexts/PostContext";
import { Link } from "react-router-dom";

interface NavProps {
  home: boolean;
  user: number | null;
  menuOpen: React.SetStateAction<boolean>;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: React.FC<NavProps> = ({ menuOpen, setMenuOpen, home }) => {
  const { signOut, user } = usePostContext();

  return (
    <div className={home ? styles.nav : styles.nav1}>
      <img
        src="/LogoProvisorio.png"
        alt="Logo"
        width={50}
        height={50}
        className={styles.logo}
      />
      <div className={styles.links}>
        <Link to="/">Home</Link>
        {user && <Link to="/mis-publicaciones">Mis publicaciones</Link>}
      </div>
      <div className={styles.rigthContainer}>
        <img
          src="/LogoProvisorio.png"
          alt="Logo"
          width={50}
          height={50}
          className={styles.logoMobile}
        />

        <div className={styles.buttonsContainer}>
          {user && (
            <div className={styles.buttonsContainer}>
              <p>{`${user.name} ${user.lastName}`}</p>
              <Tooltip title="Cerrar sesión">
                <Link
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  to="/"
                  className={`${styles.link} ${styles.linkError}`}
                >
                  <LogoutIcon sx={{ color: "white" }} />
                </Link>
              </Tooltip>
            </div>
          )}
          {!user && (
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
          )}
          {!user && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
