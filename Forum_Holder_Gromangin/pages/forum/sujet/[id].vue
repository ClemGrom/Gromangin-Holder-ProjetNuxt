<template>
  <div>
    <v-container>
      <v-card
      v-for="message in messages"
      :key="message.id"
      class=" p-4 mb-4" color="blue-lighten-5"
    >
    <div class="d-flex"><v-card-title>{{ message.author_id }}</v-card-title>
      <v-card-text>{{ message.content }}</v-card-text>
      <v-card-subtitle>{{ new Date(message.date).toLocaleDateString('fr-FR') }}</v-card-subtitle>
    </div>
    </v-card>
    <div style="height: 60px;"></div> <!-- This div creates an empty space -->

<div class="d-flex " style="position: fixed; width: 100%; max-width: inherit; bottom: 0; ">
  <v-text-field
    v-model="content"
    
    @keyup.enter="addMessage"
    class="mr-2"
    style="flex-grow: 1;"
  ></v-text-field>

  <v-btn color="primary" @click="addMessage">Envoyer</v-btn>
</div>
  </v-container>
   
  
    
  </div>
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
          this.content = ''; 
          await this.loadMessages(); 
          window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
          console.error('Error adding message:', error);
          this.error = error.message;
        }
      },
    },
  };
  </script>
