<template>
    <nav @click="closeMenu()">
        <ul>
            <li><router-link to="/account"><h2>My account</h2></router-link></li>
            <li><router-link to="/"><h2>Chords suggestion</h2></router-link></li>
            <li><router-link to="/interpretation"><h2>All interpretations</h2></router-link></li>
            <!-- <li><router-link to="/community"><h2>Community</h2></router-link></li>
            <li><router-link to="/my-player"><h2>My player</h2></router-link></li>
            <li><router-link to="/about"><h2>About</h2></router-link></li> -->
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        closeMenu() {
            console.log('coucou')
            document.querySelector('#header-menu').classList.add('hidden');
        }
    }   
}

</script>

<style lang="scss">
nav {
    a {
        text-decoration: none;
        transition: .3s ease;

        &:hover, &:active, &:focus {
            text-decoration: underline;
        }
     }

     h2 {
         pointer-events: none;
     }
}

</style>
