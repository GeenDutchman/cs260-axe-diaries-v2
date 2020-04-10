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
          >Make Your Party!</a>
          <div id="sign-up" class="collapse">
            <form class="color-primary-4">
              <div class="form-group">
                <label for="form_real_name">Party Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_real_name"
                  aria-describedby="real name"
                  placeholder="party Name"
                  required
                  v-model="party_name"
                />
              </div>
              <div class="form-group">
                <label for="form_party_description">Party Description</label>
                <input
                  type="textarea"
                  class="form-control"
                  id="form_party_description"
                  aria-describedby="Party description"
                  placeholder="Party Description"
                  v-model="party_description"
                />
              </div>
              <div class="form-group">
                <label for="form_party_image">Party Image</label>
                <input
                  type="url"
                  class="form-control"
                  id="form_party_image"
                  aria-describedby="Party image url"
                  placeholder="smile.png"
                  v-model="party_image"
                />
              </div>
              <div class="form-group">
                <label for="form_page">Party page</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_page"
                  aria-describedby="Party page"
                  placeholder=""
                  v-model="party_page"
                />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="register">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "MakeParty",
    data() {
      return {
        party_name: '',
        party_description: '',
        party_image: '',
        party_page: '',
      };
    },
    methods: {
      async register() {
        if (!this.party_name) {
          return;
        }
        try {
          let response = await axios.post('/api/party/create', {
            party_name: this.party_name,
            party_description: this.party_description,
            party_image: this.party_image,
            party_page: this.party_page,
          });
          console.log(response);
          this.$root.$router.push('/parties/' + response.data.party._id);
        } catch (error) {
          console.error(error);
        }
        this.party_name = '';
        this.party_description = '';
        this.party_image = '';
        this.party_page = '';
      }
    }
}
</script>

<style scoped>
.card {
    width: max-content;
    align-self: center;
    margin: 5%;
}
</style>