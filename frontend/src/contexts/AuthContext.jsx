import { createContext, createSignal } from "solid-js";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [authenticated, setAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal(null);

  const checkSessionState = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/me`,
        {
          credentials: "include",
          method: "get",
          headers: {
            accept: "*/*",
          },
        }
      );
      const responseJson = await response.json();
      if (responseJson.success) {
        setAuthenticated(true);
        setUser(responseJson.data);
      } else {
        setAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        checkSessionState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
