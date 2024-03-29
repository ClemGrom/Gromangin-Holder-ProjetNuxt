<template>
    <div>

        <v-list>
            <v-list-item v-for="message in data" :key="message.id">
                <v-list-item-content>
                    <nuxt-link :to="`/message/${message.id}`">{{ message.name }}</nuxt-link>
                    <p>{{ message.created }}</p>
                    <h1>{{ message.name }}</h1>
                    <p>{{ message.date }}</p>
                    <p>{{ message.content }}</p>
                    <p>{{ message.date_modif }}</p>
                </v-list-item-content>
            </v-list-item>
        </v-list>

    </div>
</template>
<script>

const fetchMessage = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    return data;
};
</script>