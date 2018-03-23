<template>
<pie-chart ref="experimentPlot" :data="experimentData" :options="experimentOptions"></pie-chart>
</template>

<script>
import Vue from 'vue';
import PieChart from './PieChart';

export default {
  components: {
    PieChart,
  },
  props: ['data'],
  data: function () {
    return {
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
      this.experimentData = {
        labels: ['Running', 'Queued', 'Completed', 'Failed'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: this.data
          }
        ]
      };
    },
    fetchData: function () { 
      //this.experimentData.datasets[0].data[i] += this.getRandomInt(1,-1,1)[0];

      //this.$refs.experimentPlot.update();
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
