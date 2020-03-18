<template>
    <div class="full">
        <div class="section">
            <h1>{{party.party_name}}</h1>
            <p class="wizard-script">This is where we introduce ourselves, and write a little background about us.</p>
        </div>
        <hr />
        <div v-for="person in party.party_members" :key="person.adventurer_id" :class="['section', person.adventurer_script]">
            <h3>{{person.adventurer_name}}</h3>
            <p>{{person.adventurer_intro}}</p>
            <hr />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartyIntro',
    computed: {
        party() {
            return this.$root.$data.parties[this.$route.params.id];
        }
    }
}
</script>