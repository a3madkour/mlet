<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-8">
        <div class="chart">
          <h3>System Usage</h3>
          <line-plot ref="systemPlot" :data="systemData" :options="systemOptions"></line-plot>
        </div>
      </div>
      <div class="col-4">
        <div class="chart">
          <h3>My Experiments</h3>
          <MyExperimentsPieChart></MyExperimentsPieChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import LinePlot from '../common_components/LinePlot';
import MyExperimentsPieChart from '../common_components/MyExperimentsPieChart.vue'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);
let os = require('os');

export default {
  components: {
    MyExperimentsPieChart,
    LinePlot,	
  },
  data: function () {
    return {
      systemData: null,
      systemOptions: {
        responsive: true,
        maintainAspectRatio: false, 
        lineTension: 1, 
        scales: {
          yAxes: [{ 
            ticks: {
              beginAtZero: true, 
              padding:25,
            }
          }]
        }
      },
      timer: '',
    }
  },
  created: function() {
    this.initDatasets();
    this.timer = setInterval(this.fetchData, 5000)
  },
  methods: {
    initDatasets: function() {
      this.systemData = {
        labels: this.generateLabels(-9, 0),
        datasets: [
          {
            label: 'CPU Usage (%)',
            borderColor: '#36495d',
            borderWidth: 2,
            backgroundColor: 'rgba(54,73,93,.5)',
            data: this.getRandomInt(10)
          },
          {
            label: 'RAM Usage (%)',
            borderColor: '#47b784',
            borderWidth: 2,
            backgroundColor: 'rgba(71, 183,132,.5)',

            data: this.getRandomInt(10)
          }
        ]
      };
    },
    fetchData: function () { 
      this.systemData.datasets[0].data.shift();
      this.systemData.datasets[1].data.shift();
      this.systemData.datasets[0].data = this.systemData.datasets[0].data.concat(this.getRandomInt(1));
      this.systemData.datasets[1].data = this.systemData.datasets[1].data.concat(this.getRandomInt(1));

      this.$refs.systemPlot.update();
    },
    cancelAutoUpdate: function () {
      clearInterval(this.timer);
    },
    generateLabels: function (a, b) {
      var list = [];
			for (var i=a; i<=b; i++) {
 			  list.push(i);
      }
      return list;
    },
    getRandomInt: function(n, min=0, max=100) {
      var int_list = [];
      for (var i=0; i<=n; i++) {
        int_list.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return int_list;
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

.chart h3 {
  margin-top: 0;
  padding: 15px 0;
  text-align: center;
}
</style>
