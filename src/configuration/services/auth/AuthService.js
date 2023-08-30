import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const AuthService = {
  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", userCredential);
      return { user: userCredential.user };
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err.message);
      return { err: err };
    }
  },

  createUser: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario autenticado:", userCredential);
      return { user: userCredential.user };
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err.message);
      return { err: err };
    }
  },
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario autenticado:", userCredential);
      return { user: userCredential.user };
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err.message);
      return { err: err };
    }
  },
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Correo de restablecimiento de contraseña enviado");
      return { success: true };
    } catch (err) {
      console.error(
        "Error al enviar el correo de restablecimiento de contraseña:",
        err.message
      );
      return { error: err };
    }
  },
};
