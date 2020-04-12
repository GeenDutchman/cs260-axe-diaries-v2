<template>
  <div class="section">
    <hr />
    <h2>Invite a friend</h2>
    <form @submit.prevent="inviteUser" class="form-group inviteForm">
      <input class="form-control" v-model="invitation" placeholder="Friend's username" />
      <p v-if="feedback">{{feedback}}</p>
      <br />
      <button class='btn btn-secondary center' type=submit :disabled="!invitation">Invite</button>
    </form>
    <hr />
    <h2>Add an entry</h2>
    <form @submit.prevent="addEntry" class="form-group adderForm">
      <!-- <select id="personSelector" class="form-control" v-model="adventurer" aria-placeholder="Select a party member">
        <option :value="undefined">Select a party member</option>
        <option v-for="person in this.$parent.members" :key="person._id" :value="person">{{person.given_name}}</option>
      </select> -->
      <p></p>
      <textarea v-model="entry" class="form-control" required placeholder="What happened?"></textarea>
      <p></p>
      <input class="form-control" v-model="date" placeholder="Date" />
      <br />
      <button class='btn btn-secondary center' type="submit" :disabled="!enableSubmit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "BlogAdder",
//   props: {
//       members: Array,
//       entries: Array
//   },
  data() {
    return {
      adventurer: undefined,
      entry: "",
      date: undefined,
      invitation: '',
      feedback: '',
    };
  },
  computed: {
    enableSubmit() {
      return this.adventurer !== undefined && this.entry.length > 0;
    }
  },
  async created() {
    await this.selectPersion();
  },
  methods: {
    async addEntry() {
      if (this.adventurer !== undefined && this.entry.length > 0) {
        // let entries = this.$root.$data.parties[this.$route.params.id].party_entries;
        // const newEntry = {entry_id: entries.length, text: this.entry, author_name: this.adventurer.adventurer_name, author_id: this.adventurer.adventurer_id, author_script: this.adventurer.adventurer_script};
        // entries.unshift(newEntry);
        let entry = {text: this.entry, author_id: this.adventurer._id, date: (this.date ? this.date : ''), party_id: this.$route.params.id};
        try {
          let result = await axios.post('/api/blog/', entry);
          // console.log(result);
          // this.$parent.blogEntries.push(result.data.entry);
          await this.$parent.getEntries();
        } catch (error) {
          // console.error(error);
        }
        this.adventurer = undefined;
        this.entry = '';
        this.date = '';
      }
    },
    async selectPersion() {
        this.adventurer = await this.$root.getUser();
    },
    async inviteUser() {
      let oldFeedback = this.feedback;
      if(this.invitation) {
        try {
          let result = await axios.put('/api/party/invite', {username: this.invitation, party_id: this.$route.params.id});
          // console.log(result);
          this.feedback = result.data.message;
        } catch (error) {
          this.feedback = "an error occured!";
          // console.error(error);
        }
        this.invitation = '';
        setTimeout(() => {this.feedback = oldFeedback;}, 3000);
      }
    }
  }
};
</script>

<style scoped>
.center {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
}

.inviteForm,
.adderForm {
  flex-direction: column;
  display: flex;
  max-width: 80%;
  min-width: 70%;
  align-self: center;
  padding: 1rem;
}
</style>