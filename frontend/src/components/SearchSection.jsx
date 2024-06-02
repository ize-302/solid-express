import { For, Show, createSignal } from "solid-js";
import { ChatFilled, UserPlusFilled } from "./icons/Icons";
import { useNavigate } from "@solidjs/router";
import Spinner from "./icons/Spinner";

const SearchSection = () => {
  const [input, setInput] = createSignal("user");
  const [submitting, setIsSubmitting] = createSignal(false);
  const [result, setResult] = createSignal([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/search?q=${input()}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
    const responseJson = await response.json();
    setResult(responseJson.data);
    setIsSubmitting(false);
  };

  const handleAddUser = async (id) => {
    setIsSubmitting(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/conversations/new?id=${id}`,
      {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
    navigate("/");
    return response;
  };

  return (
    <div class="relative">
      <div class="sticky top-0 h-[60px] border-b border-black px-4 flex items-center w-full bg-green-200">
        <form id="searchbox" onSubmit={handleSearch} class="w-full">
          <input
            class="w-full rounded-full h-[34px] px-4 outline-slate-400 border border-slate-400"
            placeholder="Search"
            onInput={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      <Show
        when={!submitting()}
        fallback={
          <div class="text-3xl w-full py-10 flex justify-center items-center text-primary">
            <Spinner />
          </div>
        }
      >
        <For each={result()}>
          {(user, index) => (
            <div class="px-4 py-4 text-gray-800 flex gap-2">
              <img src={user.avatar_url} class="min-w-12 h-12 rounded-full" />
              <div class="flex w-full items-center justify-between">
                <span class="text-md font-medium">{user.username}</span>
                <button
                  onClick={() => handleAddUser(user.channel_id)}
                  class="bg-lime-100 px-2 py-1 border-none rounded-full text-primary text-sm"
                >
                  Send request
                </button>
              </div>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
};

export default SearchSection;
