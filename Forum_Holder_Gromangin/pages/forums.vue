<template>
    <div>
        <h1>Forum</h1>
        <p>Voici les messages du forum:</p>
        <ul>
            <li v-for="message in messages" :key="message.id">
                <h2>{{ message.title }}</h2>
                <p>{{ message.content }}</p>
            </li>
        </ul>
    </div>


</template>


<script>
</script>