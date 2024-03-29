<template>
    <div>
        <h1>Sujets</h1>
        <p>Voici les sujets du forum:</p>
        <v-list>
            <v-list-item v-for="sujet in data" :key="sujet.id">
                <v-list-item-content>
                    <nuxt-link :to="`/sujet/${sujet.id}`">{{ sujet.name }}</nuxt-link>
                    <p>{{ sujet.created }}</p>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </div>
</template>

<script>

const fetchSujets = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
};

</script>