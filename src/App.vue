<template>
  <!-- <h1 class="title mt-5">Prueba Técnica Enviame.io</h1>
  <div id="nav">
    <router-link to="/test-1">Test 1</router-link> |
    <router-link to="/test-2">Test 2</router-link> |
    <router-link to="/test-3">Test 3</router-link>
  </div> -->
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
