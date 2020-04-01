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
          <div id="sign-up" class="collapse">
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
                />
              </div>
              <div class="form-group">
                <label for="form_username_sign_up">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="form_username_sign_up"
                  aria-describedby="username entry"
                  placeholder="Enter username"
                />
              </div>
              <div class="form-group">
                <label for="password_sign_up_1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_sign_up_1"
                  placeholder="Password"
                />
              </div>
              <div class="form-group">
                <label for="password_sign_up_2">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_sign_up_2"
                  placeholder="Password Again"
                />
              </div>
              <button type="submit" class="btn btn-primary" disabled>Submit</button>
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
                />
              </div>
              <div class="form-group">
                <label for="password_sign_in">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password_sign_in"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-primary" disabled>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Account",
}
</script>

<style scoped>
.card {
    width: max-content;
    align-self: center;
    margin: 5%;
}
</style>