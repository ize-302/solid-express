import { createContext, createSignal } from "solid-js";
import wsConnect from "../useWebSocket";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const [authenticated, setAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal(null);
  const [channels, setChannels] = createSignal([]);
  const [currentChannel, setCurrentChannel] = createSignal(null);
  const [currentParticipantData, setCurrentParticipantData] =
    createSignal(null);
  const { subscribeToChannel } = wsConnect;

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

  const fetchChannels = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/conversations`,
      {
        credentials: "include",
        method: "get",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
    const responseJson = await response.json();
    setChannels(responseJson.data);
    responseJson.data.forEach((channel) => {
      subscribeToChannel(channel.conversation_id);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        checkSessionState,
        fetchChannels,
        channels,
        currentChannel,
        setCurrentChannel,
        currentParticipantData,
        setCurrentParticipantData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
