import { For, createSignal, onMount, useContext } from "solid-js";
import wsConnect from "../useWebSocket";
import { useLocation, useNavigate } from "@solidjs/router";
import { StateContext } from "../contexts/StateContext";

const PrivateChats = () => {
  const { messages, sendMessage, subscribeToChannel } = wsConnect
  const [conversations, setConversations] = createSignal([]);
  const [chatIds, setChatIds] = createSignal([]);
  const { currentChannel, setCurrentChannel } = useContext(StateContext);

  const fetchChannels = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/conversations`, {
      credentials: "include",
      method: "get",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });
    const responseJson = await response.json();
    setConversations(responseJson.data);
    // setChatIds(responseJson.data.chat_ids);
  };

  const handleChannelChange = (channel_id) => {
    setCurrentChannel(channel_id)
    fetchChannels();
  }

  onMount(async () => {
    await fetchChannels();
    // SUBSCRIBE TO ALL CONVERSATIONS
    conversations().map(async (conversation) => {
      await subscribeToChannel(conversation.conversation_id);
    });
  });
  return (
    <div>
      <div class="h-[60px] border-b border-black"></div>
      <div class="px-3 py-4">
        <For each={conversations()}>
          {(conversation, i) => (
            <div
              onClick={() => handleChannelChange(conversation.conversation_id)}
              class="hover:bg-slate-100  p-3 rounded-xl mb-3 text-gray-800 cursor-pointer flex gap-2"
              classList={{
                "bg-slate-100 border":
                  currentChannel() === conversation.conversation_id,
              }}
            >
              <div class="min-w-12 h-12 bg-gray-400 rounded-full"></div>
              <div>
                <span class="text-md font-medium">{conversation.username}</span>
                <p class="line-clamp-1 text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat et veritatis voluptate iure quam quisquam unde saepe,
                  dolorem ducimus voluptatem aspernatur nisi. Ratione eius
                  consequatur debitis! Nemo est quam distinctio.
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default PrivateChats;
