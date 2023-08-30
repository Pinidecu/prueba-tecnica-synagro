import React, { useState } from "react";
import styles from "./MisPublicaciones.module.css";
import Publicacion from "../../components/Publicacion/Publicacion";
import { Button, Modal } from "@mui/material";
import NewPost from "../../components/NewPost/NewPost";
import { usePostContext } from "../../contexts/PostContext";
import NavBar from "../../components/NavBar/NavBar";

const MisPublicaciones: React.FC = () => {
  const { misPosts, clearPostDetails, user } = usePostContext(); // Usamos el contexto para obtener las publicaciones del usuario

  const [newPostModal, setNewPostModal] = useState<boolean>(false);
  const handleCloseNewPostModal = () => {
    setNewPostModal(false);
    setEditId(null);
    clearPostDetails();
  };

  const [editId, setEditId] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        open={newPostModal}
        onClose={handleCloseNewPostModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: "#000000b8",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        <div className={styles.modalNewPost}>
          <NewPost
            handleCloseNewPostModal={handleCloseNewPostModal}
            editId={editId}
          />
        </div>
      </Modal>
      <div className={styles.titulos}>
        <h1>Mis publicaciones </h1>
        {user && (
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
            onClick={() => setNewPostModal(true)}
          >
            Nueva publicación
          </Button>
        )}
      </div>
      <div className={styles.publicaciones}>
        {" "}
        {!misPosts.length && <p>Todavia no tienes publicaciones.</p>}
        {misPosts.map((post) => (
          <Publicacion
            key={post.id}
            id={post.id}
            titulo={post.titulo}
            autor={post.autor}
            resumen={post.resumen}
            setNewPostModal={setNewPostModal}
            setEditId={setEditId}
          />
        ))}
      </div>
    </div>
  );
};

export default MisPublicaciones;
