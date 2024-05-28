import { createContext, createSignal } from "solid-js";

export const StateContext = createContext();

const StateProvider = (props) => {
  const [currentChannel, setCurrentChannel] = createSignal(false);

  return (
    <StateContext.Provider
      value={{
        currentChannel,
        setCurrentChannel,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateProvider;
