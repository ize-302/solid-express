import { For, createSignal } from "solid-js";

const SearchSection = () => {
  const [input, setInput] = createSignal("");
  const [submitting, setIsSubmitting] = createSignal(false);
  const [result, setResult] = createSignal([]);

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsSubmitting(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/search?q=${input()}`,
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        }
      }
    ); 
    const responseJson = await response.json();
    setResult(responseJson.data)
    setIsSubmitting(false)
  }

  const handleAddUser = async (id) => {
    setIsSubmitting(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/conversations/request?id=${id}`,
      {
        credentials: "include",
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        }
      }
    ); 
    return response
  }


  return (
    <div>
      <div class="h-[60px] border-b border-black">
        <form onSubmit={handleSearch}>
          <input class="border border-gray-200" onInput={(e) => setInput(e.target.value)} />
        </form>
      </div>
      <div class="px-3 py-4">
        <For each={result()}>
          {(user, index) => <div>{user.username} <button onClick={() => handleAddUser(user.id)} class="bg-blue-400">Add</button></div>}
        </For>
      </div>
    </div>
  );
};

export default SearchSection;
