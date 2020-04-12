<template>
  <div id="switch_menu" class="switch-sm-row-to-lg-col">
    <nav
      id="index-navbar"
      class="nav navbar navbar-expand-lg navbar-dark back-color-primary-2 switch-sm-row-to-lg-col nav-pills"
    >
      <router-link to="/">
        <img src="../../public/assets/logo.png" width="50" height="auto" alt="Axe diaries logo" />
      </router-link>
      <button
        id="menu-toggle"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#menu-list"
        aria-controls="menu-list"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon secondary_color"></span>
      </button>
      <div id="menu-list" class="collapse navbar-dark navbar-collapse switch-sm-row-to-lg-col">
        <ul class="nav nav-pills switch-sm-row-to-lg-col">
          <li class="nav-item">
            <router-link class="nav-link" to="/account">Account</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/parties">Parties</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item" v-if="this.checkUser()" @click="logout">
            <router-link class="nav-link" to="/" >Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.nav-pills .nav-link {
  background-color: var(--color-primary-4);
  margin: 5px;
}

.nav-pills .nav-link :hover {
  background-color: var(--color-primary-3);
}

@media (min-width: 992px) {
  .navbar {
    height: 100%;
    margin-right: 5px;
  }
}
</style>

<script>
import axios from 'axios';
export default {
  name: "SwitchMenu",
  data() {
    return {
      user: this.$root.$data.user
    };
  },
  methods: {
    async logout() {
      try {
        await axios.delete('/api/users/logout');
        await this.$root.getUser(undefined, true);
      } catch (error) {
        // console.error(error);
      }
    },
    checkUser() {
      return this.$root.$data.user;
    }
  }
};
</script>