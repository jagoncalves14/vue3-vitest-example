import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/homepage/homepage.vue'
import Contact from '../views/contact/contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
