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
          <h3>Experiment Status</h3>
          <pie-chart ref="experimentPlot" :data="experimentData" :options="experimentOptions"></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import LinePlot from '../common_components/LinePlot';
import PieChart from '../common_components/PieChart';
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);
let os = require('os');

export default {
  components: {
    LinePlot,	
    PieChart,
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
      experimentData: null,
      experimentOptions: {
        responsive: true,
        maintainAspectRatio: false, 
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

      this.experimentData = {
        labels: ['Running', 'Queued', 'Completed', 'Failed'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [4, 10, 8, 4]
          }
        ]
      };
    },
    fetchData: function () { 
      this.systemData.datasets[0].data.shift();
      this.systemData.datasets[1].data.shift();
      this.systemData.datasets[0].data = this.systemData.datasets[0].data.concat(this.getRandomInt(1));
      this.systemData.datasets[1].data = this.systemData.datasets[1].data.concat(this.getRandomInt(1));

      var i = this.getRandomInt(1,0,3)[0];
      this.experimentData.datasets[0].data[i] += this.getRandomInt(1,-1,1)[0];

      this.$refs.systemPlot.update();
      this.$refs.experimentPlot.update();
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
