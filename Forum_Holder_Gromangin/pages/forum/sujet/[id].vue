<template>
    <div>
      <div v-for="message in messages" :key="message.id">
        
        <p>{{ message.content}}</p>
      </div>
    </div>
    <input v-model="content" type="text" placeholder="Votre message" />
    <v-btn @click="addMessage">Envoyer</v-btn>
  </template>
  
  <script>
  export default {
    data() {
      return {
        messages: [],
        error: '',
      };
    },
    async created() {
      await this.loadMessages();
    },
    methods: {
      async loadMessages() {
        const sujetId = this.$route.params.id;
        console.log(`Loading messages for sujet_id=${sujetId}`);
        try {
          const response = await fetch(`http://localhost:3000/api/messages?sujet_id=${sujetId}`);
          if (!response.ok) {
            throw new Error('Erreur lors du chargement des messages');
          }
          const data = await response.json();
          console.log('Received data from API:', data);
          this.messages = data.messages; // Access the `messages` property of the data object
        } catch (error) {
          console.error('Error loading messages:', error);
          this.error = error.message;
        }
      },
    async addMessage() {
        const sujetId = this.$route.params.id;
        const messageData = {
        user_id: 1,
          content: this.content,
          sujet_id: sujetId,
        };
        try {
          const response = await fetch(`http://localhost:3000/api/messages?sujet_id=${sujetId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
          });
          if (!response.ok) {
            throw new Error('Erreur lors de la création du message');
          }
          this.content = ''; // Clear the content field after sending the message
          await this.loadMessages(); // Reload the messages after adding a new one
        } catch (error) {
          console.error('Error adding message:', error);
          this.error = error.message;
        }
      },
    },
  };
  </script>
