<template>
<div class="card back-color-primary-1">
    <a :href="link">
        <img class="card-img-top" :src="image_src" :alt="imageAlt" />
    </a>
    <div class="card-body">
        <h5 class="card-title" v-text="party_name"></h5>
        <p id="party_description" v-text="party_description"></p>
        <a href="#party_description" class="btn btn-secondary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="#party_description">Expand</a>
        <a :href="link" class="btn btn-primary">Go!</a>
    </div>
</div>
    
</template>

<script>
export default {
    name: 'PartyCard',
    props: {
        image_src: String,
        party_name: String,
        party_description: String,
        party_members: Array,
        party_positions: Array,
        link: String,
    },
    computed: {
        imageAlt() {
            return this.props.party_name + " image";
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