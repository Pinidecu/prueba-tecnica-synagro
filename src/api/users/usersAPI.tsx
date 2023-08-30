import jsonServerApi from "../api";

export interface User {
  id?: number;
  name: string;
  lastName: string;
  mail: string;
  auth?: string;
}

export const createUser = async (userData: User) => {
  try {
    const response = await jsonServerApi.post("/users", userData);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el usuario");
  }
};

export const getUserByAuth = async (auth: string): Promise<User | null> => {
  try {
    const response = await jsonServerApi.get<User[]>(`/users?auth=${auth}`);
    if (response.data.length > 0) {
      return response.data[0]; // Devuelve el primer usuario encontrado
    } else {
      return null; // No se encontró ningún usuario
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return null;
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await jsonServerApi.get<User>(`/users/${id}`);
    console.log("response", response);
    if (response.data) {
      return response.data; // Devuelve el primer usuario encontrado
    } else {
      return null; // No se encontró ningún usuario
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return null;
  }
};
