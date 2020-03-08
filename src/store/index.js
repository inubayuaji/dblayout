import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0,
    tables: [],
    lib: {
      panzoom: null,
      jsPlumb: null
    }
  },
  mutations: {
    addTable (state) {
      var newId = 't' + state.counter.toString()
      var newTable = {
        id: newId,
        name: 'New table',
        rows: [],
        counter: 0
      }
      state.tables.push(newTable)
      state.counter++
    },
    delTable (state, id) {
      state.tables = state.tables.filter(x => x.id !== id)
    },
    addRow (state, id) {
      var i = state.tables.findIndex(x => x.id === id)
      var tableId = id.substr(1)
      var newId = 'r' + tableId + '.' + state.tables[i].counter.toString()
      var newRow = {
        id: newId,
        name: 'New row'
      }
      state.tables[i].rows.push(newRow)
      state.tables[i].counter++
    },
    delRow (state, { table, id }) {
      var tableIndex = state.tables.findIndex(x => x.id === table)
      var rows = state.tables[tableIndex].rows.filter(x => x.id !== id)
      state.tables[tableIndex].rows = rows
    }
  }
})
