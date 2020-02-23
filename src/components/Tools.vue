<template>
  <div id="tools">
    <button v-on:click="addTable()">+</button>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'tools',
  methods: {
    addTable: function () {
      store.commit('addTable')
    }
  }
}
</script>

<style scoped>
#tools {
  position: fixed;
  width: 50px;
  height: 350px;
  margin: 10px 0 0 10px;
  background: #ccc;
  border-radius: 10px;
}
</style>
