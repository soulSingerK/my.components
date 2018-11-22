<template>
  <div id="app">
    <router-view class="body"/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  .header {
    height: 50px;
  }
  // .body {
  //   overflow: scroll;
  // }
}
</style>
