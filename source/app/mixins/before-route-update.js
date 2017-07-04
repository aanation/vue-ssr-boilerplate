//глобальная клиентская примесь автоматически загружающая данные при изменении роута без изменения 
//компонента, например с /someroute/1 на /someroute
const mixin = {
    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options; 
        if (asyncData) {
            this.dataPromise = asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next);
        }  else {
            next(); 
        }
    }
};

export default {
  install (Vue, options) {
    Vue.mixin(mixin);
  }  
};