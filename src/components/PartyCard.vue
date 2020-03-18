<template>
<div class="card back-color-primary-1 color-primary-4">
    <router-link :to="link">
        <img class="card-img-top" :src="src" :alt="party_name" />
    </router-link>
    <div class="card-body">
        <h5 class="card-title" v-text="party_name"></h5>
        <div :id="idGenerator('party_description', party_id)" class="container-fluid collapse">
            <span v-if="party_description">{{party_description}}</span>
            <div class="row" v-if="party_members.length > 0">
                <div class="col-6">
                    <h6>Name:</h6>
                </div>
                <div class="col-6">
                    <h6>Role:</h6>
                </div>
            </div>
            <div v-for="person in party_members" :key="person.adventurer_id" :class="[person.adventurer_script, 'row']">
                <div class="col-6">{{person.adventurer_name}}</div>
                <div class="col-6">{{person.adventurer_class}}</div>
            </div>
        </div>
        <a :href="idGenerator('#party_description', party_id)" class="btn btn-secondary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="#party_description">Expand</a>
        <router-link :to="link" class="btn btn-primary">Go!</router-link>
    </div>
</div>
    
</template>

<script>
export default {
    name: 'PartyCard',
    props: {
        src: String,
        party_id: Number,
        party_name: String,
        party_description: String,
        party_members: Array,
        link: String,
    },
    computed: {
        imageAlt(name) {
            return name + " image";
        }
    },
    methods: {
        idGenerator(thing, id) {
            return String(thing) + String(id);
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