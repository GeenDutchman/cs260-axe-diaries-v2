<template>
    <div class="full">
        <User v-if="user" />
        <Account v-else />
    </div>
</template>

<script>
import Account from '../components/Account.vue';
import User from '../components/User.vue';
// import axios from 'axios'
export default {
  name: 'AccountWall',
  components: {
    Account,
    User,
  },
  async created() {
    try {
      await this.$root.getUser();
    } catch (error) {
      await this.$root.getUser(undefined, true);
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }  
}
</script>