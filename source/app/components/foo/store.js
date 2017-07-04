import {fetchItem}  from '../../api';

export default {
    namespaced: true,
    state: () => ({
        someData: null
    }),
    actions: {
        fetchData( { commit }, id) {
            return fetchItem(id).then(data => {
                commit('setData', data);
            })
        }
    }, 
    mutations: {
        setData(state, data) {
            state.someData = data; 
        }
    }
}