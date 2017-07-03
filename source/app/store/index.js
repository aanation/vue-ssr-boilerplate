import Vue from 'vue';
import Vuex from 'vuex'; 

Vue.use(Vuex);

export function createStore() {
    //сюда можно писать глобальное состояние приложения, его экшены и мутации
    return new Vuex.Store();
}



