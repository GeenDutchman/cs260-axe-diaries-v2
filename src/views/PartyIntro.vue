<template>
    <div class="full">
        <div class="section">
            <h1>{{party.party_name}}</h1>
            <p><span class="wizard-script">This is where we introduce ourselves, and write a little background about us. </span></p>
            <router-link :to="blogRoute" class='btn btn-primary'>See blog!</router-link>
        </div>
        <hr />
        <div v-for="person in party.party_members" :key="person.adventurer_id" :class="['section', person.adventurer_script]">
            <h3>{{person.adventurer_name}}</h3>
            <p>{{person.adventurer_intro}}</p>
            <hr />
        </div>
        <div class="section">
            <router-link :to="blogRoute" class='btn btn-primary'>See blog!</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartyIntro',
    computed: {
        party() {
            return this.$root.$data.parties[this.$route.params.id];
        },
        blogRoute() {
            return this.$route.path + '/blog';
        }
    }
}
</script>

<style scoped>
.right {
    float: right;
    margin-left: auto;
}

.btn {
    display: flex;
    align-self: center;
}
</style>