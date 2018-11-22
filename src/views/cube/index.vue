<template>
  <div class="wrap">
    <cube></cube>
  </div>
</template>

<script>
import Cube from '@/components/cube/cube'
export default {
  components: {
    Cube
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    width: 420px;
    background: #f8f8f8;
    border: 1px solid #f5f5f5;
  }
</style>
