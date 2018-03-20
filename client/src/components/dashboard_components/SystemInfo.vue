<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-6">
        <div class="chart">
          <h1 style="text-align:center;">CPU Usage (%)</h1>
          <line-plot :data="[50, 60, 55, 45, 35, 35]"></line-plot>
        </div>
      </div>
      <div class="col-6">
        <div class="chart">
          <h1 style="text-align:center;">RAM Usage (%)</h1>
          <line-plot :data="[36, 75, 80, 65, 50 , 65]"></line-plot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import LinePlot from '../common_components/LinePlot';
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  components: {
    LinePlot,	
  },
  data: function () {
    return {
      cpuUsage: [],
      i: 1,
      timer: '',
    }
  },
  created: function() {
    this.fetchCpuUsage();
    this.timer = setInterval(this.fetchCpuUsage, 1000)
  },
  methods: {
    fetchCpuUsage: function () {
      var os = require('os-utils');
      os.cpuUsage(function (v) {
        this.cpuUsage = v;
      });
    },
    cancelAutoUpdate: function () {
      clearInterval(this.timer);
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.Chart {
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
  border-radius: 20px;
  margin: 50px 0;
}
</style>
