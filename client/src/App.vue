<template>
  <div id="app">
  <notifications group="experiment-saved"
                 position="bottom right"
                 :speed="500"
                 :duration="1000"/>
  <notifications group="experiment-created"
                 position="bottom right"
                 :speed="500"
                 :duration="1000"/>
  <notifications group="project-created"
                 position="bottom right"
                 :speed="500"
                 :duration="1000"/>

    <div class="container-fluid"">
      <div class="row full-width-row">
        <div class="col-2">
	      <Toolbar v-if = "$route.name != 'Welcome'"/>
        </div>
        <div class="col-10">
          <router-view/>
        </div>
      </div>
    </div>
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
@import '../node_modules/bootstrap/scss/bootstrap.scss';

html {
  font-size: 14px;
}

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
.buttons{
  width: 100%;
  display:inline-block;
  overflow: auto;
  white-space: nowrap;
  margin:0px auto;
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
