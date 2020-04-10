<template>
  <div class="full">
    <div class="section" v-if="this.party">
      <h1>{{party.party_name}}</h1>
    </div>
    <hr />
    <BlogAdder v-if="adder_enabled"></BlogAdder>
    <div
      v-for="entry in blogEntries"
      :key="entry._id"
      :class="[ 'card', script(entry.author_id),  'section', 'blogItem', 'color-primary-4']"
    >
      <p>{{entry.text}}</p>
      <p class="signature">——{{(entry.date ? entry.date + '——': '')}}{{name(entry.author_id)}}</p>
    </div>
    <div class="section center">
      <p @click.prevent="toggleAdder">There are no earlier posts</p>
    </div>
  </div>
</template>

<script>
import BlogAdder from "../components/BlogAdder.vue";
import axios from "axios";
export default {
  name: "PartyBlog",
  components: {
    BlogAdder
  },
  async created() {
    await this.getParty();
    await this.getEntries();
    await this.toggleAdder(false);
  },
  data() {
    return {
      adder_enabled: false,
      blogEntries: [],
      party: undefined,
      members: []
    };
  },
  computed: {
      script(user_id) {
          let user = this.members.filter((person) => {
              return person._id === user_id;
          });
          return user.script ? user.script : '';
      },
      name(user_id) {
          let user = this.members.filter((person) => {
              return person._id === user_id;
          });
          let the_name = user.given_name ? user.given_name : user.username;
          return the_name;
      }
  },
  methods: {
    async toggleAdder(redirect=true) {
      let user = await this.$root.getUser();
      if (!user && redirect) {
        this.$root.$router.push({name: 'Account'});
      } else {
        this.adder_enabled = !this.adder_enabled && this.party.party_members.includes(user._id);
      }
    },
    async getEntries() {
      try {
        let result = await axios.get("/api/blog/" + this.$route.params.id);
        console.log(result);
        this.entries = result.data.entries;
      } catch (error) {
        console.error(error);
      }
    },
    async getParty() {
      try {
        let result = await axios.get("/api/party/" + this.$route.params.id);
        console.log(result);
        this.party = result.data.party;
        await this.getMembers();
      } catch (error) {
        console.error(error);
      }
    },
    async getMembers() {
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
  }
};
</script>

<style scoped>
.signature {
  display: flex;
  justify-items: end;
  margin-left: auto;
  text-align: end;
}

.center {
  margin-left: auto;
  margin-right: auto;
}

.blogItem {
  display: flex;
  justify-content: space-around;
  max-width: 70%;
  min-width: min-content;
  align-self: center;
  padding: 1rem;
  margin: 1rem;
}
</style>