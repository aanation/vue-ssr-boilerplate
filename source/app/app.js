import Vue from 'vue'
import App from './App'
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';



export function createApp()  {
  const router = createRouter();
  const store = createStore(); 

  //добавляем данные о роуте в глобальный стор чтобы они были доступны как store.state.route
  sync(store, router); 

  const app = new Vue({
    store, 
    router, 
    render: h => h(App)
  });

  return { app, router, store }
}