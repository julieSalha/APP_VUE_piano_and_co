<template>
    <footer>
      <div class="socials">
        <a class="socials__linkedin" href="https://www.linkedin.com/in/juliesalha/" target="_blank" rel="noopener noreferrer">
          <img src="../assets/picto/icon-linkedin.svg" alt="linkedin">
        </a>
        <a class="socials__github" href="https://github.com/julieSalha" target="_blank" rel="noopener noreferrer">
          <img src="../assets/picto/icon-github.svg" alt="github">  
        </a>
        <a class="socials__instagram" href="https://www.instagram.com/julie_salha/" target="_blank" rel="noopener noreferrer">
          <img src="../assets/picto/icon-instagram.svg" alt="instagram">
        </a>
      </div>
      <div class="footer-links"><a href="mailto:julie.salha@gmail.com">Contact</a></div>
      <div class="footer-copyright">
        <p>© Copyright 2021 - Julie Salha</p>
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
    text-align: center;

    background: rgb(66,228,206);
    background: radial-gradient(circle, rgba(66,228,206,1) 0%, rgba(255,193,194,1) 100%);
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

.socials {
  img {
    width: 40px;
    height: 40px;

    margin: 10px;
  }
}

.footer-links {
  a {
    font-size: 2rem;
  }
}

.footer-copyright {
  p {
    font-size: 1.5rem;

    margin-bottom: 20px;
  }
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