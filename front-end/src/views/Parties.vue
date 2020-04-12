<template>
  <div class="full">
    <div class="section">
      <h1>The Parties of Axe Diaries!</h1>
    </div>
    <div class="card-columns">
      <!-- <img src="../assets/logo.png"> -->
      <party-card
        v-if="!isSignedIn"
        src="/assets/logo.png"
        party_id
        link="/account"
        party_name="Sign Up!"
        party_description="Sign up and make your own party!"
        v-bind:party_members="[]"
        :invites="[]"
      />
      <div v-for="party in this.parties" :key="party.party_id">
        <party-card
          :src="(party.party_image ? party.party_image : '/assets/logo-bw.svg')"
          :party_id="party._id"
          :party_name="party.party_name"
          :party_description="party.party_description"
          :party_members="party.party_members"
          :link="(party.party_page ? party.party_page : '/parties/' + party._id)"
          :invites="party.party_invites"
        />
      </div>
      <party-card
        v-if="isSignedIn"
        src="/assets/logo.png"
        party_id="-1"
        link="/parties/make"
        party_name="Make a party!"
        party_description="Make your own party!"
        v-bind:party_members="[]"
        :invites="[]"
      />
    </div>
  </div>
</template>

<script>
import PartyCard from "../components/PartyCard.vue";
import axios from "axios";
export default {
  name: "Parties",
  data() {
    return {
      parties: [],
      isSignedIn: false
    };
  },
  async created() {
    await this.getParties();
    if (await this.$root.getUser()) {
      this.isSignedIn = true;
    }
  },
  methods: {
    async getParties() {
      try {
        let result = await axios.get("/api/party");
        // console.log(result);
        this.parties = result.data.parties;
      } catch (error) {
        // console.error(error);
      }
    }
  },
  components: {
    PartyCard
  }
};
</script>