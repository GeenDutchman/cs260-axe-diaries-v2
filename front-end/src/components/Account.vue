<template>
  <div class="full brand">
    <div class="section">
      <h1>Log in to Axe Diaries!</h1>
      <p>A place to keep your party notes!</p>
    </div>
    <div class="section switch-lg-row-to-sm-col">
      <div class="card back-color-primary-1">
        <div class="card-body">
          <a
            href="#sign-up"
            data-toggle="collapse"
            role="button"
            aria-controls="#sign-up"
            class="btn btn-primary"
          >Sign Up</a>
          <div id="sign-up" :class="['collapse']">
            <form class="color-primary-4">
              <div class="form-group">
                <label for="form_real_name">Given Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_real_name"
                  aria-describedby="real name"
                  placeholder="Given Name"
                  required
                  v-model="given_name"
                />
              </div>
              <div class="form-group">
                <label for="form_family_name">Family Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_family_name"
                  aria-describedby="family name"
                  placeholder="Family Name"
                  v-model="family_name"
                />
              </div>
              <div class="form-group">
                <label for="form_hail_from">Hails From</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_hail_from"
                  aria-describedby="Hail from"
                  placeholder="Hegwaard"
                  v-model="hails_from"
                />
              </div>
              <div class="form-group">
                <label for="form_role">Role</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_role"
                  aria-describedby="Role in party"
                  placeholder="Fighter"
                  required
                  v-model="party_role"
                />
              </div>
              <div :class="['form-group']">
                <label for="form_script">Script</label>
                <select
                  id="fontSelector"
                  :class="['form-control', script]"
                  v-model="script"
                  aria-placeholder="Select a font"
                >
                  <option value>Normal font</option>
                  <option v-for="font in this.$root.$data.fonts" :key="font" :value="font">{{font}}</option>
                </select>
                <p :class="script">Sphinx of black quartz, judge my vow!</p>
              </div>
              <div :class="['form-group']">
                <label for="form_intro">Introduction</label>
                <textarea
                  :class="['form-control', script]"
                  v-model="intro"
                  id="form_intro"
                  aria-describedby="Introduction for user"
                  placeholder="Introduce yourself"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="form_username_sign_up">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_username_sign_up"
                  aria-describedby="username entry"
                  placeholder="Enter username"
                  v-model="r_username"
                />
              </div>
              <div class="form-group">
                <label for="password_sign_up_1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_sign_up_1"
                  placeholder="Password"
                  v-model="r_password"
                />
              </div>
              <div class="form-group">
                <label for="password_sign_up_2">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_sign_up_2"
                  placeholder="Password Again"
                  v-model="r_password_2"
                />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="register">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="card back-color-primary-1">
        <div class="card-body">
          <a
            href="#sign-in"
            data-toggle="collapse"
            role="button"
            aria-controls="#sign-in"
            class="btn btn-primary"
          >Sign In</a>
          <div id="sign-in" class="collapse">
            <form class="color-primary-4">
              <div class="form-group">
                <label for="form_username_sign_in">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_username_sign_in"
                  aria-describedby="uername entry"
                  placeholder="Enter username"
                  v-model="l_username"
                />
              </div>
              <div class="form-group">
                <label for="password_sign_in">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_sign_in"
                  placeholder="Password"
                  v-model="l_password"
                />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="login">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Account",
  data() {
    return {
      given_name: "",
      family_name: "",
      hails_from: "",
      party_role: "",
      intro: "",
      script: "",
      r_username: "",
      r_password: "",
      r_password_2: "",
      l_username: "",
      l_password: ""
    };
  },
  methods: {
    async login() {
      if (!this.l_username || !this.l_password) {
        return;
      }
      try {
        let response = await axios.post("/api/users/login", {
          username: this.l_username,
          password: this.l_password
        });
        await this.$root.getUser(response.data.user, true);
      } catch (error) {
        console.error(error);
        await this.$root.getUser(undefined, true);
      }
      this.l_username = "";
      this.l_password = "";
    },
    async register() {
      if (
        !this.given_name ||
        !this.r_username ||
        !this.r_password ||
        this.r_password !== this.r_password_2
      ) {
        return;
      }
      try {
        let response = await axios.post("/api/users/register", {
          given_name: this.given_name,
          family_name: this.family_name,
          hails_from: this.hails_from,
          party_role: this.party_role,
          intro: this.intro,
          script: this.script,
          username: this.r_username,
          password: this.r_password_2
        });
        await this.$root.getUser(response.data.user, true);
      } catch (error) {
        console.error(error);
        await this.$root.getUser(undefined, true);
      }
      this.given_name = "";
      this.family_name = "";
      this.hails_from = "";
      this.party_role = "";
      this.r_username = "";
      this.r_password = "";
      this.r_password_2 = "";
    }
  }
};
</script>

<style scoped>
.card {
  width: max-content;
  align-self: center;
  margin: 5%;
}
</style>