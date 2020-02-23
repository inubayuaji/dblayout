<template>
  <div id="work-area">
    <TableBox
      v-for="table in tables"
      v-bind:key="table.id"
      v-bind:id="table.id"
    ></TableBox>
    <svg id="draw" />
  </div>
</template>

<script>
import TableBox from './TableBox'
import store from '../store/index'

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
  components: {
    TableBox
  }
}
</script>

<style scoped>
#work-area, #draw {
  width: 100%;
  height: 100vh;
}
</style>
