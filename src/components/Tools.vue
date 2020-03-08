<template>
  <div id="tools">
    <button v-on:click="addTable()">+</button>
    <button v-on:click="zoomIn()">^</button>
    <button v-on:click="zoomOut()">v</button>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'tools',
  methods: {
    addTable: function () {
      store.commit('addTable')
    },
    zoomIn: function () {
      store.state.lib.panzoom.zoomIn()
      var zoomScale = store.state.lib.panzoom.getScale()

      store.state.lib.jsPlumb.setZoom(zoomScale)
    },
    zoomOut: function () {
      store.state.lib.panzoom.zoomOut()
      var zoomScale = store.state.lib.panzoom.getScale()

      store.state.lib.jsPlumb.setZoom(zoomScale)
    }
  }
}
</script>

<style scoped>
#tools {
  z-index: 1000000;
  position: fixed;
  top: 10px;
  left: 10px;
  background: #ccc;
}
</style>
