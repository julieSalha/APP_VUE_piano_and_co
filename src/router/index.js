import Router from 'vue-router'
import Vue from 'vue'

import Home from '../views/Home'
import Account from '../components/Account'
import Interpretation from '../components/Interpretation'

Vue.use(Router)

const ifAuthenticated = (to, from, next) => {
    if (localStorage.getItem('token')) {
        next();
      return;
    }
    router.push({ 
      name: 'login',
      params: {
        returnTo: to.path,
        query: to.query,
      },
    });
   };


const router = new Router({
    mode: 'history',
    base: '/',
    routes: [{
        component: Home,
        path: '',
        children: [
          {
            path: '/',
            name: 'home',
            component: Home
          }
        ]
    },
    {
      component: Account,
      path: '/account',
      children: [{
          path: '/account',
          name: 'account',
          component: Account
        }
      ]
    },
    {
      component: Interpretation,
      path: '/interpretation',
      children: [{
          path: '/interpretation',
          name: 'interpretation',
          component: Interpretation
        }
      ]
    }
  ]
});

export default router
