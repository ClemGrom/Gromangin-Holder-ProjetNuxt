<template>

  <NuxtLayout>



    <v-app>
      <v-toolbar title="Forum" color="blue lighten-4">
        <v-btn>
          <NuxtLink to="/" class="boutonnav">Forum</NuxtLink>
        </v-btn>
        <v-btn>
          <NuxtLink to="/inscription" class="boutonnav">Inscription</NuxtLink>
        </v-btn>
        <v-btn>
          <NuxtLink to="/connexion" class="boutonnav">Connexion</NuxtLink>
        </v-btn>
      </v-toolbar>

      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<style scoped>
.boutonnav {
  text-decoration: none;
  color: white;

}
</style>
