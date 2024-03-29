export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },
  message(peer, message) {
    console.log("[ws] message", peer, message);
    if (message.includes("ping")) {
      peer.send("pong");
    }
    const _message = {
      message: message.toString(), // Convertir le message en chaîne
    };
    console.log("[ws] message", JSON.stringify(_message));
    peer.send(JSON.stringify(_message)); // echo back
  },
  close(peer, event) {
    console.log("[ws] close", peer, event);
  },
  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
