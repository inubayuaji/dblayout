<template>
  <li v-bind:id="id">{{id}} - {{ data.name }} <a href="#" v-on:click="delRow()">Hapus</a></li>
</template>

<script>
import store from '../store/index'

export default {
  name: 'row',
  methods: {
    delRow: function () {
      var payload = {
        table: this.table,
        id: this.id
      }
      store.commit('delRow', payload)
    }
  },
  props: {
    id: String,
    table: String,
    data: Object
  }
}
</script>
