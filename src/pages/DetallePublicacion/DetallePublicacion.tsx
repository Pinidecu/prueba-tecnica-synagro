import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePostContext } from "../../contexts/PostContext";
import styles from "./DetallePublicacion.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { Modal, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NewPost from "../../components/NewPost/NewPost";
import { User, getUserById } from "../../api/users/usersAPI";

const DetallePublicacion: React.FC = () => {
  const navigate = useNavigate();

  const { idPublicacion } = useParams();

  const { postsDetails, clearPostDetails, getPostById, user, deletePost } =
    usePostContext();

  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    if (idPublicacion) {
      getPostById(parseInt(idPublicacion));
    }
    return () => {
      clearPostDetails();
    };
  }, [idPublicacion, editId]);

  const [newPostModal, setNewPostModal] = useState<boolean>(false);
  const handleCloseNewPostModal = () => {
    setNewPostModal(false);
    setEditId(null);
  };

  const handleDelete = async (postId: number | null) => {
    try {
      await deletePost(postId); // Llama a la función deletePost con el ID de la publicación
      navigate("/mis-publicaciones");
    } catch (error) {
      console.error("Error al borrar la publicación:", error);
    }
  };

  const [userAutor, setUserAutor] = useState<User | null>(null);

  const buscarAutor = async () => {
    if (postsDetails?.autor) {
      setUserAutor(await getUserById(postsDetails.autor));
    }
  };

  useEffect(() => {
    buscarAutor();
  }, []);

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
      <NavBar />
      {postsDetails ? (
        <div className={styles.post}>
          {user && user.id === postsDetails.autor && (
            <div className={styles.iconsContainer}>
              <Tooltip title="Editar" className={styles.iconButton}>
                <EditIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setNewPostModal(true);
                    setEditId(postsDetails.id);
                  }}
                />
              </Tooltip>
              <Tooltip title="Borrar" className={styles.iconButton}>
                <DeleteForeverIcon
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(postsDetails.id);
                  }}
                />
              </Tooltip>
            </div>
          )}
          <h2 className={styles.titulo}>{postsDetails.titulo}</h2>
          <p className={styles.autor}>
            Autor: {`${userAutor?.name} ${userAutor?.lastName}`}
          </p>
          <p className={styles.fecha}>Fecha: {postsDetails.fecha}</p>{" "}
          <p className={styles.resumen}>{postsDetails.resumen}</p>
        </div>
      ) : (
        <h3 className={styles.notFound}>Publicación no encontrada.</h3>
      )}
    </div>
  );
};

export default DetallePublicacion;
