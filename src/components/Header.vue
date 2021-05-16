<template>
    <div>
        <header>
            <div class="header-content">
                <a href="/" alt="link to home Piano and co" class="logo-header">
                    <h1><img class="logo" src="../assets/logo.svg" alt="piano and co"></h1>
                </a>
                <button id="header-burger" class="header-burger button" @click="openMenu" v-if="statusLogged">
                    <span class="header__burger-icon">
                        <span class="header__burger-line"></span>
                        <span class="header__burger-line"></span>
                    </span>
                    <span class="header__burger-icon__subtitle">menu</span>
                </button>
            </div>
        </header>
            <div class="header-menu hidden" id="header-menu" @click="closeMenu">
                <div class="header-menu-container">
                    <div class="header-menu-content">
                        <navbar></navbar>  
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import Navbar from './Navbar'
import { mapState } from 'vuex'


export default {
  name:"Header",
  components: {
      Navbar
  },
computed: {
    ...mapState(['statusLogged'])
  },
  methods: {
      openMenu() {
          if (document.querySelector(('#header-burger')).classList.contains('active')) {
            document.querySelector('.header-menu').classList.add('hidden');
            document.querySelector(('#header-burger')).classList.remove('active');
          } else {
            document.querySelector('.header-menu').classList.remove('hidden');
            document.querySelector(('#header-burger')).classList.add('active');
          }
      },
      closeMenu(event) {
          event.target.parentNode.classList.add('hidden');
      }
    }
  }
</script>

<style lang="scss">

    .header__burger {
        background-color: #FFFFFF;
        color: #fe0100;
        font-size: 0.8rem;
        font-weight: bold;
        border: none;
    }

    .header__burger-line {
        display: block;
        margin-bottom: 10px;
        height: 3px;
        background: #42E4CE;
        border-radius: 20px;
    }

    .header-content {
        display: flex;
        justify-content: space-between;
    }

    .button.header-burger {
        margin: 0;
        cursor: pointer;
    }

    .header-menu-container {
        position: relative;
        z-index: 9;
        
        height: 100vh;
        background-color: rgba(255,255,255,0.3);
    }

    .header-menu-content {
        background-color: #FFFFFF;
        border: 2px solid #42E4CE;
        padding: 20px;
        text-align: center;
    }

    .header-menu {
        position: absolute;
        width: 100%;

        color: #000000;
    }

    .logo-header {
        max-width: 80px !important;
        width: 100%;
    }

@media screen and (min-width: 1024px) {
    header {
        margin-bottom: 30px;
    }

    .header-burger {
        display: none !important;
    }

    .header-menu-container {
        display: none;
    }

    .logo-header {
        max-width: 100px !important;
    }
}
</style>
