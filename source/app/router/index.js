import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
const foo = resolve => require(['@/components/foo/foo'], resolve)

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'Hello',
        component: Hello
      },
      {
        path: '/foo/:id', 
        name: 'Foo',
        component: foo
      }
    ]
  })
}