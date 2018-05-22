<template>
  <div id="app">
    <h1>{{name}}</h1>
    <ul style="height: 60px;overflow: auto">
      <li style='height: 30px;'>dasdasdas</li>
      <li style='height: 30px;'>dasdasdas</li>
      <li style='height: 30px;'>dasdasdas</li>
      <li style='height: 30px;' ref="lastLi" >dads<input type="text" id="lastli" style="opacity:0"></li>
    </ul>
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
  },
  mounted () {
    this.$el.querySelector('#lastli').focus()
  }
}
</script>

<style scoped>

</style>
