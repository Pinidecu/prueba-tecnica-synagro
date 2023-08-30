import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import jsonServerApi from "../api/api";
import { User } from "../api/users/usersAPI";

interface Post {
  id: number | null;
  titulo: string;
  resumen: string;
  fecha: string;
  autor: number | null;
}

interface PostContextProps {
  posts: Post[];
  misPosts: Post[];
  postsDetails: Post | null;
  createNewPost: (postData: Post) => void;
  deletePost: (postId: number | null) => void;
  getPostById: (postId: number | null) => void;
  clearPostDetails: () => void;
  updatePost: (postId: number, updatedData: Post) => void;
  user: User | null;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}


// Creamos el context
const PostContext = createContext<PostContextProps | undefined>(undefined);

// Definimos el hook que utilizaremos para acceder al context
export const usePostContext = (): PostContextProps => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext debe usarse dentro de un PostProvider");
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

// Definimos el provider
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [misPosts, setMisPosts] = useState<Post[]>([]);
  const [postsDetails, setPostsDetails] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await jsonServerApi.get<Post[]>("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error trayendo los posts:", error);
    }
  };

  const fetchPostsByUserId = async (userId: number): Promise<Post[]> => {
    try {
      const response = await jsonServerApi.get<Post[]>(
        `/posts?autor=${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error al buscar pots por usuarios:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchPostsByUserId(user.id)
        .then((userPosts) => {
          setMisPosts(userPosts);
        })
        .catch((error) => {
          console.error("Error buscando posts:", error);
        });
    }
  }, [user, posts]);

  const createNewPost = async (postData: Post) => {
    try {
      const response = await jsonServerApi.post<Post>("/posts", postData);
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const deletePost = async (postId: number | null) => {
    try {
      await jsonServerApi.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error al borrar la publicación:", error);
    }
  };

  const getPostById = async (postId: number | null) => {
    try {
      const response = await jsonServerApi.get<Post>(`/posts/${postId}`);
      setPostsDetails(response.data);
    } catch (error) {
      console.error("Error al borrar la publicación:", error);
    }
  };

  const clearPostDetails = () => {
    setPostsDetails(null);
  };

  const clearMisPosts = () => {
    setMisPosts([]);
  };

  const updatePost = async (postId: number, updatedData: Post) => {
    try {
      const response = await jsonServerApi.put<Post>(
        `/posts/${postId}`,
        updatedData
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? response.data : post))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const signOut = async () => {
    setUser(null);
    clearMisPosts();
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        misPosts,
        postsDetails,
        createNewPost,
        deletePost,
        getPostById,
        clearPostDetails,
        updatePost,
        user,
        signOut,
        setUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
