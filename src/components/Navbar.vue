<template>
    <nav>
        <ul>
            <li><a href="/account"><h2>My account</h2></a></li>
            <li><a href="/"><h2>Chords suggestion</h2></a></li>
            <li><a href="/interpretation"><h2>All interpretations</h2></a></li>
            <li><a href="/community"><h2>Community</h2></a></li>
            <li><a href="/my-player"><h2>My player</h2></a></li>
            <li><a href="/about"><h2>About</h2></a></li>
        </ul>
    </nav>
</template>

<style lang="scss">
nav {
    a {
        text-decoration: none;
        transition: .3s ease;

        &:hover, &:active, &:focus {
            text-decoration: underline;
        }
     }
}

</style>
