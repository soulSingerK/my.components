import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => {
  import('@/views/index/index').then(module => {
    resolve(module)
  })
}
const Card = resolve => {
  import('@/views/card/card').then(module => {
    resolve(module)
  })
}
const Cube = resolve => {
  import('@/views/cube/index').then(module => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Index
    },
    {
      path: '/card',
      component: Card
    },
    {
      path: '/cube',
      component: Cube
    }
  ]
})
