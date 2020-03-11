<template>
  <div id="switch_menu" class="switch-sm-row-to-lg-col">
    <nav
      id="index-navbar"
      class="nav navbar navbar-expand-lg navbar-dark back-color-primary-2 switch-sm-row-to-lg-col nav-pills"
    >
      <router-link to="/">
        <img src="../assets/logo.png" width="50" height="auto" alt="Axe diaries logo" />
      </router-link>
      <div id="menu-list" class="collapse navbar-dark navbar-collapse switch-sm-row-to-lg-col">
        <ul class="nav nav-pills switch-sm-row-to-lg-col">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.switch-sm-row-to-lg-col {
  display: flex;
  flex-direction: row;
  width: 100%;
}

@media (min-width: 992px) {
  .switch-sm-row-to-lg-col {
    flex-direction: column !important;
    width: auto;
    justify-content: flex-start;
  }
}
</style>

<script>
export default {
  name: 'SwitchMenu',
  
}
</script>