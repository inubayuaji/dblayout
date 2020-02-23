<template>
  <Drag class="card" v-bind:id="id" :drag-handle="'.card-header'">
    <div class="card-header">
      New entity {{ id }}
      <button v-on:click="addRow(id)">+</button>
      <button v-on:click="delTable(id)">X</button>
    </div>
    <div class="card-body">
      <ul>
        <Row
          v-for="row in rows"
          v-bind:key="row.id"
          v-bind:id="row.id"
          v-bind:table="id"
          v-bind:data="row"
        ></Row>
      </ul>
    </div>
  </Drag>
</template>

<script>
import Drag from 'vue-draggable-resizable'
import Row from './Row'
import store from '../store/index'

export default {
  name: 'table-box',
  computed: {
    rows: function () {
      var i = store.state.tables.findIndex(x => x.id === this.id)
      return store.state.tables[i].rows
    }
  },
  methods: {
    delTable: function (id) {
      store.commit('delTable', id)
    },
    addRow: function (id) {
      store.commit('addRow', id)
    }
  },
  props: {
    id: String
  },
  components: {
    Drag,
    Row
  }
}
</script>
