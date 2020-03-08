<template>
  <div id="work-area">
    <div id="page" ref="page">
        <TableBox
          v-for="table in tables"
          v-bind:key="table.id"
          v-bind:id="table.id"
        ></TableBox>
        <svg id="draw" />
    </div>
  </div>
</template>

<script>
import TableBox from './TableBox'
import store from '../store/index'
import Panzoom from '@panzoom/panzoom'
import jsplumb from 'jsplumb'

export default {
  name: 'work-area',
  computed: {
    tables: function () {
      return store.state.tables
    }
  },
  props: {
    data: Array
  },
  mounted: function () {
    var el = this.$refs.page

    store.state.lib.panzoom = new Panzoom(el)

    var jsPlumb = jsplumb.jsPlumb.getInstance()
    jsPlumb.setContainer(el)
    store.state.lib.jsPlumb = jsPlumb
  },
  components: {
    TableBox
  }
}
</script>

<style scoped>
#work-area{
  width: 100%;
  height: 100vh;
  background: #eee;
}

#page, #draw{
  width: 1500px;
  height: 1500px;
  background: #fff;
}
</style>
