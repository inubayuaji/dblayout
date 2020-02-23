<template>
  <div id="app">
    <Tools></Tools>
    <WorkAre></WorkAre>
  </div>
</template>

<script>
import Tools from './components/Tools'
import WorkAre from './components/WorkArea'

export default {
  name: 'App',
  components: {
    Tools,
    WorkAre
  }
}
</script>
