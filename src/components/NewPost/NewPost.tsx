import React, { useEffect, useState } from "react";
import styles from "./NewPost.module.css";
import { CircularProgress } from "@mui/material";
import { Button } from "@mui/material";
import { usePostContext } from "../../contexts/PostContext";
import jsonServerApi from "../../api/api";

interface NewPostProps {
  handleCloseNewPostModal: () => void;
  editId: number | null;
}

interface PublicacionProps {
  id: number | null;
  titulo: string;
  fecha: string;
  autor: number | null;
  resumen: string;
}

const NewPost: React.FC<NewPostProps> = ({
  handleCloseNewPostModal,
  editId,
}) => {
  const [cargando, setCargando] = useState(false);

  const [formData, setFormData] = useState<PublicacionProps>({
    id: null,
    titulo: "",
    resumen: "",
    fecha: "",
    autor: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const clearFormData = () => {
    setFormData({
      id: null,
      titulo: "",
      resumen: "",
      fecha: "",
      autor: null,
    });
  };

  const { createNewPost, updatePost, user } = usePostContext();

  useEffect(() => {
    if (user?.id) {
      setFormData({
        id: null,
        titulo: "",
        resumen: "",
        fecha: "",
        autor: user.id,
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      if (editId) {
        await updatePost(editId, formData); // Llama a la función updatePost
      } else {
        await createNewPost(formData);
      }
      clearFormData();
      handleCloseNewPostModal();
    } catch (error) {
      console.error("Error al crear o actualizar la publicación:", error);
    } finally {
      setCargando(false);
    }
  };

  const setearInputs = async () => {
    if (editId) {
      const response = await jsonServerApi.get(`/posts/${editId}`);
      if (response) {
        setFormData({
          id: editId,
          titulo: response.data.titulo,
          resumen: response.data.resumen,
          fecha: response.data.fecha,
          autor: response.data.autor,
        });
      }
    }
  };
  // seteamos los valores si hay editId ya que vamos a editar una publicación
  useEffect(() => {
    setearInputs();
  }, [editId]);

  return (
    <div className={styles.container}>
      {editId ? (
        <h2>Editar publicación {editId} </h2>
      ) : (
        <h2>Nueva Publicación</h2>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            id="titulo"
            name="titulo"
            placeholder="Titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <textarea
            className={styles.textarea}
            id="resumen"
            name="resumen"
            placeholder="Resumen"
            value={formData.resumen}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
            onClick={() => handleCloseNewPostModal()}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
            type="submit"
          >
            {cargando ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : editId ? (
              "Editar Publicación"
            ) : (
              "Crear Publicación"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
