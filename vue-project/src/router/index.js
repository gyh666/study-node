import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'
import User from '@/views/user/User'
import Rights from '@/views/right/Rights'
import Roles from '@/views/right/Roles'
import Category from '@/views/category/Category'
import Goods from '@/views/goods/Goods'
import AddGoods from '@/views/goods/AddGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: {path: 'welcome'},
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        }, {
          name: 'Users',
          path: 'users',
          component: User
        }, {
          name: 'Rights',
          path: 'rights',
          component: Rights
        }, {
          name: 'Roles',
          path: 'roles',
          component: Roles
        }, {
          name: 'Category',
          path: 'categories',
          component: Category
        }, {
          name: 'Goods',
          path: 'goods',
          component: Goods
        }, {
          name: 'AddGoods',
          path: 'toadd',
          component: AddGoods
        }
      ]
    }
  ]
})
