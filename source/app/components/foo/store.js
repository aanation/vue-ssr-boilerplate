import { fetchData } from '../../api';

export default {
    namespaced: true,
    state: () => ({
        someData: null
    }),
    actions: {
        fetchData( { commit }, id) {
            return fetchData(id).then(data => {
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