import { createSignal, onMount } from "solid-js";

function App() {
  const [message, setMessage] = createSignal("Loading...");

  onMount(async () => {
    const response = await fetch(`/api`);
    const text = await response.text();
    setMessage(text);
  });

  return (
    <div>
      <h1>{message()}</h1>
    </div>
  );
}

export default App;
