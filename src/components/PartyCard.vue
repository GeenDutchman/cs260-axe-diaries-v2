<template>
<div class="card back-color-primary-1 color-primary-4">
    <router-link :to="link">
        <img class="card-img-top" :src="src" :alt="party_name" />
    </router-link>
    <div class="card-body">
        <h5 class="card-title" v-text="party_name"></h5>
        <p id="party_description" class="container-fluid collapse" v-text="party_description"></p>
        <a href="#party_description" class="btn btn-secondary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="#party_description">Expand</a>
        <router-link :to="link" class="btn btn-primary">Go!</router-link>
    </div>
</div>
    
</template>

<script>
export default {
    name: 'PartyCard',
    props: {
        src: String,
        party_name: String,
        party_description: String,
        party_members: Array,
        party_positions: Array,
        link: String,
    },
    computed: {
        imageAlt(name) {
            return name + " image";
        }
    }
}
</script>

<style scoped>
.card {
    width: auto;
    align-self: center;
}
</style>