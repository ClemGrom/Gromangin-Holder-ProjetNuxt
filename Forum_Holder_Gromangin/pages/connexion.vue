<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Connexion</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                label="Nom d'utilisateur"
                v-model="username"
                required
                autocomplete="username"
              ></v-text-field>
              <v-text-field
                label="Mot de passe"
                v-model="password"
                type="password"
                required
                autocomplete="current-password"
              ></v-text-field>
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
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            
            console.log('Nom d\'utilisateur:', this.username);
            console.log('Email:', this.email);
            console.log('Mot de passe:', this.password);
        },
    },
};
</script>

<style scoped>

</style>