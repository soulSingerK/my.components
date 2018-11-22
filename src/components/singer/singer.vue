<template>
  <div class="singer-wrapper">
    <img :src="singer.avator" alt="" width="100" height="100">
    <span>{{singer.Singer}}</span>
  </div>
</template>

<script>
export default {
  name: 'c-singer',
  props: {
    singer: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer-wrapper {
    display: flex;
  }
</style>
