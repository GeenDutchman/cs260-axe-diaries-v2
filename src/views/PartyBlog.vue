<template>
    <div class="full">
        <div class="section">
            <h1>{{party.party_name}}</h1>
        </div>
        <hr />
        <div v-for="entry in blogEntries" :key="entry.entry_id" :class="[ 'card', entry.author_script,  'section', 'blogItem', 'color-primary-4']" >
            <p>{{entry.text}}</p>
            <p class="signature">——{{(entry.date ? entry.date  + '——': '')}}{{entry.author_name}}</p>
        </div>
        <BlogAdder v-if="adder_enabled" ></BlogAdder>
        <div class="section center">
            <p @click="toggleAdder">There are no earlier posts</p>
        </div>
    </div>
</template>

<script>
import BlogAdder from "../components/BlogAdder.vue";
export default {
    name: 'PartyBlog',
    components: {
        BlogAdder
    },
    data() {
        return {
            adder_enabled: false
        }
    },
    computed: {
        blogEntries() {
            return this.$root.$data.parties[this.$route.params.id].party_entries;
        },
        party() {
            return this.$root.$data.parties[this.$route.params.id];
        }
    },
    methods: {
        toggleAdder() {
            this.adder_enabled = !this.adder_enabled;
        }
    }
}
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