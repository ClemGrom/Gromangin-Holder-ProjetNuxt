<template>
    <div>
        <h1>Forum</h1>
        <p>Voici les messages du forum:</p>
        <v-list>
  <v-list-item v-for="forum in data" :key="forum.id">
    <v-list-item-content>
      <nuxt-link :to="`/forum/${forum.id}`">{{ forum.name }}</nuxt-link>
      <p>{{ forum.created }}</p>
    </v-list-item-content>
  </v-list-item>
</v-list>
    </div>


</template>


<script>

const fetchForum = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
};
</script>