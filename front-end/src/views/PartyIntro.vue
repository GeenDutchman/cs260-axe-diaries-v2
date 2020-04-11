<template>
  <div class="full">
    <div v-if="this.party">
      <div class="section">
        <h1>{{party.party_name}}</h1>
        <p>
          <span class=''>{{party.party_description ? party.party_description : 'This is where we introduce ourselves, and write a little background about us!'}}</span>
        </p>
        <router-link :to="blogRoute" class="btn btn-primary">See blog!</router-link>
      </div>
      <hr />
      <div v-for="person in this.members" :key="person._id" :class="['section', person.script]">
        <h3>{{person.given_name}}</h3>
        <p>{{person.intro}}</p>
        <hr />
      </div>
    </div>
    <div v-else>
      <h1>Loading...</h1>
    </div>
    <div class="section">
      <router-link :to="blogRoute" class="btn btn-primary">See blog!</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PartyIntro",
  data() {
    return {
      party: undefined,
      members: []
    };
  },
  async created() {
    await this.getParty();
  },
  methods: {
    async getMembers() {
      if (this.party.party_members.length > 0) {
        try {
          let result = await axios.post("/api/users/", {
            ids: this.party.party_members
          });
          console.log(result);
          this.members = result.data.users;
        } catch (error) {
          console.error(error);
        }
      }
    },
    async getParty() {
      try {
        // return this.$root.$data.parties[this.$route.params.id];
        let result = await axios.get("/api/party/" + this.$route.params.id);
        console.log(result);
        this.party = result.data.party;
        await this.getMembers();
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    blogRoute() {
      return this.$route.path + "/blog";
    }
  }
};
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