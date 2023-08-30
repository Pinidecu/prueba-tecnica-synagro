import React, { useEffect, useState } from "react";
import styles from "./Publicacion.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { usePostContext } from "../../contexts/PostContext";
import { User, getUserById } from "../../api/users/usersAPI";

interface PublicacionProps {
  id: number | null;
  titulo: string;
  autor: number | null;
  resumen: string;
  setNewPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Publicacion: React.FC<PublicacionProps> = ({
  id,
  titulo,
  autor,
  resumen,
  setNewPostModal,
  setEditId,
}) => {
  const { deletePost, user } = usePostContext(); // Usamos la función deletePost del contexto

  const handleDelete = async (postId: number | null) => {
    try {
      await deletePost(postId); // Llama a la función deletePost con el ID de la publicación
    } catch (error) {
      console.error("Error al borrar la publicación:", error);
    }
  };

  const [userAutor, setUserAutor] = useState<User | null>(null);

  const buscarAutor = async () => {
    if (autor) {
      setUserAutor(await getUserById(autor));
    }
  };

  useEffect(() => {
    buscarAutor();
  }, []);

  return (
    <div className={styles.postItem}>
      <Link to={`/publicacion/${id}`}>
        <h2>{titulo}</h2>
      </Link>
      <p>Autor: {`${userAutor?.name} ${userAutor?.lastName}`}</p>
      <p>{resumen}</p>
      {user && user.id === autor && (
        <div className={styles.iconsContainer}>
          <Tooltip title="Editar">
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setNewPostModal(true);
                setEditId(id);
              }}
            />
          </Tooltip>
          <Tooltip title="Borrar">
            <DeleteForeverIcon
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                handleDelete(id);
              }}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Publicacion;
