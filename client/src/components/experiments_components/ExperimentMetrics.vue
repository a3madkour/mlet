<template>
<div class="row mh1">
  <div class="col-6">
    <div class="chart">
      <h3>Experiments Per Project</h3>
      <ExperimentsPerProjectBarPlot></ExperimentsPerProjectBarPlot>
    </div>
  </div>
  <div class="col-2">
  </div>
  <div class="col-4">
    <div class="chart">
      <h3>All Experiments</h3>
      <ExperimentsPieChart></ExperimentsPieChart>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import ExperimentsPieChart from '../common_components/ExperimentsPieChart.vue'
import ExperimentsPerProjectBarPlot from '../common_components/ExperimentsPerProjectBarPlot.vue'

export default {
  components: {
    ExperimentsPieChart,
    ExperimentsPerProjectBarPlot
  },
  data: function () {
    return {
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
