<template>
  <div id="app">
    <h1>MLET App!</h1>
	<Toolbar/>
  </div>
</template>

<script>

import Toolbar from './components/Toolbar.vue'

export default {
  name: 'app',
  components: {
    Toolbar
  }
}

</script>

<style lang="scss">

body {
  margin: 0px;
  padding: 0px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

h1 {
  text-align: center;
}

</style>
