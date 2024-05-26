import { Show, createSignal, onMount, useContext } from "solid-js";
import { useWebSocket } from "../useWebSocket";
import { AuthContext } from "../contexts/AuthContext";

function App() {
  const { messages, sendMessage, subscribeToChannel } =
    useWebSocket("ws://localhost:433");
  const [input, setInput] = createSignal("");
  const [channel, setChannel] = createSignal("");
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(channel(), input(), user().id);
    setInput("");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    subscribeToChannel(channel());
  };

  return (
    <Show when={user()} fallback={"Loading..."}>
      <h1>WebSocket Chat {user().username}</h1>
      <form onSubmit={handleSubscribe}>
        <input
          type="text"
          placeholder="Channel"
          value={channel()}
          onInput={(e) => setChannel(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input()}
          onInput={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages().map((message, index) => (
          <li key={index}>
            {message.author.id === user().id ? "me" : message.author.username}:{" "}
            {message.content}
          </li>
        ))}
      </ul>
    </Show>
  );
}

export default App;
