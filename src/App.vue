<template>
  <div id="app">
    <h1>MLET App!</h1>
    <div class="container-fluid"">
      <div class="row full-width-row">
        <div class="col-2">
	      <Toolbar/>
        </div>
        <div class="col-10">
          <Dashboard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Toolbar,
    Dashboard
  }
}

</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

body {
  margin: 0px;
  padding: 0px;
  min-width:900px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

h1 {
  text-align: center;
}

h2 {
  text-align: center;
}

.full-width-row {
  overflow-x: hidden;
}

.full-width-row > div {
  margin-left: -15px;
  margin-right: -15px;
}
</style>
