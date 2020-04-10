<template>
  <div class="full brand">
    <div class="section">
      <h1>Welcome {{user.username}}!</h1>
    </div>
    <div class="card-columns">
      <div class="card color-primary-4" :class="[user.script]">
        <div id="info" class="card-body">
          <p>Given Name: {{user.given_name}}</p>
          <p>Family Name: {{user.family_name}}</p>
          <p>Hails From: {{user.hails_from}}</p>
          <p>Party Role: {{user.party_role}}</p>
          <p>Intro: {{user.intro}}</p>
        </div>
      </div>
      <party-card
        src="/assets/logo.png"
        v-bind:party_id="-1"
        link='/parties/make'
        party_name="Make a party!"
        party_description="Make your own party!"
        v-bind:party_members="[]"
      />

      <div v-for="party in this.parties" :key="party._id">
        <party-card
          :src="(party.party_image ? party.party_image : '/assets/logo-bw.svg')"
          :party_id="party.party_id"
          :party_name="party.party_name"
          :party_description="party.party_description"
          :party_members="party.party_members"
          :link="(party.party_page ? party.party_page : '/parties/' + party.party_id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PartyCard from "../components/PartyCard.vue";
import axios from "axios";
export default {
  name: "User-view",
  components: {
    PartyCard
  },
  data() {
    return {
      parties: []
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  async created() {
    try {
      await this.$root.getUser();
      await this.getMembership();
    } catch (error) {
      this.$root.getUser(undefined, true);
      this.$root.$router.push("Account");
    }
  },
  methods: {
    async getMembership() {
      try {
        let response = await axios.get("/api/party/membership");
        console.log(response);
        this.parties = response.data.parties;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>