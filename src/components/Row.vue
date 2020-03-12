<template>
  <div class="Box-row" v-bind:id="id">{{ data.name }} <button type="button" v-on:click="delRow()"><i class="ri-delete-back-2-line"></i></button></div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'row',
  methods: {
    delRow: function () {
      store.state.lib.jsPlumb.remove(this.id)
      var payload = {
        table: this.table,
        id: this.id
      }
      store.commit('delRow', payload)
    }
  },
  mounted: function () {
    store.state.lib.jsPlumb.addEndpoint(this.id, {
      isSource: true,
      isTarget: true,
      anchor: ['Continuous', { faces: ['left', 'right'] }],
      cssClass: 'panzoom-exclude'
    })

    store.state.lib.jsPlumb.revalidate(this.id)
  },
  props: {
    id: String,
    table: String,
    data: Object
  }
}
</script>
