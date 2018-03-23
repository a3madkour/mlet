<template>
<div class="row mh1">
  <div class="col-6">
    <div class="chart">
      <h3>Experiments Per Project</h3>
      <ExperimentsPerProjectBarPlot :data="expProjectData"></ExperimentsPerProjectBarPlot>
    </div>
  </div>
  <div class="col-2">
  </div>
  <div class="col-4">
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import ExperimentsPerProjectBarPlot from '../common_components/ExperimentsPerProjectBarPlot.vue'

export default {
  components: {
    ExperimentsPerProjectBarPlot
  },
  data: function () {
    return {
      expProjectData: [1, 7, 5, 8],
    }
  },
  created: function() {
  },
  beforeDestroy: function() {
  },
  methods:{
  }
}
</script>

<style>
.mh1 div {
  height: 30vh;
}
</style>
