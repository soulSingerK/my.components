<template>
  <div style="font-size: 12px;">
    <div class="aqhg-cms_set-wrap">
      <div class="aqhg-cms_set-label">魔方密度：</div>
      <select name="" id="" v-model="density">
        <option :value="item.val" v-for="item in cubeDensitys" :key="item.val">{{item.label}}</option>
      </select>
    </div>
    <div class="aqhg-cms_set-wrap">
      <div class="aqhg-cms_set-label">布局：</div>
      <div class="cube-wrap"
        @mouseleave="onMouseleave"
      >
        <div
          class="cube-selected"
          v-for="(item, index) in selectCubes"
          :key="`selected-cube_${index}`"
          :style="item"
          :class="{'clicked': index === selected}"
          @click="selected=index"
        >
          <span class="remove" @click.stop="remove(index)">x</span>
        </div>
        <ul
          v-for="colum in density"
          :key="`col_${colum}`"
          class="cube-col"
          :style="{width: `${size}px`}"
        >
          <li
            v-for="row in density"
            :key="`${colum}_${row}`"
            class="cube-row"
            :class="{'selected': isSelected(colum, row)}"
            :style="rowStyle"
            @mouseover.stop="onMouseover(colum, row)"
            @click.stop="onSelectStart(colum, row)"
          >+</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
const CONTAINERWIDTH = 310
export default {
  data() {
    return {
      density: 7,
      selectCubes: [],
      startX: -1,
      startY: -1,
      targetX: -1,
      targetY: -1,
      selected: -1
    }
  },
  created() {
    // 数据初始化
    this.cubeDensitys = [
      {val: 4, label: '4X4'}, {val: 5, label: '5X5'},
      {val: 6, label: '6X6'}, {val: 7, label: '7X7'}
    ]
    this.selectedRects = []
    this._initCubeParam()
  },
  methods: {
    remove(index) {
      this.selectCubes.splice(index, 1)
      this.selected = this.selectCubes.length - 1
      this.selectedRects = []
    },
    isSelected(row, col) {
      if (!this.calcPoint) return false
      if (
        row <= this.calcPoint.targetX
        && row >= this.calcPoint.startX
        && col <= this.calcPoint.targetY
        && col >= this.calcPoint.startY
      ) {
        return true
      }
      return false
    },
    onSelectStart(row, col) {
      if (this.canSelect) { // 选取完成
        const cube = this.calcCubeSize()
        cube && this.selectCubes.push(cube)
        this.selected = this.selectCubes.length - 1

        this.selectedRects.push({
          x: this.calcPoint.startX,
          y: this.calcPoint.startY,
          width: this.calcPoint.targetX - this.calcPoint.startX + 1,
          height: this.calcPoint.targetY - this.calcPoint.startY + 1
        })
        this._initCubeParam()
      } else {
        this.canSelect = true // 第一次选取
        this.startX = row
        this.startY = col
        this.targetX = row
        this.targetY = col
      }
    },
    onMouseover(row, col) {
      if (!this.canSelect) {
        return
      }
      if (this.selectedRects.length && this.isOverlap(this.startX, this.startY, row, col)) {
        return        
      }
      this.targetX = row
      this.targetY = col
    },
    onMouseleave() {
      if (!this.canSelect) return
      this._initCubeParam()
    },
    calcCubeSize() {
      if (!this.calcPoint) return
      const cube = {}
      const calcPoint = this.calcPoint
      cube.width = `${(calcPoint.targetX - calcPoint.startX + 1) * this.size}px`
      cube.height = `${(calcPoint.targetY - calcPoint.startY + 1) * this.size}px`
      cube.left = `${(calcPoint.startX - 1) * this.size}px`
      cube.top = `${(calcPoint.startY - 1) * this.size}px`
      return cube
    },
    isOverlap(startX, startY, targetX, targetY) {
      // 构建临时矩形， 循环已创建的矩形跟临时矩形是否有重叠
      const rect = {
        x: Math.min(this.startX, targetX),
        y: Math.min(this.startY, targetY),
        width: Math.abs(this.startX - targetX) + 1,
        height: Math.abs(this.startY - targetY) + 1
      }
      let flag = false
      for (let i = 0; i < this.selectedRects.length; i++) {
        const selectedRect = this.selectedRects[i]
        if (rect.x + rect.width > selectedRect.x
          && selectedRect.x + selectedRect.width > rect.x
          && rect.y + rect.height > selectedRect.y
          && selectedRect.y + selectedRect.height > rect.y
        ) {
          flag = true
          break
        }
      }
      return flag
    },
    _initCubeParam() {
      this.canSelect = false
      this.startX = -1
      this.startY = -1
      this.targetX = -1
      this.targetY = -1
    }
  },
  computed: {
    calcPoint() {
      if (this.targetX < 1 || this.targetY < 1 || this.startX < 1 || this.startY < 1) {
        return
      }
      return {
        startX: Math.min(this.startX, this.targetX),
        startY: Math.min(this.startY, this.targetY),
        targetX: Math.max(this.startX, this.targetX),
        targetY: Math.max(this.startY, this.targetY)
      }
    },
    size() {
      if (!this.density) return
      return CONTAINERWIDTH / this.density
    },
    rowStyle() {
      if (!this.size) return
      const size = `${this.size}px`
      return {
        height: size,
        lineHeight: size
      }
    }
  },
  watch: {
    density() {
      this.selectCubes = []
      this.selectedRects = []
    }
  }
}
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
  }
  .cube-wrap {
    margin-bottom: 10px;
    position: relative;
  }
  .cube-col {
    float: left;
    cursor: pointer;
    &:last-child {
      .cube-row {
        border-right: 1px solid #e5e5e5;
      }
    }
  }
  .cube-row {
    text-align: center;
    color: #bbb;
    border-left: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    &:first-child {
      border-top: 1px solid #e5e5e5;
    }
    &.selected {
      background-color: #e8f7fd;
      color: #e8f7fd;
    }
  }
  .cube-selected {
    position: absolute;
    background-color: #e8f7fd;
    border: 1px solid #bdf;
    box-sizing: border-box;
    cursor: pointer;
    color: #88c4dc;
    text-align: center;
    z-index: 2;
    &.clicked {
      border-color: #38f;
    }
    &:hover .remove {
      display: block;
    }
    .remove {
      position: absolute;
      display: none;
      right: -8px;
      top: -8px;
      font-size: 12px;
      cursor: pointer;
      color: #fff;
      background-color: #bbb;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 16px;
    }
  }

  .aqhg-cms_set-wrap {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  .aqhg-cms_set-label {
    display: block;
    width: 90px;
    margin-right: 10px;
    text-align: right;
  }

  .aqhg-cms_set-block {
    background: #fff;
    border: 1px solid #e5e5e5;
    padding: 10px 0;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
