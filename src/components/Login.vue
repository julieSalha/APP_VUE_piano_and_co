<template>
  <div>
    <div id="login">
      <form action="#" method="" id="loginForm" class="login-form" @submit.prevent="login">
        <h2>Login</h2>
        <div>
          <p>
            <label for="userEmailLogin">Email *</label>
          </p>
          <p>
            <input type="email" id="userEmailLogin" name="userEmailLogin" required placeholder="Your email"  v-model="email" @keyup="checkInput($event)">
          </p>
          <p><span id='login-email-infos' hidden>Please enter a valid email.</span></p>
        </div>
        <div>
          <p>
            <label for="userPaswordLogin">Password *</label>
          </p>
          <p>
            <input type="password" id="userPaswordLogin" name="userPaswordLogin" minlength="4" required placeholder="Your password"  v-model="password" @keyup="checkInput($event)">
          </p>
          <p><span id='login-password-infos' hidden>Please enter a valid password.</span></p>
        </div>
        <!-- <p><a href="/">Forgot your password ?</a></p> -->
        <button type="submit" class="button btn-second">Login</button>
        <p>Join the Piano & Co. community and share your interpretations
            with musicians from all over the world
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isConnected: false
    };
  },
  methods: {
    login() {
      this.$store.dispatch('loginUser', { email : this.email, password : this.password } )
    },
    checkInput: function(event) {
      const inputEmail = document.querySelector('#userEmailLogin');
      const infosEmail = document.querySelector('#login-email-infos');

      const inputPassword = document.querySelector('#userPaswordLogin');
      const infosPassword = document.querySelector('#login-password-infos');

      let isValidInput;

      function displayInfos(infos) {
          isValidInput ? infos.hidden = true : infos.hidden = false;
        }

      switch (event.target) {
        case inputEmail:
          isValidInput = inputEmail.checkValidity();
          displayInfos(infosEmail);
          break;

        case inputPassword:
          isValidInput = inputPassword.checkValidity();
          displayInfos(infosPassword);
          break;
      }
    },
  }
}
</script>

<style>
#login {
  margin: auto;
}
</style>
