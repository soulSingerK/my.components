<template>
  <div class="card-wrap">
    <div class="banner-container">
      <ul class="banner-items" :style="containerStyle">
        <li
          class="banner-item"
          v-for="(src, index) in bannerList"
          :key="index"
          :class="{'active': index === current}"
        >
          <img :src="src" alt="">
          {{index}}
        </li>
        <span class="direction left">&lt;</span>
        <span class="direction right">&gt;</span>
      </ul>
    </div>
  </div>
</template>

<script>
import { cardBanner } from './imgs'
const height = 230
const width = 375
export default {
  name: 'l-card',
  data() {
    return {
      bannerList: [],
      width: -1,
      current: 1,
      before: 0,
      after: 2
    }
  },
  created() {
    cardBanner.unshift(cardBanner[0])
    cardBanner.push(cardBanner[cardBanner.length - 1])
    this.bannerList = cardBanner
  },
  mounted() {
    this.$nextTick(() => {
      const screenWidth = document.body.offsetWidth
      console.log(screenWidth)
      this.width = screenWidth * this.bannerList.length
    })
  },
  computed: {
    containerStyle() {
      return {
        height: `${height}px`,
        width: `${this.width}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    &-container {
      width: 100%;
      position: relative;
    }
    &-items {
      height: 100%;
      width: 100%;
      overflow-x: scroll;
      list-style: none;
    }
    &-item {
      height: 100%;
      float: left;
      width: 375px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.current {

        
      }
      &.active {
        transform: scale(1.1);
      }
      img {
        width: 80%;
        height: 65%;
      }
    }
  }
  .direction {
    display: block;
    position: absolute;
    width: 30px;
    height: 60px;
    background-color: #e2e2e2;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    line-height: 60px;
    text-align: center;
    &.left {
      left: 10px;
    }
    &.right {
      right: 10px;
    }
  }
</style>
