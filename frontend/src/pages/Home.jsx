import { Show, createSignal, onMount, useContext } from "solid-js";
import  wsConnect from "../useWebSocket";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation } from "@solidjs/router";
import { StateContext } from "../contexts/StateContext";

function App() {
  const location = useLocation();
  const { messages, sendMessage } = wsConnect;
  const [input, setInput] = createSignal("");
  const { currentChannel, setCurrentChannel } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(currentChannel(), input(), user().id);
    setInput("");
  };

  return (
    <Show when={user() && currentChannel()} fallback={"Select chat"}>
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="sticky top-0 h-[60px] border-b border-gray-400 bg-white">WebSocket Chat {user().username}</div>
          <ul class="overflow-y-auto space-y-3 px-2 py-5">
            {messages().map((message, index) => (
              <li key={index} class="flex" classList={{'justify-end': message.author === user().id}}>
                <div class="text-gray-800 text-sm shadow-sm rounded-2xl py-2 px-4 max-w-[45%]" classList={{'bg-green-400': message.author === user().id, 'bg-lime-50 border border-lime-100': message.author !== user().id}}>
                  {message.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form class="sticky bottom-0 bg-slate-300 border-t border-gray-400 p-3 flex gap-2 justify-between"  onSubmit={handleSubmit}>
          <input
          class="w-full rounded-full h-[40px] px-4"
            type="text"
            value={input()}
            placeholder="message..."
            onInput={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </Show>
  );
}

export default App;
