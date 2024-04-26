<template>
  <v-container>
    <v-row>
      <v-col justify="center">
        <v-card cols="12" sm="8" md="6" >
          <v-card-title class="headline">Inscription</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="registerUser(name, email, password, passwordrepeat)">
              <v-text-field label="Nom" name="name" type="text" v-model="name" required></v-text-field>
              <v-text-field label="Email" name="email" type="email" v-model="email" required></v-text-field>
              <v-text-field label="Mot de passe" name="password" type="password" v-model="password"
                required></v-text-field>
              <v-text-field label="Confirmer votre mot de passe" name="passwordrepeat" type="password" v-model="passwordrepeat"
                required></v-text-field>
              <v-btn color="blue lighten-4" type="submit">S'inscrire</v-btn>
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
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const passwordrepeat = ref("");
    const userStore = useUserStore();

    const registerUser = () => {
      userStore.registerUser(name.value, email.value, password.value, passwordrepeat.value, false);
    };

    return {
      name,
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
