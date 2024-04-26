<template>
  <div>
    <v-container>
      <v-card v-for="message in paginatedMessages" :key="message.id" class="p-4 mb-4" color="blue-lighten-5">
        <div class="d-flex  align-center justify-space-between pa-3">
          <v-card-title class="headline font-weight-bold">{{ message.name }}</v-card-title>
          <v-card-text class="body-1">
            <template v-if="inputMessageId === message.id">
              <v-text-field v-model="newMessageContent" @keyup.enter="modifierMessage" filled
                label="Modifier le message"></v-text-field>
            </template>
            <template v-else>
              {{ message.content }}
            </template>
          </v-card-text>
          <v-card-subtitle class="caption grey--text">{{ new Date(message.date).toLocaleDateString('fr-FR')
            }}</v-card-subtitle>
          <v-btn color="primary" v-if="message.author_id === userId" @click="showInput(message.id)">Modifier</v-btn>
          <v-btn color="error" v-if="isAdmin" @click="deleteMessage(message.id)" class="ml-3">Supprimer</v-btn>
        </div>
      </v-card>
      <v-card v-if="messages.length === 0" class="p-4 mb-4" color="blue-lighten-5">
        <v-card-title class="headline font-weight-bold">Aucun message dans ce forum</v-card-title>
      </v-card>
      <div style="height: 60px;"></div>

      <div class="d-flex align-center justify-space-between pa-3"
        style="position: fixed; width: 100%; max-width: inherit; bottom: 0; " v-if="userStore.userEmail">
        <v-text-field v-model="content" @keyup.enter="sendMessage" filled label="Tapez votre message ici..."
          class="mr-2 flex-grow-1"></v-text-field>
        <v-btn color="primary" @click="sendMessage">Envoyer</v-btn>
      </div>
      <div v-else>
        Vous devez être connecté pour écrire un message
      </div>
      <v-pagination v-model="page" :length="Math.ceil(messages.length / messagesPerPage)"
        color="primary"></v-pagination>
    </v-container>
  </div>
</template>

<script>
import { useUserStore } from '../store/user';

export default {
  data() {
    return {
      messages: [],
      error: '',
      inputMessageId: null,
      newMessageContent: '',
      content: '',
      websocket: null,
      isAdmin: 0,
      userId: null,
      page: 1,
      messagesPerPage: 20,

    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  computed: {
    paginatedMessages() {
      const start = (this.page - 1) * this.messagesPerPage;
      const end = start + this.messagesPerPage;
      return this.messages.slice(start, end);
    },
  },

  async created() {
    const userStore = useUserStore();
    this.isAdmin = await userStore.getAdmin();
    this.userId = await userStore.getUserId(); // Ajoutez cette ligne

    this.setupWebSocket();
    this.loadMessages();
  },
  methods: {
    setupWebSocket() {
      this.websocket = new WebSocket('ws://localhost:3000/_ws');

      this.websocket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const message = JSON.parse(data.message);
        message.date = new Date();
        console.log('Received message:', message);
        this.messages.push(message);
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      this.websocket.onclose = () => {
        console.log('WebSocket disconnected');
      };
    },
    async loadMessages() {
      const sujetId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/messagesuser?sujet_id=${sujetId}`);
        const data = await response.json();
        console.log('Received data from API:', data);
        this.messages = data.messages;
      } catch (error) {
        console.error('Error loading messages:', error);
        this.error = error.message;
      }
    },
    async deleteMessage(messageId) {
      try {
        const response = await fetch(`http://localhost:3000/api/messages`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: messageId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Recharger les messages après la suppression
        await this.loadMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
        this.error = error.message;
      }
    },
    async sendMessage() {
      if (this.content.trim() === '') return;
      const userId = useUserStore();
      const id = await userId.getUserId();

      const messageData = {
        author_id: id,
        content: this.content,
        sujet_id: this.$route.params.id,
      };

      try {
        // Envoyer le message via WebSocket
        this.websocket.send(JSON.stringify(messageData));

        // Envoyer une requête POST à l'API pour stocker le message dans la base de données
        const response = await fetch('http://localhost:3000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Recharger les messages après l'envoi
        await this.loadMessages();

        // Rediriger vers la dernière page
        const totalPages = Math.ceil((this.messages.length + 1) / this.messagesPerPage);
        this.page = totalPages;

        window.scrollTo(0, document.body.scrollHeight);
        this.content = '';
      } catch (error) {
        console.error('Error sending message:', error);
        this.error = error.message;
      }
    },
    async modifierMessage() {
      const messageData = {
        id: this.inputMessageId,
        content: this.newMessageContent,
      };
      try {
        const response = await fetch(`http://localhost:3000/api/messages`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });

        this.inputMessageId = null;
        this.newMessageContent = '';
        await this.loadMessages();
      } catch (error) {
        console.error('Error updating message:', error);
        this.error = error.message;
      }
    },
    showInput(messageId) {
      if (this.inputMessageId === messageId) {
        this.modifierMessage();
      } else {
        this.inputMessageId = messageId;
        const message = this.messages.find(msg => msg.id === messageId);
        this.newMessageContent = message.content;
      }
    },

    async getNameUserMessage(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/messagesuser?sujet_id=${id}`);
        const data = await response.json();
        return data.user.name;
      } catch (error) {
        console.error('Error loading user:', error);
        this.error = error.message;
      }
    },
  },

};
</script>
