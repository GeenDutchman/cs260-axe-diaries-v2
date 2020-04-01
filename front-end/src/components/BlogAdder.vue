<template>
  <div class="section">
    <hr />
    <h2>Add an entry</h2>
    <form @submit.prevent="addEntry" class="form-group adderForm">
      <select id="personSelector" class="form-control" v-model="adventurer" aria-placeholder="Select a party member">
        <option :value="undefined">Select a  party member</option>
        <option v-for="person in members" :key="person.adventurer_id" :value="person">{{person.adventurer_name}}</option>
      </select>
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
      date: undefined
    };
  },
  computed: {
    members() {
      return this.$root.$data.parties[this.$route.params.id].party_members;
    },
    enableSubmit() {
      return this.adventurer !== undefined && this.entry.length > 0;
    }
  },
  methods: {
    addEntry() {
      if (this.adventurer !== undefined && this.entry.length > 0) {
        let entries = this.$root.$data.parties[this.$route.params.id].party_entries;
        const newEntry = {entry_id: entries.length, text: this.entry, author_name: this.adventurer.adventurer_name, author_id: this.adventurer.adventurer_id, author_script: this.adventurer.adventurer_script};
        entries.unshift(newEntry);
        this.adventurer = undefined;
        this.entry = '';
        this.date = '';
      }
    },
    selectPersion(someone) {
        this.adventurer = someone;
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

.adderForm {
  flex-direction: column;
  display: flex;
  max-width: 80%;
  min-width: 70%;
  align-self: center;
  padding: 1rem;
}
</style>