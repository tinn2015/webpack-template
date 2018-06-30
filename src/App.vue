<template>
  <div id="app">
    <h1>{{name}}</h1>
    <myTree id="my-tree-id" :custom-options="myCustomOptions" :nodes="treeData"></myTree>
    <ul style="height: 60px;overflow: auto">
      <li style='height: 30px;'>dasdasdas</li>
      <li style='height: 30px;'>dasdasdas</li>
      <li style='height: 30px;'>dasdasdas</li>
      <li style='height: 30px;' id="lastLi" >dads</li>
    </ul>
    <router-link to="/home">home</router-link>
    <router-link to="/">back</router-link>
    <el-button type="danger" icon="el-icon-delete" circle></el-button>
    <router-view></router-view>
  </div>
</template>

<script>
import './style.css'
import myTree from 'vuejs-tree'
export default {
  data () {
    return {
      name: 'Tinn',
      treeData: [
        {
          text: 'Root 1',
          state: {
            checked: false,
            expanded: false,
            selected: false
          },
          nodes: [
            {
              text: 'Child 1',
              state: {
                checked: false,
                expanded: false,
                selected: false
              }
            }
          ]
        }
      ],
      myCustomOptions: {
        treeEvents: {
          expanded: {
            state: true
          },
          collapsed: {
            state: true
          },
          checked: {
            state: true
          }
        },
        events: {
          selected: {
            state: false,
            fn: null
          },
          editableName: {
            state: true,
            calledEvent: 'expanded'
          }
        }
      }
    }
  },
  components: { myTree },
  mounted () {
    this.$el.querySelector('#lastLi').scrollIntoView()
  }
}
</script>

<style scoped>

</style>
