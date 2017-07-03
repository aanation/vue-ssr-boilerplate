import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import foo from '@/components/foo/foo'

Vue.use(Router)

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Hello',
        component: Hello
      },
      {
        path: 'foo/:id', 
        name: 'Foo',
        component: 'foo'
      }
    ]
  })
}