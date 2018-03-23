<template>
<bar-plot ref="experimentProjectPlot" :data="experimentProjectData" :options="experimentProjectOptions"></bar-plot>
</template>

<script>
import Vue from 'vue';
import BarPlot from './BarPlot';

export default {
  components: {
    BarPlot
  },
  props: ['data'],
  data: function () {
    return {
      experimentProjectData: null,
      experimentProjectOptions: {
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
      this.experimentProjectData = {
        labels: ['Project1', 'Project2', 'Project3', 'Project4'],
        datasets: [
          {
            label: '# of Experiments',
            borderColor: '#36495d',
            borderWidth: 2,
            backgroundColor: 'rgba(54,73,93,.5)',
            data: this.data
          }
        ]
      };
    },
    fetchData: function () { 
      //this.experimentProjectData.datasets[0].data[i] += this.getRandomInt(1,-1,1)[0];

      //this.$refs.experimentProjectPlot.update();
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

<style lang='scss'>
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.chart h3 {
  margin-top: 0;
  padding: 15px 0;
  text-align: center;
}
</style>
