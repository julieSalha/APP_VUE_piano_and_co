<template>
    <nav @click="closeMenu()">
        <div>
            <ul>
                <li><router-link to="/"><h2>Home</h2></router-link></li>
                <li><router-link to="/account"><h2>My account</h2></router-link></li>
                <li><router-link to="/"><h2>Chords suggestion</h2></router-link></li>
                <li><router-link to="/interpretation"><h2>Piano and Co</h2></router-link></li>
            </ul>
        </div>

        <div>
            <button class="button btn-second" @click="toggleMode()">
              <span class="button-mode-dark">Dark Mode (currently off)</span>
              <span class="button-mode-clear"> Clear Mode (currently off)</span>
            </button>
            <button id="user-logout" class="button btn-second" @click="logoutUSer">Logout</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        closeMenu() {
            document.querySelector('#header-menu').classList.add('hidden');
        },
        toggleMode() {
            document.querySelector('body').classList.toggle('dark-mode');
        },
        logoutUSer() {
            this.$store.dispatch('logoutUser');
        }
    }   
}

</script>

<style lang="scss">
nav {
    a {
        text-decoration: none;
        transition: .3s ease;
        white-space: nowrap;

        &:hover, &:active, &:focus {
            text-decoration: underline;
        }
     }

     h2 {
         pointer-events: none;
     }
}

// Dark / Clear mode
.button-mode-clear {
  display: none;
}

.dark-mode {
    .button-mode-clear {
        display: block;
    }

    .button-mode-dark {
        display: none;
    }

}

</style>
