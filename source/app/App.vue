<template>
  <div id="app">
    <img src="/static/logo.png">
    <p>Тыкай и наслаждайся динамическим роутингом</p>
    <input type="text" v-model="page">
    <button v-on:click="pushPath">Пуш!</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      page: ""
    }
  },
  methods: {
    pushPath() {
      this.$router.push('/foo/' + this.page);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
