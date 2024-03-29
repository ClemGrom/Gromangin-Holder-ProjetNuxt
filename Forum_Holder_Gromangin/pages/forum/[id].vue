<template>
    <div>
        <h1>Sujets</h1>
        <p v-if="forum && forum.length > 0">Voici les sujets du forum: {{forum[0].name}}</p>
        <p v-else>Aucun forum trouvé</p>
        <v-list>
            <v-list-item v-for="sujet in sujets" :key="sujet.id">
                <v-list-item-content>
                    <v-list-item-title>
                        <nuxt-link :to="`/sujet/${sujet.id}`">{{ sujet.name }}</nuxt-link>
                    </v-list-item-title>
                    <div>{{ sujet.created }}</div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        
    </div>
</template>

<script>

const addFav = async (id) => {
    const res = await fetch(`http://localhost:3000/api/fav`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    })
    const data = await res.json()
    console.log(data)
}

export default {
    data() {
        return {
            forum: null,
            sujets: [],
        };
    },
    async mounted() {
        const data = await this.fetchForum(this.$route.params.id);
        this.forum = data.forums;
        const sujets = await this.fetchSujets(this.$route.params.id);
        this.sujets = sujets.sujets;

        const { data: posts } = await useFetch(`http://localhost:3000/api/sujets?forum_id=${id}`)
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
        }
        

    }

    
};
</script>