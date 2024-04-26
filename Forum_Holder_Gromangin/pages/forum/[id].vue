<template>
  <v-container>

    <v-row justify="center">
      <v-col>
        <div class="d-flex py-2" color="grey lighten-3" v-if="userStore.userEmail">
          <v-text-field v-model="name" label="Nom du sujet" outlined dense color="blue-grey darken-1"></v-text-field>
          <v-text-field v-model="firstmsg" label="Premier message" outlined dense
            color="blue-grey darken-1"></v-text-field>
          <v-btn small color="blue-grey darken-1" @click="addSujetetMsg">Ajouter un sujet</v-btn>
        </div>

        <v-card class="mb-2 px-4 py-2">
          <h1 class="text-center text-primary">Sujets</h1>
          <h2 v-if="forum && forum.length > 0">Voici les sujets du forum: {{ forum[0].name }}</h2>
          <p v-else>Aucun forum trouvé</p>
          <p>Nombre de Sujet du forum : {{ this.sujets.length }}</p>
          <v-list>
            <v-card v-for="(sujet, index) in paginatedSujets" :key="sujet.id"
              :color="index % 2 === 0 ? 'blue-grey-lighten-5' : 'blue-grey-lighten-4'" class="mb-2">
              <nuxt-link :to="`/forum/sujet/${sujet.id}`" class="noundeline d-flex ">
                <v-card-title>
                  Sujet : {{ sujet.name }}
                </v-card-title>
                <v-card-text>Crée le :{{ sujet.created }}</v-card-text>
              </nuxt-link>
            </v-card>
          </v-list>
        </v-card>
        <v-pagination v-model="page" :length="Math.ceil(sujets.length / sujetsPerPage)" color="primary"></v-pagination>
      </v-col>
    </v-row>

  </v-container>
</template>
<script>
import { useUserStore } from '../store/user';

export default {
  data() {
    return {
      forum: null,
      sujets: [],
      name: '',
      firstmsg: '',
      error: '',
      page: 1,
      sujetsPerPage: 20,
      isAdmin: 0,
    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },

  computed: {
    paginatedSujets() {
      const start = (this.page - 1) * this.sujetsPerPage;
      const end = start + this.sujetsPerPage;
      return this.sujets.slice(start, end);
    },
  },
  async created() {
    const userStore = useUserStore();
    this.isAdmin = await userStore.getAdmin();

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
        this.page = 1;
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

      const userStore = useUserStore();
      const userId = await userStore.getUserId();

      const messageData = {
        author_id: userId,
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
<style scoped>
.noundeline {
  text-decoration: none;
  color: black;
}

.text-primary {
  color: #0D47A1;
  /* Change this to your preferred color */
}
</style>