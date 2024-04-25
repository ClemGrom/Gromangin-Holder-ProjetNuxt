<template>
  <div>
    <h1>Forum</h1>
    <v-btn color="primary" @click="addForum">Bouton</v-btn>
    <h2>Voici tous les forums:</h2>
    <v-list>
      <v-list-item v-for="forum in forums" :key="forum.id">
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link :to="`/forum/${forum.id}`">{{ forum.name }}</nuxt-link>
            <p>Nombre de Sujet : {{forum.sujetCount}}</p>
          </v-list-item-title>
          <div>{{ forum.created }}</div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forums: [],
    };
  },
  async mounted() {
    const response = await fetch('http://localhost:3000/api/forums');
    const data = await response.json();
    const forums = data.forums;
    const forumPromises = forums.map(async (forum) => {
      const response = await fetch(`http://localhost:3000/api/sujets?forum_id=${forum.id}`);
      const data = await response.json();
      return {
        ...forum,
        created: forum.created.split('T')[0],
        sujetCount: data.sujets.length, 
      };
    });
    this.forums = await Promise.all(forumPromises);
  },
};

</script>