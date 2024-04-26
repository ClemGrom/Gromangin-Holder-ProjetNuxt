<template>
  <NuxtLayout>
    <v-app>
      <v-toolbar color="light-blue-darken-3">
        <v-img src="@/assets/logo.png" alt="Forum Logo" max-width="50" class="ml-3"></v-img>
        <v-toolbar-title>
          <NuxtLink to="/" class="boutonnav">PEDDIT</NuxtLink>
        </v-toolbar-title>

        <v-btn>
          <NuxtLink to="/" class="boutonnav">Forum</NuxtLink>
        </v-btn>
        <v-btn>
          <NuxtLink to="/test" class="boutonnav">Test</NuxtLink>
        </v-btn>

        <v-btn v-if="!userStore.userEmail">
          <NuxtLink to="/inscription" class="boutonnav">Inscription</NuxtLink>
        </v-btn>
        <v-btn v-if="!userStore.userEmail">
          <NuxtLink to="/connexion" class="boutonnav">Connexion</NuxtLink>
        </v-btn>
        <v-btn v-if="isAdmin">
          <NuxtLink to="/admin" class="boutonnav">Admin</NuxtLink>
        </v-btn>
        <v-btn v-if="userStore.userEmail" @click="logout">
          Deconnexion
        </v-btn>
      </v-toolbar>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/user';

export default {
  async setup() {
    const userStore = useUserStore();
    const isAdmin = ref(false); // use a ref to make it reactive

    // fetch the admin status when the component is created
    isAdmin.value = await userStore.getAdmin();

    const logout = () => {
      userStore.logout();
    };

    return {
      userStore,
      logout,
      isAdmin, // make sure to return it here
    };
  },
};
</script>

<style scoped>
.boutonnav {
  text-decoration: none;
  color: white;

}
</style>
