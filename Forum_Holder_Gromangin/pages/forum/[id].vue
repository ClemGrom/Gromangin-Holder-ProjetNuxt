<template>
  <input type="text" v-model="name" placeholder="Nom du sujet" />
  <v-btn @click="addSujet">Ajouter un sujet</v-btn>
    <div>
        <h1>Sujets</h1>
        <p v-if="forum && forum.length > 0">Voici les sujets du forum: {{forum[0].name}}</p>
        <p v-else>Aucun forum trouvé</p>
        <p>Nombre de Sujet {{ this.sujets.length }}</p>
        <v-list>
            <v-list-item v-for="sujet in sujets" :key="sujet.id">
                <v-list-item-content>
                    <v-list-item-title>
                        <nuxt-link :to="`/forum/sujet/${sujet.id}`">{{ sujet.name }}</nuxt-link>
                    </v-list-item-title>
                    <div>{{ sujet.created }}</div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        
    </div>
</template>

<script>

// const addFav = async (id) => {
//     const res = await fetch(`http://localhost:3000/api/fav`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id }),
//     })
//     const data = await res.json()
//     console.log(data)
// }

export default {
    data() {
        return {
            forum: null,
            sujets: [],
            name: '',
        };
    },
    async mounted() {
        const data = await this.fetchForum(this.$route.params.id);
        this.forum = data.forums;
        const sujets = await this.fetchSujets(this.$route.params.id);
        this.sujets = sujets.sujets;
    },
    methods: {
        async fetchForum(id) {
            const response = await fetch(`http://localhost:3000/api/forums?id=${id}`);
            const data = await response.json();
            return data;
        },
        async fetchSujets(id) {
            const response = await fetch(`http://localhost:3000/api/sujets?forum_id=${id}`);
            const data = await response.json();
            return data;
        },
        
        async addSujet() {
         const id = this.$route.params.id;
            const sujetData = {
                name: this.name,
                forum_id: this.$route.params.id,
                
            };
            try {
                const response = await fetch(`http://localhost:3000/api/sujets?forum_id=${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sujetData),
                });
                
            } catch (error) {
                console.error('Error:', error);
            }
        },
    }    
};
</script>