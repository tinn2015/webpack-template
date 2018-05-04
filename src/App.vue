<template>
  <div id="app">
    <h1>{{name}}</h1>
    <router-link to="/home">home</router-link>
    <router-link to="/">back</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import './style.css'
export default {
  data () {
    return {
      name: 'Tinn'
    }
  }
}
</script>

<style scoped>

</style>