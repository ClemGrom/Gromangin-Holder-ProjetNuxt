export default defineWebSocketHandler({
  open(peer) {
    console.log("[ws] open", peer);
  },
  message(peer, rawMessage) {
    const message = rawMessage.toString(); // Convertir le message en chaîne de caractères
    console.log("[ws] message", peer, message);
    if (message.includes("ping")) {
      peer.send("pong");
    }
    const _message = {
      message: message, // Pas besoin de le re-convertir en chaîne, car il est déjà une chaîne
    };
    console.log("[ws] message", JSON.stringify(_message));
    peer.send(JSON.stringify(_message)); // Echo back
  },
  
  close(peer, event) {
    console.log("[ws] close", peer, event);
  },
  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});
