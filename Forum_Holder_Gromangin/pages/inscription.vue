<template>
    <v-container>
      <v-row >
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="blue lighten-4" >
              <v-toolbar-title>Inscription</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="registerUser(email, password, passwordrepeat)">
                <v-text-field
                  label="Email"
                  name="email"
                  type="email"
                  v-model="email"
                  required
                ></v-text-field>
                <v-text-field
                  label="Mot de passe"
                  name="password"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
                <v-text-field
                  label="Mot de passe répété"
                  name="passwordrepeat"
                  type="password"
                  v-model="passwordrepeat"
                  required
                ></v-text-field>
                <v-btn color="blue lighten-4" type="submit">S'inscrire</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script >
import { ref } from 'vue';
import { useUserStore } from '../store/user';

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const passwordrepeat = ref("");
    const userStore = useUserStore(); 

    const registerUser = () => {
      userStore.registerUser(email.value, password.value, passwordrepeat.value);
    };

    return {
      email,
      password,
      passwordrepeat,
      registerUser
    };
  }
}
</script>


<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
