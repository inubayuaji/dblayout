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
        name: 'New row',
        relations: []
      }
      state.tables[i].rows.push(newRow)
    },
    delRow (state, { table, id }) {
      var tableIndex = state.tables.findIndex(x => x.id === table)
      var rows = state.tables[tableIndex].rows.filter(x => x.id !== id)
      state.tables[tableIndex].rows = rows
    },
    addConnection (state, info) {
      var relation = null
      var sourceParentId = info.source.parentNode.id
      var targetParentId = info.target.parentNode.id
      var sourceId = info.sourceId
      var targetId = info.targetId

      var tableSourceIndex = state.tables.findIndex(x => x.id === sourceParentId)
      var tableTargetIndex = state.tables.findIndex(x => x.id === targetParentId)
      var rowSourceIndex = state.tables[tableSourceIndex].rows.findIndex(x => x.id === sourceId)
      var rowTargetIndex = state.tables[tableTargetIndex].rows.findIndex(x => x.id === targetId)

      relation = {
        toId: targetId,
        type: 'one-to-one'
      }
      state.tables[tableSourceIndex].rows[rowSourceIndex].relations.push(relation)

      relation = {
        toId: sourceId,
        type: 'one-to-one'
      }
      state.tables[tableTargetIndex].rows[rowTargetIndex].relations.push(relation)
    },
    delConnection (state, info) {
      var relation = null
      var sourceParentId = info.source.parentNode.id
      var targetParentId = info.target.parentNode.id
      var sourceId = info.sourceId
      var targetId = info.targetId

      var tableSourceIndex = state.tables.findIndex(x => x.id === sourceParentId)
      var tableTargetIndex = state.tables.findIndex(x => x.id === targetParentId)
      var rowSourceIndex = state.tables[tableSourceIndex].rows.findIndex(x => x.id === sourceId)
      var rowTargetIndex = state.tables[tableTargetIndex].rows.findIndex(x => x.id === targetId)

      relation = state.tables[tableSourceIndex].rows[rowSourceIndex].relations
      relation = relation.filter(x => x.toId !== targetId)
      console.log(relation)
      state.tables[tableSourceIndex].rows[rowSourceIndex].relations = relation

      relation = state.tables[tableTargetIndex].rows[rowTargetIndex].relations
      relation = relation.filter(x => x.toId !== sourceId)
      console.log(relation)
      state.tables[tableTargetIndex].rows[rowTargetIndex].relations = relation
    }
  }
})
