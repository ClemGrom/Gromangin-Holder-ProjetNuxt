import db from "~/server/sql";
import fetch from "node-fetch";

// Créer une liste pour stocker tous les clients connectés
const clients = new Set();

export default defineWebSocketHandler({
  async open(peer) {
    console.log("[ws] open", peer);

    const forumId = 14;
    const response = await fetch(`http://localhost:3000/api/sujets?forum_id=${forumId}`);
    const sujets = await response.json();
    console.log("[ws] sujets", sujets);

    peer.send(JSON.stringify(sujets));

    // Ajouter le nouveau client à la liste des clients
    clients.add(peer);
  },
  
  async message(peer, rawMessage) {
    const message = JSON.parse(rawMessage.toString());
    console.log("[ws] message", peer, message);

    if (message.type === 'addSujet') {
        console.log("[ws] addSujet", message);
        const response = await fetch(`http://localhost:3000/api/sujets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: message.name,
            forum_id: message.forum_id,
          }),
        });
        if (!response.ok) {
          console.error('Failed to add sujet', await response.text());
          return;
        }
        const sujet = await response.json();
        console.log("[ws] added sujet", sujet);

        // Broadcast the new sujet to all clients
        clients.forEach(client => {
          if (client !== peer) {
            client.send(JSON.stringify(sujet));
          }
        });
    }
  },
  
  close(peer, event) {
    console.log("[ws] close", peer, event);
    // Supprimer le client de la liste des clients lorsqu'il se déconnecte
    clients.delete(peer);
  },
  
  error(peer, error) {
    console.log("[ws] error", peer, error);
  },
});