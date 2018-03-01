<template>
  <div id="app">
    <div class="container-fluid"">
      <div class="row full-width-row">
        <div class="col-2">
	      <Toolbar/>
        </div>
        <div class="col-10">
          <Dashboard/>
          <!--<Experiments/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue'
import Dashboard from './components/dashboard_components/Dashboard.vue'
import Experiments from './components/experiments_components/Experiments.vue'

export default {
  name: 'app',
  components: {
    Toolbar,
    Dashboard,
    Experiments
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
