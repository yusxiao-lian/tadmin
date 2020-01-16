import Vue from 'vue'
import VueRoter from 'vue-router'

import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import ArticleList from '@/views/ArticleList.vue'
import Welcome from '@/views/Welcome.vue'
import ArticlePublish from '@/views/ArticlePublish.vue'
Vue.use(VueRoter)

let router = new VueRoter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/index',
      component: Index,
      redirect: 'index/welcome',
      children: [
        {
          name: 'ArticleList',
          path: 'articleList',
          component: ArticleList
        },
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'ArticlePublish',
          path: 'articlePublish/:id?',
          component: ArticlePublish
        }
      ]
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let admintoken = localStorage.getItem('admin_token')
    if (admintoken) {
      next()
    } else {
      alert('请先登录')
      setTimeout(() => {
        next({ name: 'Login' })
      }, 500)
    }
  }
})

export default router
