import uniqid from 'uniqid'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tables: [],
    lib: {
      panzoom: null,
      jsPlumb: null
    }
  },
  mutations: {
    addTable (state) {
      var newTable = {
        id: uniqid('table-'),
        name: 'New table',
        rows: []
      }
      state.tables.push(newTable)
    },
    delTable (state, id) {
      state.tables = state.tables.filter(x => x.id !== id)
    },
    addRow (state, id) {
      var i = state.tables.findIndex(x => x.id === id)
      var rowId = uniqid('r-')
      var newRow = {
        id: rowId,
        name: 'New row'
      }
      state.tables[i].rows.push(newRow)
    },
    delRow (state, { table, id }) {
      var tableIndex = state.tables.findIndex(x => x.id === table)
      var rows = state.tables[tableIndex].rows.filter(x => x.id !== id)
      state.tables[tableIndex].rows = rows
    }
  }
})
