<template>
  <div class="singer-list" ref="container" @scroll.stop="scroll">
    <div class="singer-letter" v-for="(letters, index) in singerList" :key='`letter-${index}`'>
      <p ref="floor">{{letters.letter}}</p>
      <c-singer
        :singer="singer"
        v-for="(singer, singerIndex) in letters.singerList"
        :key='`singer-${singerIndex}`'
        class="singer-item"
      ></c-singer>
    </div>
    <div class="letter-link">
      <ul class="letter-items">
        <li
          v-for="(letter, index) in letters"
          :key='`link-${index}`'
          class="letter-item"
          :class="{'active': letter === currentLetter}"
          @click="changeFloor(letter, index)"
        >
          {{letter}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { data } from './data'
import Singer from '@/components/singer/singer'
const avator = 'https://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000'
export default {
  name: 'l-singerList',
  data() {
    return {
      singerList: [],
      letters: [],
      currentLetter: 'A'
    }
  },
  created() {
    this.floors = []
    this.handleData()
  },
  mounted() {
    this.$nextTick(() => {
      this.calcFloors()
    })
  },
  methods: {
    scroll(e) {
      const scrollTop = e.target.scrollTop
      const index = this.calcArrayInterval(this.floors, scrollTop)
      if (index > -1) {
        this.currentLetter = this.letters[index]
      }
    },
    calcArrayInterval(arr, val) {
      let floorIndex = -1
      arr.forEach((item, index, array) => {
        if (val > item && val < array[index + 1]) {
          floorIndex = index
        } else if (val >= array[array.length - 1]) {
          floorIndex = array.length - 1
        }
      })
      return floorIndex
    },
    changeFloor(letter, index) {
      if (index < 0 || this.floors.length === 0) return
      this.currentLetter = letter
      this.$refs.container.scrollTop = `${this.floors[index]}`
    },
    calcFloors() {
      this.floors = this.$refs.floor.map(floor => {
        return floor.offsetTop
      })
    },
    handleData() {
      data.forEach(item => {
        this.letters.push(item.letter.toUpperCase())
        item.singerList.forEach(singer => {
          singer.avator = avator
        })
      })
      this.singerList = data
    }
  },
  components: {
    [Singer.name]: Singer
  }
}
</script>

<style lang="scss" scoped>
  .singer-list {
    height: 100vh;
  }
  .singer-item {
    margin-bottom: 10px;
    padding: 5px 0;
    border-bottom: .5px solid #e2e2e2;
    border-top: .5px solid #e2e2e2;
  }
  .letter-link {
    position: fixed;
    right: 0;
    top: 50px;
    background-color: #e2e2e2;
    .letter-items {
      list-style: none;
      
      .letter-item {
        margin: 5px;
        padding: 4px;
        &.active {
          border-radius: 50%;
          background-color: #fff;
        }
      }
    }
  }
</style>
