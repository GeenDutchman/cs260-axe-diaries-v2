<template>
  <div class="full brand">
    <div class="section">
      <h1>Welcome{{ user ? ' ' + user.username : ''}}!</h1>
    </div>
    <div class="card-columns">
      <div class="card color-primary-4" v-if="user" :class="[user.script]">
        <div id="info" class="card-body">
          <p>Given Name: {{user.given_name}}</p>
          <p>Family Name: {{user.family_name}}</p>
          <p>Hails From: {{user.hails_from}}</p>
          <p>Party Role: {{user.party_role}}</p>
          <p>Intro: {{user.intro}}</p>
        </div>
      </div>

      <div v-for="party in this.invited" :key="party._id">
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

      <div v-for="party in this.parties" :key="party._id">
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
        src="/assets/logo.png"
        party_id="-1"
        link='/parties/make'
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
  name: "User-view",
  components: {
    PartyCard
  },
  data() {
    return {
      parties: [],
      invited: [],
      user: undefined,
    };
  },
  computed: {

  },
  async created() {
    try {
      this.user = await this.$root.getUser();
      await this.getMembership();
    } catch (error) {
      this.$root.getUser(undefined, true);
      this.$root.$router.push({name: "Account"});
    }
  },
  methods: {
    async getMembership() {
      try {
        let response = await axios.get("/api/party/membership");
        console.log(response);
        this.parties = response.data.parties;
        this.invited = response.data.invited;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>