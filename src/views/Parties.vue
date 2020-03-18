<template>
    <div class="full">
        <div class="section">
            <h1>The Parties of Axe Diaries!</h1>
        </div>
        <div class="card-columns">
            <!-- <img src="../assets/logo.png"> -->
            <party-card src="/assets/logo.png" link="/account" party_name="Sign Up!" party_description="Sign up and make your own party!" />
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