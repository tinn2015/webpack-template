<template>
  <div id="tree">
    <ul
      :style="options.style.tree"
      v-if="force">
      <template v-for="node in nodes">
        <tree-row
          v-on:emitNodeSelected="nodeSelected"
          v-on:emitNodeExpanded="nodeExpanded"
          v-on:emitNodeChecked="nodeChecked"
          :key="node.id"
          :node="node"
          :depth="1"
          :custom-options="customOptions"
          :parent-node="node">
        </tree-row>
      </template>
    </ul>
  </div>
</template>

<script>
  import TreeRow from './TreeRow.vue'

  export default {
    name: 'tree',
    props: {
      customOptions: Object,
      id: String,
      nodes: {
        type: Array,
        required: true
      }
    },
    data: function() {
      return {
        options: {
          style: {
            tree: 'height: auto;max-height: 500px;overflow-y: scroll;border: 1px solid #ddd;display: inline-block;',
          },
          treeEvents: {
            expanded: {
              state: false,
              fn: null
            },
            collapsed: {
              state: false,
              fn: null
            },
            selected: {
              state: false,
              fn: null
            },
            checked: {
              state: false,
              fn: null
            }
          }
        },
        selectedNode: null,
        expandedNodes: {},
        force: true
      }
    },
    components: {
      'tree-row': TreeRow
    },
    mounted: function() {
      this.initTree();
      },
      methods: {
        forceRender: function(nodes) {
          this.nodes = nodes;
      },
      initTree: function() {
        if (this.customOptions) {
          if (this.customOptions.style && this.customOptions.style.tree) {
            this.options.style.tree = this.customOptions.style.tree;
          }
          if (this.customOptions.treeEvents) {
            var events = this.customOptions.treeEvents;
            if (events.expanded) {
              if (events.expanded.state != undefined) this.options.treeEvents.expanded.state = events.expanded.state;
                if (events.expanded.fn) this.options.treeEvents.expanded.fn = events.expanded.fn;
              }
            if (events.collapsed) {
              if (events.collapsed.state != undefined) this.options.treeEvents.collapsed.state = events.collapsed.state;
                if (events.collapsed.fn) this.options.treeEvents.collapsed.fn = events.collapsed.fn;
              }
            if (events.selected) {
              if (events.selected.state != undefined) this.options.treeEvents.selected.state = events.selected.state;
                if (events.selected.fn) this.options.treeEvents.selected.fn = events.selected.fn;
              }
            if (events.checked) {
              if (events.checked.state != undefined) this.options.treeEvents.checked.state = events.checked.state;
                if (events.checked.fn) this.options.treeEvents.checked.fn = events.checked.fn;
              }
          }
        }
      },
      findNodePathRec: function(nodeId, nodes, depth, maxDepth) {
        var _this = this;

        nodes.forEach(function(node) {
          var tmp = [];
          if (nodeId == node.id && maxDepth >= depth) {
            ret.unshift(node.id);
            return false;
          } else if (node.nodes && maxDepth > depth && (tmp = _this.findNodePathRec(nodeId, node.nodes, depth+1, maxDepth)) != null) {
            tmp.unshift(node.id);
            ret = tmp;
            return false;
          }
        })

        if (ret.length == 0) return null;
        return ret;
      },
      findNodePath: function(nodeId, maxDepth = 9999) {
        return this.findNodePathRec(nodeId, this.node.nodes, 1, maxDepth)
      },
      findNodeRec: function(nodeId, nodes, depth, maxDepth) {
        var _this = this;

        nodes.forEach(function(node) {
          var tmp = [];
          if (nodeId == node.id && maxDepth >= depth) {
            ret = node;
            return false;
          } else if (node.nodes && maxDepth > depth && (tmp = _this.findNodeRec(nodeId, node.nodes, depth+1, maxDepth)) != null) {
            ret = tmp;
            return false;
          }
        })

        return ret;
      },
      findNode: function(nodeId, maxDepth = 9999) {
        return this.findNodeRec(nodeId, this.node.nodes, 1, maxDepth)
      },
      nodeSelected: function(nodeSelected) { // called when a TreeRow is selected
        let _this = this;
        if (this.selectedNode == null && nodeSelected.state.selected == true) {
          this.selectedNode = nodeSelected;
        } else if (this.selectedNode != null && nodeSelected.state.selected == false) {
          this.selectedNode = null;
        } else if (this.selectedNode != null && nodeSelected.state.selected == true) {
          let arrIds = this.findNodePath(this.selectedNode.id, this.selectedNode.depth)
          this.callSpecificChild(arrIds, 'callNodeSelected', {value: false, arrIds: arrIds});
          this.selectedNode = nodeSelected;
          this.$nextTick(function() {
            let selectArrIds = _this.findNodePath(_this.selectedNode.id, _this.selectedNode.depth);
            _this.callSpecificChild(selectArrIds, 'callNodeSelected', {value: true, arrIds: selectArrIds});
          })

        }

        let fn = null;
        if (this.options.treeEvents.selected && this.options.treeEvents.selected.state == true) {
          fn = this.customOptions.treeEvents.selected.fn;
        }
        let state = (this.selectedNode == null) ? false : true;
        if(fn){
          fn(nodeSelected.id, state);
        }
      },
      nodeExpanded: function(node, state) { // called when a TreeRow is expanded or closed
        if (state == false) {
          this.nodeCollapsed(node.id, null, node.depth);
        } else {
          this.nodeExpanded(node.id, null, node.depth);
        }
        var fn = null;
        if (state == true && this.options.treeEvents.expanded && this.options.treeEvents.expanded.state == true) {
          var fn = this.customOptions.treeEvents.expanded.fn;
        } else if (this.options.treeEvents.collapsed.state == true && this.options.treeEvents.collapsed.state == true) {
          var fn = this.customOptions.treeEvents.collapsed.fn;
        }
        if(fn){
          fn(node.id, state);
        }
      },
      nodeChecked: function(node) { // called when a TreeRow is checked
        var fn = null;
        if (this.options.treeEvents.checked && this.options.treeEvents.checked.state == true) {
          var fn = this.customOptions.treeEvents.checked.fn;
        }
        let state = node.state.checked;
        if(fn){
          fn(node.id, state);
        }
      },
      callSpecificChild: function(arrIds, fname, args) {
        for (var i = 0; i < this.$children.length; i++) {
          var currentNodeId = this.$children[i].$props.node.id;
          if (arrIds.find(x => x == currentNodeId)) {
            this.$children[i][fname](args);
            return false;
          }
        }
      },
      doCheckNode: function(nodeId, depth, state) {
        var arrIds = this.findNodePath(nodeId, depth);
        if (!arrIds) return;
        this.callSpecificChild(arrIds, 'callNodeChecked', {
          value: state,
          arrIds: arrIds
        });
      },
      checkNode: function(nodeId, depth) {
        this.doCheckNode(nodeId, depth, true);
      },
      uncheckNode: function(nodeId, depth) {
        this.doCheckNode(nodeId, depth, false);
      },
      getSelectedNode: function() {
        return this.selectedNode;
      },
      getCheckedNodes: function(argWanted, format = false) {
        return this.getNodesData(argWanted, {checked: true}, format);
      },
      getExpandedNodes: function(argWanted, format = false) {
        return this.getNodesData(argWanted, {expanded: true}, format);
      },
      checkAllNodes: function() {
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].callNodesChecked(true);
        }
      },
      uncheckAllNodes: function() {
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].callNodesChecked(false);
        }
      },
      recUpdateExpandAll: function(nodes) {
        let openedTmp = {};
        for (var i = 0; i < nodes.length; i++) {
          openedTmp[nodes[i].id] = this.recUpdateExpandAll(nodes[i].nodes);
        }
        return openedTmp;
      },
      expandAllNodes: function() {
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].callNodesExpanded(true);
        }
        this.$nextTick(function() {
          this.expandedNodes = {};
          let openedTmp = {};
          for (var i = 0; i < this.nodes.length; i++) {
            openedTmp[this.nodes[i].id] = this.recUpdateExpandAll(this.nodes[i].nodes);
          }
          this.expandedNodes = openedTmp;
        })
      },
      collapseAllNodes: function() {
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].callNodesExpanded(false);
        }
        this.expandedNodes = {};
      },
      deselectAllNodes: function() {
        this.selectedNode = null;
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].callNodesDeselect();
        }
      },
      expandNode: function(nodeId, depth) {
        var arrIds = this.findNodePath(nodeId, depth);

        this.nodeExpanded(nodeId, arrIds);
        this.callSpecificChild(arrIds, 'callNodeExpanded', {
          value: true,
          arrIds: arrIds
        })
      },
      selectNode: function(nodeId, depth) {
        let nodeSelected = this.findNode(nodeId, depth);
        let _this = this;

        if (this.selectedNode) {
          let arrIds = this.findNodePath(this.selectedNode.id, this.selectedNode.depth);
          this.callSpecificChild(arrIds, 'callNodeSelected', {value: false, arrIds: arrIds});
        }
        this.selectedNode = nodeSelected;

        if (this.selectedNode) {
          this.$nextTick(function() {
            let selectArrIds = _this.findNodePath(_this.selectedNode.id, _this.selectedNode.depth);
            _this.callSpecificChild(selectArrIds, 'callNodeSelected', {value: true, arrIds: selectArrIds});
          })
        }
      },
      nodeExpanded: function(nodeId, arrIds, depth) {
        if (arrIds == undefined) {
          arrIds = this.findNodePath(nodeId, depth);
        }
        var hash = this.expandedNodes;
        var tmpElem = hash;
        arrIds.forEach(function(id) {
          if (!tmpElem[id]) {
            tmpElem[id] = {};
          }
          tmpElem = tmpElem[id];
        })
      },
      collapseNode: function(nodeId, depth) {
        var arrIds = this.findNodePath(nodeId, depth);
        this.nodeCollapsed(nodeId, arrIds);
        this.callSpecificChild(arrIds, 'callNodeExpanded', {
          value: false,
          arrIds: arrIds
        })
      },
      nodeCollapsed: function(nodeId, arrIds, depth) {
        if (arrIds == undefined) {
          arrIds = this.findNodePath(nodeId, depth);
        }
        var hash = this.expandedNodes;
        var tmpElem = hash;

        arrIds.forEach(function(id, i) {
          if (!tmpElem[id]) {
            return false;
          } else if (i == arrIds.length - 1 && tmpElem[id]) {
            delete tmpElem[id];
          }
          tmpElem = tmpElem[id];
        });
      },
      recGetVisibleNodes: function(arr, elem, fullNode) {
        let _this = this;
        let node = elem.$props.node;
        if (fullNode == true) {
          arr.push(node);
        } else {
          arr.push(id);
        }

        elem.$children.forEach(function(child) {
          arr = _this.recGetVisibleNodes(arr, child, fullNode);
        })
        return arr;
      },
      getVisibleNodes: function(fullNode = false) {
        let _this = this;
        let arr = [];

        this.$children.forEach(function(child) {
          arr = _this.recGetVisibleNodes(arr, child, fullNode);
        })
        return arr;
      },
      recGetNodesData: function(argWanted, conditions, nodes) {
        let _this = this;
        let arr = [];
        if (nodes == undefined) return arr;
        nodes.forEach(function(node) {
          if (Object.keys(node.state).filter(key => conditions[key] == node.state[key]).length == Object.keys(conditions).length) {
            if (Array.isArray(argWanted)) {
              arr.push(Object.keys(node).filter(key => argWanted.includes(key)).reduce((obj, key) => {
                obj[key] = node[key];
                return obj;
               }, {}));
            } else {
              arr.push(node[argWanted]);
            }
          }
          arr = arr.concat(_this.recGetNodesData(argWanted, conditions, node.nodes));
        })
        return arr;
      },
      recGetNodesDataWithFormat: function(argWanted, conditions, nodes) {
        let _this = this;
        let arr = {};
        if (nodes == undefined) return arr;
        nodes.forEach(function(node) {
          if (Object.keys(node.state).filter(key => conditions[key] == node.state[key]).length == Object.keys(conditions).length) {
            arr[node.id] = _this.recGetNodesDataWithFormat(argWanted, conditions, node.nodes);
          } else {
            Object.assign(arr, _this.recGetNodesDataWithFormat(argWanted, conditions, node.nodes));
          }
        })
        return arr;
      },
      getNodesData: function(argWanted, conditions = {}, format = false) {
        // argWanted: id -> return id, id1 etc... argWanted: id, name -> return {id: id, name: name}, {id: id1, name: name1}, etc
        // conditions {checked: true} conditions {checked: true, selected: true}
        let arr = null;
        if (format == false) {
          arr = this.recGetNodesData(argWanted, conditions, this.nodes);
        } else {
          arr = this.recGetNodesDataWithFormat(argWanted, conditions, this.nodes);
        }
        return arr;
      }
    }
  }
</script>
