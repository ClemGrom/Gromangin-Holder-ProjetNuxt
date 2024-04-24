<template>
    <div>
      <h1>Sujets:</h1>
      <ul>
        <li v-for="sujet in sujets" :key="sujet.id">{{ sujet.name }}</li>
      </ul>
      <input type="text" v-model="newSujetName" @keyup.enter="addSujet" placeholder="Nom du sujet" />
      <v-btn @click="addSujet">Ajouter un sujet</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        websocket: null,
        sujets: [],
        newSujetName: '',
      };
    },
    created() {
      this.websocket = new WebSocket('ws://localhost:3000/_testws');
      
  
      this.websocket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.websocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
  
        // Si le message a une propriété 'sujets', mettez à jour la liste des sujets
        if (message.sujets) {
          this.sujets = message.sujets;
        }
  
        // Si le message a une propriété 'name', ajoutez-le à la liste des sujets
        if (message.name) {
          this.sujets.push(message);
        }
      };
  
      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    },
    methods: {
      addSujet() {
        if (this.newSujetName.trim() !== '') {
          const message = {
            type: 'addSujet',
            name: this.newSujetName,
            forum_id: 1
          };
          
          this.websocket.send(JSON.stringify(message));
          this.sujets.push({ id: this.sujets.length + 1, name: this.newSujetName }); // Ajoute le nouveau sujet à la liste
          this.newSujetName = ''; // Réinitialise le champ de saisie
          
          console.log('Sent message:', message);
        }
      },
    },
    
    beforeDestroy() {
      if (this.websocket) {
        this.websocket.close();
      }
    },
  };
  </script>