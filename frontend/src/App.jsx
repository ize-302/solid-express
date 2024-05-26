import { createEffect, createSignal, onMount } from "solid-js";
import { useWebSocket } from "./useWebSocket";

function App() {
  const { messages, sendMessage, subscribeToChannel } =
    useWebSocket("ws://localhost:433");
  const [input, setInput] = createSignal("");
  const [channel, setChannel] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(channel(), input());
    setInput("");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    subscribeToChannel(channel());
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
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
            {message.channel}: {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
