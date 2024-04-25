<template>
  <NuxtLayout>
    <v-app>
      <v-toolbar color="light-blue-darken-3">
    <v-img
        src="@/assets/logo.png"
        alt="Forum Logo"
        max-width="50"
        class="ml-3"
        
    ></v-img>
    <v-toolbar-title><NuxtLink to="/" class="boutonnav">PEDDIT</NuxtLink></v-toolbar-title>

        <v-btn>
          <NuxtLink to="/" class="boutonnav">Forum</NuxtLink>
        </v-btn>
        <v-btn>
          <NuxtLink to="/test" class="boutonnav">Test</NuxtLink>
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
