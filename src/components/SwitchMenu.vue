<template>
  <div id="switch_menu" class="switch-sm-row-to-lg-col">
    <nav
      id="index-navbar"
      class="nav navbar navbar-expand-lg navbar-dark back-color-primary-2 switch-sm-row-to-lg-col nav-pills"
    >
      <router-link to="/">
        <img src="../assets/logo.png" width="50" height="auto" alt="Axe diaries logo" />
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
            <router-link to="/account">Account</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@media (min-width: 992px) {
  .navbar {
    height: 100%;
    margin-right: 5px;
  }
}
</style>

<script>
export default {
  name: "SwitchMenu"
};
</script>