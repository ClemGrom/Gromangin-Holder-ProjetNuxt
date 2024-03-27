<template>
    <div>
        <h1>Erreur 404</h1>
        <p>La page demandée n'existe pas.</p>
        <img src="https://http.cat/404" alt="Erreur 404">
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: 'Erreur 404',
        };
    },
};
</script>