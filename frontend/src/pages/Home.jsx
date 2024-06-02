import { Show, createSignal, onMount, useContext } from "solid-js";
import wsConnect from "../useWebSocket";
import { AuthContext } from "../contexts/AuthContext";
import Blank from "../components/Blank";
import { EmojiPicker } from "solid-emoji-picker";
import { Smile } from "../components/icons/Icons";

function App() {
  const { messages, sendMessage } = wsConnect;
  const [input, setInput] = createSignal("");
  const { user, currentChannel, currentParticipantData } =
    useContext(AuthContext);
  const [showEmojis, setShowEmojis] = createSignal(false);

  const handleSubmit = async (e) => {
    e.target.value = "";
    e.preventDefault();
    await sendMessage(currentChannel(), input(), user().id);
    await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        conversation_id: currentChannel(),
        content: input(),
      }),
    });
    setInput("");
  };

  function pickEmoji(emoji) {
    console.log(emoji);
    setInput(input() + emoji.emoji);
    console.log("You clicked", emoji.name);
  }

  return (
    <Show when={user() && currentChannel()} fallback={<Blank />}>
      <div class="flex flex-col justify-between h-full">
        <div class="min-h-[60px] border-b border-gray-400 bg-white flex items-center px-4 gap-2">
          {currentParticipantData() ? (
            <img
              class="max-h-10 max-w-10 rounded-full"
              src={currentParticipantData().avatar_url}
            />
          ) : null}
          <p class="text-md font-medium">
            {currentParticipantData()
              ? currentParticipantData().username
              : null}
          </p>
        </div>
        <div class="px-2 py-5 h-full overflow-y-auto" id="messages">
          <ul class="space-y-3">
            {messages().map((message, index) => (
              <li
                key={index}
                class="flex"
                classList={{ "justify-end": message.sender_id === user().id }}
              >
                <div
                  class="text-gray-800 text-sm shadow-sm rounded-2xl py-2 px-4 max-w-[45%]"
                  classList={{
                    "bg-green-500 text-white": message.sender_id === user().id,
                    "bg-lime-50 border border-lime-100":
                      message.sender_id !== user().id,
                  }}
                >
                  {message.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form
          id="messagebox"
          class="bg-slate-200 border-t border-gray-400 p-3 flex gap-2 justify-between items-end"
          onSubmit={handleSubmit}
        >
          {showEmojis() && <EmojiPicker onEmojiClick={pickEmoji} />}
          <input
            class="bg-white max-h-[100px] overflow-y-auto text-sm items-center min-w-[95%] rounded-[20px] min-h-[40px] h-auto px-4 outline-slate-400 border border-slate-400"
            type="text"
            value={input()}
            placeholder="message..."
            onInput={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="button"
            class="min-w-[52px] text-4xl text-slate-400"
            onClick={() => setShowEmojis(!showEmojis())}
          >
            <Smile />
          </button>
        </form>
      </div>
      {/* <div class="flex flex-col justify-between h-full">
        <div class="sticky top-0 h-[60px] border-b border-gray-400 bg-white flex items-center px-4 gap-2">
          {currentParticipantData() ? (
            <img
              class="max-h-10 max-w-10 rounded-full"
              src={currentParticipantData().avatar_url}
            />
          ) : null}
          <p class="text-md font-medium">
            {currentParticipantData()
              ? currentParticipantData().username
              : null}
          </p>
        </div>
        <div class="px-2 py-5 h-full" id="messages">
          <ul class="space-y-3">
            {messages().map((message, index) => (
              <li
                key={index}
                class="flex"
                classList={{ "justify-end": message.sender_id === user().id }}
              >
                <div
                  class="text-gray-800 text-sm shadow-sm rounded-2xl py-2 px-4 max-w-[45%]"
                  classList={{
                    "bg-green-500 text-white": message.sender_id === user().id,
                    "bg-lime-50 border border-lime-100":
                      message.sender_id !== user().id,
                  }}
                >
                  {message.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form
          id="messagebox"
          class="sticky bottom-0 bg-slate-200 border-t border-gray-400 p-3 flex gap-2 justify-between items-end"
          onSubmit={handleSubmit}
        >
          {showEmojis() && <EmojiPicker onEmojiClick={pickEmoji} />}
          <input
            class="bg-white max-h-[100px] overflow-y-auto text-sm items-center min-w-[95%] rounded-[20px] min-h-[40px] h-auto px-4 outline-slate-400 border border-slate-400"
            type="text"
            value={input()}
            placeholder="message..."
            onInput={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="button"
            class="min-w-[52px] text-4xl text-slate-400"
            onClick={() => setShowEmojis(!showEmojis())}
          >
            <Smile />
          </button>
        </form>
      </div> */}
    </Show>
  );
}

export default App;
