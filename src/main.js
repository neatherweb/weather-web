import './assets/main.css'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';   

import { createApp } from 'vue';
import { createStore } from 'vuex'
import { createRouter,createWebHashHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Button from 'primevue/button';
import Menu from 'primevue/menu';

import Panel from 'primevue/panel';


import App from './App.vue'

// Create a new store instance.
const store = createStore({
    state: {
        conn: null
    },
    mutations: {
      setConn (state, conn) {
        state.conn = conn
      }
    }
  })

const routes = [
    // { path: '/',  },
    // { path: '/about',  },
  ]

const router = createRouter({
    routes, // short for `routes: routes`
    history: createWebHashHistory()
  })

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(store)

app.component('Button', Button);
app.component('Toast', Toast);
app.component('Menu', Menu);
app.component('Panel', Panel);

app.mount('#app');