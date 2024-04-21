<template>

  <NuxtLayout>
    
    

    <v-app>
      <v-toolbar title="Forum" color="indigo-darken-1 indigo-lighten-3 ">
        <v-btn  text>
  <NuxtLink to="/">Forum</NuxtLink>
</v-btn>
<v-btn  text>
  <NuxtLink to="/sujets">Sujets</NuxtLink>
</v-btn>
<v-btn  text>
  <NuxtLink to="/inscription">Inscription</NuxtLink>
</v-btn>
<v-btn text>
  <NuxtLink to="/connexion">Connexion</NuxtLink>
</v-btn>
      </v-toolbar>

      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>