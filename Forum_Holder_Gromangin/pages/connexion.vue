<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Connexion</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="loginUser(email, password)">
              <v-text-field label="Mail d'utilisateur" v-model="email" required autocomplete="mail"></v-text-field>
              <v-text-field label="Mot de passe" v-model="password" type="password" required
                autocomplete="current-password"></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit">Se connecter</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/user';
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const userStore = useUserStore();

    const loginUser = () => {
      userStore.loginUser(email.value, password.value);
    };

    return {
      email,
      password,
      loginUser
    };
  }
};
</script>

<style scoped></style>