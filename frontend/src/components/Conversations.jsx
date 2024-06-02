import { For, onMount, useContext } from "solid-js";
import wsConnect from "../useWebSocket";
import { AuthContext } from "../contexts/AuthContext";

const Conversations = () => {
  const { setMessages } = wsConnect;
  const {
    channels,
    currentChannel,
    setCurrentChannel,
    setCurrentParticipantData,
  } = useContext(AuthContext);

  function setFocusOnDivWithId(elementId) {
    const scrollIntoViewOptions = { behavior: "smooth", block: "end" };
    document.getElementById(elementId).scrollIntoView(scrollIntoViewOptions);
  }

  const handleChannelChange = (channel_id) => {
    setCurrentChannel(channel_id);
    fetchPreviousMessages(channel_id).then(() => {
      setFocusOnDivWithId("messages");
    });
  };

  const fetchPreviousMessages = async (channel_id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/messages/${channel_id}`,
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
    setMessages(responseJson.data.chats);
    setCurrentParticipantData(responseJson.data.participant);
  };

  return (
    <div>
      <div class="h-[60px] border-b border-black flex px-4 items-center font-medium">
        Chats
      </div>
      <div class="px-0 py-0">
        <For each={channels()}>
          {(channel, i) => (
            <div
              onClick={() => handleChannelChange(channel.conversation_id)}
              class="hover:bg-slate-100 px-4 py-4 text-gray-800 cursor-pointer flex gap-2"
              classList={{
                "bg-slate-100 border-y":
                  currentChannel() === channel.conversation_id,
              }}
            >
              <img
                src={channel.avatar_url}
                class="min-w-12 h-12 rounded-full"
              />

              <div>
                <span class="text-md font-medium">{channel.username}</span>
                <p class="line-clamp-1 text-slate-400 text-sm w-full">
                  Available
                </p>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default Conversations;
