<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1>Admin</h1>
          <v-btn color="primary" @click="selectAll">Sélectionner tout</v-btn>
          <v-btn color="error" @click="deleteSelected">Supprimer les forums sélectionnés</v-btn>
          <v-list>
            <v-list-item v-for="forum in forums" :key="forum.id">
              <v-list-item-content>
                <v-list-item-title>{{ forum.name }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox :id="forum.id" v-model="forum.checked"></v-checkbox>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
export default {
    data() {
        return {
            forums: [],
            error: null,
        };
    },
    async created() {
        await this.loadForums();
    },
    methods: {
        selectAll() {
            if (this.forums.every(forum => forum.checked)) {
                this.forums.forEach(forum => forum.checked = false);
            } else {
                this.forums.forEach(forum => forum.checked = true);
            }
        },
        async loadForums() {
            try {
                const response = await fetch('http://localhost:3000/api/forums');
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement des forums');
                }
                const data = await response.json();
                this.forums = data.forums;
            } catch (error) {
                this.error = 'Erreur lors du chargement des forums';
                console.error('Erreur :', error);
            }
        },
    },
    async deleteSelected() {
    for (const forum of this.forums) {
      if (forum.checked) {
        try {
          const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ forum_id: forum.id })
          };
          await fetch('http://localhost:3000/api/messagesforum', options);
          await fetch('http://localhost:3000/api/sujetsforums', options);
          await fetch('http://localhost:3000/api/forums', options);
        } catch (error) {
          console.error('Erreur lors de la suppression du forum :', error);
        }
      }
    }
    // Refresh the list of forums
    await this.loadForums();
  },
};
</script>