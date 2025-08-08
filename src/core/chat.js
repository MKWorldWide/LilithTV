/**
 * Connects to a WebSocket chat stream with auto-reconnect and backoff.
 * @param {string} url - WebSocket endpoint.
 * @param {(msg: any) => void} onMessage - callback for messages.
 * @returns {() => void} disconnect function.
 */
export function connectChat(url, onMessage) {
  let socket;
  let attempts = 0;

  const connect = () => {
    socket = new WebSocket(url);
    socket.onmessage = (event) => {
      let payload;
      try {
        payload = JSON.parse(event.data);
      } catch {
        payload = { text: String(event.data) };
      }
      onMessage(payload);
    };
    socket.onclose = () => {
      // Exponential backoff with cap at 30s.
      const delay = Math.min(30_000, 1000 * 2 ** attempts);
      attempts += 1;
      setTimeout(connect, delay);
    };
    socket.onerror = (err) => {
      console.error('Chat socket error', err);
      socket.close();
    };
  };

  connect();

  return () => socket && socket.close();
}
