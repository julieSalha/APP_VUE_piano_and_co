<template>
    <footer>
      <div class="footer-content__top">
        <navbar  v-if="statusLogged"></navbar>
      </div>
        <div class="footer-content__bottom">
            <div class="footer-content__bottom__first-block">
                <div class="footer-links">
                <div><a href="/">Contact</a></div>
                <div><a href="/">Mentions légales</a></div>
            </div>
            </div>
            <div class="footer-content__bottom__second-block">
                <div class="footer-socials socials">
                    <a class="footer-socials__item socials__linkedin" href="" target="_blank" rel="noopener noreferrer"><img src="../assets/picto/icon_linkedin.svg" alt="linkedin" /></a>
                    <a class="footer-socials__item socials__instagram" href="" target="_blank" rel="noopener noreferrer"><img src="../assets/picto/icon_instagram.svg" alt="instagram" /></a>
                    <!-- TODO Ajouter un lien github -->
                    <!-- <a class="footer-socials__item socials__github" href="" target="_blank" rel="noopener noreferrer"><img src="../assets/picto/icon_facebook.svg" alt="facebook" /></a> -->
                </div>
                <p>© Copyright 2020 - Julie Salha</p>
            </div>
        </div>
    </footer>
</template>

<script>
import Navbar from './Navbar'
import { mapState } from 'vuex'


export default {
  name:"Footer",
  computed: {
    ...mapState(['statusLogged'])
  },
  components : {
    Navbar
  }
}
</script>

<style lang="scss">
footer {
    padding: 10px;
    background-color: #A0C1D4;
    text-align: center;
}

.footer-socials__item {
    display: inline-block;
    margin: 0 10px !important;
}

.navbar-menu--footer {
    margin-bottom: 15px;
    background-color: #A0C1D4 !important;
    box-shadow: none !important;
}

.footer-socials__item img {
    margin: 0 10px;
}

.footer-socials, .footer-links {
    margin-bottom: 20px;
}

.footer-content__top {
    margin-bottom: 10px;
}

@media screen and (min-width: 768px) {
  footer {
      .field:not(:last-child) {
        margin: auto;
        width: 50%;
        text-align: center;
      }
  }

  .footer-content__top {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    justify-content: center;
  }

  .footer-content__top__first-block {
    width: 70%;
  }

  .footer-content__top__second-block {
    width: 30%;
  }

  .footer-links > div {
    display: inline-block;
    margin: 0 10px;
  }

  .footer-content__bottom__first-block {
    margin-bottom: 30px;
  }

  .footer-content__bottom__second-block {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: flex-end;
  }

  .footer-socials {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 1024px) {
    footer {
        .navbar-start {
         flex-direction: column;
        }

        .field:not(:last-child) {
           margin: 0 10px 0.75rem 0.2rem;
        }
    }

    .footer-content__top {
        margin-bottom: 20px;
    }

    .footer-content__top__first-block {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70%;

        .field {
            display: inline-block;
        }
    }

    .footer-content__top__second-block {
        width: 30%;
    }

    .footer-content__bottom__first-block {
        border-bottom: 2px solid;
    }
}



</style>