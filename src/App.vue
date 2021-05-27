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
        <h1><img class="logo" src="./assets/logo.svg" alt="piano and co"></h1>
      </div>
    </div>
      <main>
        <div v-if="statusLogged" class="home-container home-container--menu">
          <div class="home-content__menu">
            <navbar></navbar>
          </div>
          <div class="content-views">
            <router-view/>
          </div>
        </div>
        <div v-else class="home-container">
          <div>
            <router-view/>
          </div>
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
  text-align: center;
  color: $c-grey;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  transition: .3s ease;

  &.dark-mode {
    background-color: #272727;
    color: #FFFFFF;
    .header-menu-content, .modal-content {
      background-color: #272727;
      color: #FFFFFF;
    }
    .header__burger-icon__subtitle, 
    a:not(#header-no-connect__login):not(#header-no-connect__register):not(.add-to-playlist-button):not(.agreement-suggestion__item):not(.footer-link__contact), 
    .btn-primary {
      color: #FFFFFF;
    }

    .footer-copyright {
      color: #000000;
    }

    .icon-arrow, 
    .icon-trash,
    .icon-like-two,
    .icon-liked-two {
      fill:white;
    }

    .trash-dark {
      display: block;
    }

    .trash-clear {
      display: none;
    }

    #icon-play {
      fill: #FFFFFF;
    }
  }
}

.home-container {
  min-height: calc(100vh - 285px);
  padding: 10px;
}

h2, h3 {
  font-family: 'Playfair Display', serif;
}

h2 {
  margin-bottom: 10px;
  font-size: 3rem;
}

h3 {
  margin: 10px 0;
  font-size: 2rem;
}

ul {
  list-style: none;
}

.button {
  display: block;
  padding: 6px 12px;
  margin: 15px auto 30px;
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

.hide-scrollbar {
  scrollbar-width: none; /* For Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;  /* For Chrome and Safari */
}

.home-content__menu {
  display: none;
}

.header-content, .header-no-connect  {
  padding: 10px;
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
  max-width: 130px;
  width: 100%;
}

.content-views {
  padding: 10px;
}

@media screen and (min-width: 1024px) {
  .home-content__menu {
    display: block;

    position: sticky;
    top: 10px;

    margin: 0 10px 20px 0;
    padding: 10px;

    border: 2px solid $c-cyan;
    text-align: center;  

    h2 {
      font-size: 2rem;
    }

    nav {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  }

  .home-content {
    max-width: 1024px;
    margin: auto;
  }

  .home-container--menu {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;

    .home-content__menu {
      width: 20%;
      min-width: 20%;

      max-height: 450px;
    }

    .content-views {
      width: 80%;
      min-width: 80%;
    }
  }

  select {
    font-size: 1.7rem;
  }

  label {
    font-size: 1.5rem;
  }
}

@media screen and (min-width: 1400px) {
  .home-content__menu {

    h2 {
      font-size: 3rem;
    }
  }
}
</style>
