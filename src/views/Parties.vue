<template>
    <div class="full">
        <div class="section">
            <h1>The Parties of Axe Diaries!</h1>
        </div>
        <div class="card-columns">
            <!-- <img src="../assets/logo.png"> -->
            <party-card src="/assets/logo.png" v-bind:party_id="-1" link="/account" party_name="Sign Up!" party_description="Sign up and make your own party!"  v-bind:party_members="[]"/>
            <div v-for="party in this.$root.$data.parties" :key="party.party_id">
                <party-card :src="(party.party_image ? party.party_image : '/assets/logo-bw.svg')" :party_id="party.party_id" :party_name="party.party_name" :party_description="party.party_description" :party_members="party.party_members" :link="(party.party_page ? party.party_page : '/parties/' + party.party_id)" />
            </div>
        </div>
    </div>
</template>

<script>
import PartyCard from "../components/PartyCard.vue"
export default {
    name: "Parties",
    components: {
        PartyCard,
    }
    
}
</script>