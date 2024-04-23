<template>
  <input type="text" v-model="name" placeholder="Nom du sujet" />
  <input type="text" v-model="firstmsg" placeholder="Premier message" />
  <v-btn @click="addSujetetMsg">Ajouter un sujet</v-btn>
    <div>
        <h1>Sujets</h1>
        <p v-if="forum && forum.length > 0">Voici les sujets du forum: {{forum[0].name}}</p>
        <p v-else>Aucun forum trouvé</p>
        <p>Nombre de Sujet {{ this.sujets.length }}</p>
        <v-list>
            <v-list-item v-for="sujet in sujets" :key="sujet.id">
                <v-list-item-content>
                    <v-list-item-title>
                        <nuxt-link :to="`/forum/sujet/${sujet.id}`">{{ sujet.name }}</nuxt-link>
                    </v-list-item-title>
                    <div>{{ sujet.created }}</div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>
<script>
export default {
  data() {
    return {
      forum: null,
      sujets: [],
      name: '',
      firstmsg: '',
      error: '',
    };
  },
  created() {
    this.loadForum();
  },
  methods: {
    async loadForum() {
      const forumId = this.$route.params.id;
      try {
        const forumResponse = await fetch(`http://localhost:3000/api/forums?id=${forumId}`);
        if (!forumResponse.ok) {
          throw new Error('Erreur lors du chargement du forum');
        }
        const forumData = await forumResponse.json();
        this.forum = forumData.forums;

        const sujetsResponse = await fetch(`http://localhost:3000/api/sujets?forum_id=${forumId}`);
        if (!sujetsResponse.ok) {
          throw new Error('Erreur lors du chargement des sujets');
        }
        const sujetsData = await sujetsResponse.json();
        this.sujets = sujetsData.sujets;
      } catch (error) {
        this.error = error.message;
        console.error('Erreur :', error);
      }
    },
    async addSujetetMsg() {
      await this.addSujet();
      await this.addFirstmsg();
    },
    async addSujet() {
      const forumId = this.$route.params.id;
      const sujetData = {
        name: this.name,
        forum_id: forumId,
      };
      try {
        const response = await fetch(`http://localhost:3000/api/sujets?forum_id=${forumId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sujetData),
        });
        this.name = '';
        this.loadForum();
      } catch (error) {
        this.error = 'Erreur lors de l\'ajout du sujet';
        console.error('Erreur :', error);
      }
    },
    async addFirstmsg() {
      const forumId = this.$route.params.id;
      const lastSujetId = await this.getLastSujetId();
      const messageData = {
        user_id: '1',
        content: this.firstmsg,
        sujet_id: parseInt(lastSujetId),
      };
      try {
        const response = await fetch(`http://localhost:3000/api/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        });
        this.firstmsg = '';
        this.loadForum();
      } catch (error) {
       
        this.error = 'Erreur lors de l\'ajout du sujet';
        console.error('Erreur :', error);
      }
    },
    async getLastSujetId() {
      const forumId = this.$route.params.id;
      try {
        const sujetsResponse = await fetch(`http://localhost:3000/api/sujets?forum_id=${forumId}`);
        if (!sujetsResponse.ok) {
          throw new Error('Erreur lors du chargement des sujets');
        }
        const sujetsData = await sujetsResponse.json();
        const lastSujet = sujetsData.sujets[sujetsData.sujets.length - 1];
        console.log(lastSujet.id);
        return lastSujet.id;
      } catch (error) {
        this.error = 'Erreur lors de la récupération du dernier sujet';
        console.error('Erreur :', error);
      }
    },
  },
  
};
</script>
