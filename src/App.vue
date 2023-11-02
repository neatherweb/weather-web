<script setup>
import DataManager from './components/DataManager.vue'
import TheWeather from './components/TheWeather.vue';

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.jpg" width="125" height="125" v-bind:style="{transform: `rotate(${deg}deg)`}"/>
    <h1 class="green">SPHGC Weather</h1>
  </header>

  <main>
    <DataManager/>
    <TheWeather/>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
