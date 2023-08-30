import React, { useState } from "react";
import styles from "./Publicaciones.module.css";
import Publicacion from "../Publicacion/Publicacion";
import { Button, Modal } from "@mui/material";
import NewPost from "../NewPost/NewPost";
import { usePostContext } from "../../contexts/PostContext";

const Publicaciones: React.FC = () => {
  const { posts, clearPostDetails, user } = usePostContext(); // Usamos el contexto para obtener las publicaciones

  const [newPostModal, setNewPostModal] = useState<boolean>(false);
  const handleCloseNewPostModal = () => {
    setNewPostModal(false);
    setEditId(null);
    clearPostDetails();
  };

  const [editId, setEditId] = useState<number | null>(null);

  return (
    <div className={styles.container}>
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
      <div className={styles.titles}>
        <h1>Publicaciones</h1>
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
        {!posts.length && <p>No hay publicaciones.</p>}
        {posts.map((post) => (
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

export default Publicaciones;
