<template>
  <div id="app" class="back-color-primary-0 color-primary-1 switch-lg-row-to-sm-col">
    <switch-menu/>
    <router-view/>
    <axe-footer/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* CSS - Cascading Style Sheet 
   Palette color codes 
   Palette URL: http://paletton.com/#uid=1000u0k0yik06tE++nu0XcM265X 

   Feel free to copy&paste color codes to your application 


   As hex codes

   COLORS!! **/

:root {
  --color-primary-0: #929090;
  --color-primary-1: #ECECEC;
  --color-primary-2: #BB0000;
  --color-primary-3: #666363;
  --color-primary-4: #2f2c2c;
}

.color-primary-0 { color: var(--color-primary-0) }	/* Main Primary color */
.color-primary-1 { color: var(--color-primary-1) }
.color-primary-2 { color: var(--color-primary-2) }
.color-primary-3 { color: var(--color-primary-3) }
.color-primary-4 { color: var(--color-primary-4) }

.back-color-primary-0 { background-color: var(--color-primary-0) }	/* Main Primary color */
.back-color-primary-1 { background-color: var(--color-primary-1) }
.back-color-primary-2 { background-color: var(--color-primary-2) }
.back-color-primary-3 { background-color: var(--color-primary-3) }
.back-color-primary-4 { background-color: var(--color-primary-4) }

.brand {
  background-image: url("./assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
  alt: "Axe diaries logo"
}

.full {
  display: flex;
  /* min-height: 100vh;
  min-width: 100%; */
  flex-grow: 1;
  position: relative;
  align-items: stretch;

  flex-direction: column;
}

.section {
  display: flex;
  flex-direction: column !important;
}

.switch-sm-row-to-lg-col {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.switch-lg-row-to-sm-col {
  display: flex;
  flex-direction: column;
  width: auto;
}

@media (min-width: 992px) {
  .switch-sm-row-to-lg-col {
    display: flex;
    flex-direction: column !important;
    width: auto;
    justify-content: flex-start;
  }

  .switch-lg-row-to-sm-col {
    display: flex;
    flex-direction: row !important;
    width: 100%;
  }
}
</style>

<style scoped>
#app {
  display: flex;
  min-height: 100vh;
  min-width: 100%;
  position: relative;
  flex-direction: column;
  align-items: stretch;
}
</style>

<script>
import SwitchMenu from "./components/SwitchMenu.vue"
import AxeFooter from "./components/AxeFooter.vue"
export default {
  name: 'Main',
  components: {
    SwitchMenu,
    AxeFooter,
  }
  
}
</script>
