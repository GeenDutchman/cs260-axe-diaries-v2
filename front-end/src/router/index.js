import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccountWall from '../views/AccountWall.vue'
import About from '../views/About.vue'
import Parties from '../views/Parties.vue'
import PartyIntro from '../views/PartyIntro.vue'
import PartyBlog from '../views/PartyBlog.vue'
import MakeParty from '../views/MakeParty.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountWall
  },{
    path: '/parties',
    name: 'Parties',
    component: Parties,
  },{
    path: '/parties/make',
    name: 'MakeParty',
    component: MakeParty,
  },{
    path: '/parties/:id',
    name: 'PartyIntro',
    component: PartyIntro,
  },
  {
    path: '/parties/:id/blog',
    name: 'PartyBlog',
    component: PartyBlog,
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
