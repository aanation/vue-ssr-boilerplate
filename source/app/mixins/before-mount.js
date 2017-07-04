//глобальная примесь автоматически загружающая данные на клиенте перед ренерингом 
const mixin = {
    beforeMount() {
        const { asyncData } = this.$options; 
        if (asyncData) {
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            });
        }
    }
}

export default {
  install (Vue, options) {
    Vue.mixin(mixin);
  }  
};