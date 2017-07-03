<template>
    <div>
        {{ someData }}
    </div>
</template>

<script>
    //подключаем хранилище компонента
    import fooStore from './store';

    export default {
        name: "foo", 
        asyncData ({ store, route }) {
            //регистрариуем компонент 
            store.registerModule('foo', fooStore);
            //фетчим данные
            return store.dispatch('foo/fetchData', route.params.id);
        },
        computed: {
            someData() {
                return this.$store.state.foo.someData; 
            }
        }, 
        destroyed() {
            this.$store.unregisterModule('foo'); 
        }
    }
</script>