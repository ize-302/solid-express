import { createSignal, onCleanup } from 'solid-js';

export function useWebSocket(url) {
  const [messages, setMessages] = createSignal([]);
  let socket;

  const sendMessage = (channel, content) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type: 'message', channel, content });
      socket.send(message);
    }
  };

  const subscribeToChannel = (channel) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ type: 'subscribe', channel });
      socket.send(message);
    }
  };


  const connect = () => {
    socket = new WebSocket(url);

    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const parsedMessage = JSON.parse(reader.result);
          const { channel, content } = parsedMessage;
          setMessages((prev) => [...prev, { channel, content }]);
        };
        reader.readAsText(event.data);
      } else {
        const parsedMessage = JSON.parse(event.data);
        const { channel, content } = parsedMessage;
        setMessages((prev) => [...prev, { channel, content }]);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed. Reconnecting...');
      setTimeout(connect, 1000);
    };
  };

  connect();

  onCleanup(() => {
    if (socket) {
      socket.close();
    }
  });

  return { messages, sendMessage, subscribeToChannel };
}
