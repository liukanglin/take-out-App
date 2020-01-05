import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/Home/Home.vue')
const Search = () => import('../views/Search/Search.vue')
const Order = () => import('../views/Order/Order.vue')
const Profile = () => import('../views/Profile/Profile.vue')
const Login = () => import('../views/Login/Login.vue')

import Shop from '../views/Shop/Shop.vue'
import ShopGoods from '../views/Shop/childComps/ShopGoods.vue'
import ShopInfo from '../views/Shop/childComps/ShopInfo.vue'
import ShopRatings from '../views/Shop/childComps/ShopRatings.vue'

/* const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
}; */

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  component: Home,
  meta: {
    showFooter: true
  }
},
{
  path: '/search',
  component: Search,
  meta: {
    showFooter: true
  }
},
{
  path: '/order',
  component: Order,
  meta: {
    showFooter: true
  }
},
{
  path: '/profile',
  component: Profile,
  meta: {
    showFooter: true
  }
},
{
  path: '/login',
  component: Login
}, {
  path: '/shop',
  component: Shop,
  children: [{
    path: '/shop/goods',
    component: ShopGoods
  },
  {
    path: '/shop/info',
    component: ShopInfo
  },
  {
    path: '/shop/ratings',
    component: ShopRatings
  },
  {
    path: '',
    redirect: '/shop/goods'
  }
  ]
}
]

export default new Router({
  routes,
  mode: 'history'
})
