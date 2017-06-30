import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import foo from '../components/foo.vue';
import bar from '../components/bar.vue';

const routes = [
	{ path: '/foo', foo },
	{ path: '/bar', foo }
];

export default () => {
    return new VueRouter({
        mode: 'history',
        routes 
    });
};