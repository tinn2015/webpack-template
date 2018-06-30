<template>
  <div class="home">
    <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps">
    </el-tree>
    <el-button>dsads</el-button>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1',
              children: [
                {
                  id: 11,
                  label: '四级 1-1-1-1'
                }
              ]
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>
<style>
  .home .el-tree-node__expand-icon {
    position: absolute;
    right: 10px;
  }
  .home .el-tree {
    width: 50%
  }
  .home .treeitem > .el-tree-node__content {
    border: 1px solid green
  }
  /* .home .el-tree-node__content {
    padding-left: 0!important
  } */
  /* .home .el-tree-node__content .el-tree-node__label {
    padding-left: 18px;
    display: inline-block
  } */
</style>
