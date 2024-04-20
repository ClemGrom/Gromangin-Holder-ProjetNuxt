<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="registerUser(email, password, passwordrepeat)">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div>
                <label for="passwordrepeat">Mot de passe répété:</label>
                <input type="password" id="passwordrepeat" v-model="passwordrepeat" required>
            </div>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
let email = "";
let password = "";
let passwordrepeat = "";
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { registerUser } = userStore
</script>

<style scoped>
div {
    margin: 0 auto;
    width: 50%;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 10%;
}
</style>