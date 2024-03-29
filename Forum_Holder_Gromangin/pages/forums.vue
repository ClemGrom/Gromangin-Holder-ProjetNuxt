<template>
  <div>
    <h1>Forum</h1>
    <p>Voici les messages du forum:</p>
    <v-list>
      <v-list-item v-for="forum in forums" :key="forum.id">
        <v-list-item-content>
          <v-list-item-title>
            <nuxt-link :to="`/forum/${forum.id}`">{{ forum.name }}</nuxt-link>
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
    this.forums = data.forums.map(forum => ({
        ...forum,
        created: forum.created.split('T')[0]
    }));
}
};
</script>