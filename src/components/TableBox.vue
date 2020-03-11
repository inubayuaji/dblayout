<template>
  <div class="Box Box--condensed panzoom-exclude" v-bind:id="id" ref="tableBox">
    <div class="Box-header">
      New entity {{ id }}
      <button v-on:click="addRow(id)">+</button>
      <button v-on:click="delTable(id)">X</button>
    </div>
    <Row
      v-for="row in rows"
      v-bind:key="row.id"
      v-bind:id="row.id"
      v-bind:table="id"
      v-bind:data="row"
    ></Row>
  </div>
</template>

<script>
import interact from 'interactjs'
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
    initInteract: function (el) {
      interact(el).draggable({
        onmove: this.dragMoveListener,
        allowFrom: '.Box-header',
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      })
    },
    dragMoveListener: function (event) {
      var target = event.target
      var zoomScale = store.state.lib.panzoom.getScale()

      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / zoomScale
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / zoomScale

      // translate the element
      target.style.left = x + 'px'
      target.style.top = y + 'px'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

      // merubah posisi jsPlumb untuk setiap row
      this.rows.forEach(el => {
        store.state.lib.jsPlumb.revalidate(el.id)
      })
    },
    delTable: function (id) {
      this.rows.forEach(el => {
        store.state.lib.jsPlumb.remove(el.id)
      })

      store.commit('delTable', id)
    },
    addRow: function (id) {
      store.commit('addRow', id)
    }
  },
  mounted: function () {
    var el = this.$refs.tableBox
    this.initInteract(el)
  },
  props: {
    id: String
  },
  components: {
    Row
  }
}
</script>

<style scoped>
.Box{
  width: 300px;
  position: absolute;
  touch-action: none;
  user-select: none;
  cursor: auto;
}
</style>
