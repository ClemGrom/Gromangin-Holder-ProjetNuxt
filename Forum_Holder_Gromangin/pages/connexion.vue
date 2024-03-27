<template>
    <div>
        <h1>Connexion</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">Nom d'utilisateur:</label>
                <input type="text" id="username" v-model="username" required>
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Se connecter</button>
        </form>
    </div>
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
div{
    margin: 0 auto;
    width: 50%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 10%;
}
</style>