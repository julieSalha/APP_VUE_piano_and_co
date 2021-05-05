<template>
    <nav @click="closeMenu()">
        <ul>
            <li><router-link to="/account"><h2>My account</h2></router-link></li>
            <li><router-link to="/"><h2>Chords suggestion</h2></router-link></li>
            <li><router-link to="/interpretation"><h2>Music</h2></router-link></li>
            <!-- <li><router-link to="/community"><h2>Community</h2></router-link></li>
            <li><router-link to="/my-player"><h2>My player</h2></router-link></li>
            <li><router-link to="/about"><h2>About</h2></router-link></li> -->
        </ul>
        <div>
            <button class="button btn-second" @click="toggleMode()">
              <span class="button-mode-dark">Dark Mode (currently off)</span>
              <span class="button-mode-clear"> Clear Mode (currently off)</span>
            </button>
        </div>
        <div>
            <button class="button btn-second">Logout</button>
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
