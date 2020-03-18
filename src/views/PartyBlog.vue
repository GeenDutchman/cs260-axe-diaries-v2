<template>
    <div class="full">
        <div class="section">
            <h1>{{party.party_name}}</h1>
        </div>
        <hr />
        <div v-for="entry in blogEntries" :key="entry.entry_id" :class="[ 'card', entry.author_script,  'section', 'blogItem', 'color-primary-4']" >
            <p>{{entry.text}}</p>
            <p class="right">--<span v-text="(entry.date ? entry.date  + '-': '')"></span><span>{{entry.author_name}}</span></p>
        </div>
        <div class="section center">
            <p>There are no earlier posts</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartyBlog',
    computed: {
        blogEntries() {
            return this.$root.$data.parties[this.$route.params.id].party_entries;
        },
        party() {
            return this.$root.$data.parties[this.$route.params.id];
        }
    }
}
</script>

<style scoped>
.right {
    display: flex;
    justify-items: end;
    margin-left: auto;
}

.center {
    margin-left: auto;
    margin-right: auto;
}

.blogItem {
    display: flex;
    justify-content: space-around;
    max-width: 70%;
    min-width: 60rem;
    align-self: center;
    padding: 1rem;
    margin: 1rem;
}

</style>