<template>
    <v-container>
       
      <v-row justify="center">
        <v-col cols="12" >
          <v-card class="pa-4" >
            <v-card-title primary-title>
    <h3 class="headline mb-0">Forum</h3>
    <input type="text" v-model="name"  @keyup.enter="addForum" placeholder="Nom du forum" style="background-color: white;" class="rounded px-2 mx-2" />
    <v-btn color="blue-grey lighten-3" @click="addForum">AJouter un Forum</v-btn>
  </v-card-title>
            <v-card-text  class="mx-auto">
              <p>Voici tous les forums:</p>
              <v-list class="rounded">
                <v-list-item v-for="forum in forums" :key="forum.id" >
                  <v-list-item-content class="d-flex">
                    <nuxt-link class="noundeline" :to="`/forum/${forum.id}`" >
                      <v-list-item-title >
                        <h3>{{ forum.name }}</h3>
                        <p>Nombre de Sujet : {{forum.sujetCount}}</p>
                      </v-list-item-title>
                      <div>{{ forum.created }}</div>
                    </nuxt-link>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
 
  
  <style scoped>
  .v-card {
    margin-top: 20px;
  }
  .v-list-item {
    margin-bottom: 10px;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        forums: [],
        error: '',
      };
    },
    created() {
      this.loadForums();
    },
    mounted() {
      this.loadForums();
    },
    methods: {
        async addForum() {
  const forumData = {
    name: this.name,
  };

  try {
    const response = await fetch('http://localhost:3000/api/forums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(forumData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du forum');
    }

    // Vérifiez si la réponse est vide
    const text = await response.text();
    if (text) {
      const data = JSON.parse(text);
      console.log(data);
    }

    // Rechargez les forums après avoir ajouté un nouveau forum
    this.loadForums();
  } catch (error) {
    this.error = 'Erreur lors de la création du forum';
    console.error('Erreur :', error);
  }
},

  async loadForums() {
    try {
      const response = await fetch('http://localhost:3000/api/forums');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des forums');
      }
      const data = await response.json();
      this.forums = data.forums;
    } catch (error) {
      this.error = 'Erreur lors du chargement des forums';
      console.error('Erreur :', error);
    }
  },
},
    };
    </script>

<style scoped>
.noundeline {
  text-decoration: none;
  color: black;
}
</style>
