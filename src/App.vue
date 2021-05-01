<template>
  <div id="app">
    <div v-if="statusLogged">
      <Header/>
    </div>
    <div v-else class="header-no-connect">
      <div>
        <a id="header-no-connect__login" class="button btn-second" @click="displayLogin" href="/#login">Login</a>
        <a id="header-no-connect__register" class="button btn-third" href="/#register" @click="displayRegister">Register</a>
      </div>
      <div>
        <p><img class="logo" src="./assets/logo.png" alt="piano and co"></p>
        <p>Lorem ipsum</p>
      </div>

    </div>
      <main>
        <div v-if="statusLogged" class="home-content__menu">
          <navbar></navbar>
          <button class="button btn-second" v-if="statusLogged">Dark Mode (currently off)</button>
          <button class="button btn-second" v-if="statusLogged">Logout</button>
        </div>
        <div>
          <router-view/>
        </div>
      </main>
    
    <Footer id="footer"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { mapState } from 'vuex'

export default {
  name:"App",
  components : {
    Header,
    Footer,
    Navbar
  },
  computed: {
    ...mapState(['user', 'statusLogged'])
  },
  methods: {
    displayRegister() {
      document.querySelector('#login').classList.add('hidden');
      document.querySelector('#register').classList.remove('hidden');
          //console.log('state user', this.$store.state.user);
          //console.log(this.$store.state.statusLogged);
    },
    displayLogin() {
      document.querySelector('#login').classList.remove('hidden');
      document.querySelector('#register').classList.add('hidden');
    }
  },
  created(){
    this.$store.dispatch('checkUser');
  }
}
</script>  

<style lang="scss">

/*FONTS*/
$f-regular: 400;

/*COLORS*/
$c-grey: #404642;
$c-cyan: #42E4CE;
$c-pink: #FFC1C2;

/*BASE*/
* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

html {
  font-size: 100%;
  font-size: 62.5%; // 1rem = 10px
}

body {
  padding: 20px !important;
  text-align: center;
  color: $c-grey!important;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
}

main {
  min-height: calc(100vh - 150px);
}

h2 {
  margin-bottom: 10px;

  font-family: 'Playfair Display', serif;
  font-size: 3rem;
}

ul {
  list-style: none;
}

.button {
  display: block;
  padding: 6px 12px;
  margin: 10px auto;
  background-color: transparent;
  border-width: 0;
  border-radius: 20px;
  cursor: pointer;
  transition: .3s;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
}

.btn-primary {
  color: $c-grey;
  border: 2px solid $c-cyan;

  &:hover, &:active, &:focus {
    color: #FFFFFF;
    background-color: $c-grey;
    border: 2px solid $c-cyan;
  }
}

.btn-second {
  color: $c-grey;
  border: 2px solid $c-cyan;
  background-color: $c-cyan;

  &:hover, &:active, &:focus {
    color: $c-grey;
    background-color: #FFFFFF;
    border: 2px solid $c-cyan;
  }
}

.btn-third {
  color: $c-grey;
  border: 2px solid $c-pink;
  background-color: $c-pink;

  &:hover, &:active, &:focus {
    color: $c-grey;
    background-color: #FFFFFF;
    border: 2px solid $c-pink;
  }
}

select {
  padding: 6px 12px;
  margin-bottom: 10px;

  background-color: $c-cyan;
  color: $c-grey;
  border:0;
  border-radius: 20px;
  cursor: pointer;
  transition: .3s;
}

input {
  margin-bottom: 10px;
  padding: 16px;
  width: 100%;
}

label, .subtitle {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 1.4rem;
}

a {
  display: inline-block !important;
  color:$c-grey;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}

.hidden {
    border:      0;
    display:     block;
    font-size:   0;
    height:      0;
    line-height: 0;
    margin:      0;
    overflow:    hidden;
    padding:     0;
    width:       0;
}

.home-content__menu {
  display: none;
}

.header-no-connect {

  & > div:first-child {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .button {
    margin: 6px 0 6px 10px;
  }
}

.logo {
  max-width: 200px;
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .home-content__menu {
    display: block;

    margin: 0 10px 20px 0;
    padding: 20px;

    border: 2px solid $c-cyan;
    text-align: left;
  }

  .home-content {
    max-width: 1024px;
    margin: auto;
  }

  main {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
}
</style>
