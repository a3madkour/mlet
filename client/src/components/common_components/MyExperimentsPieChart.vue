<template>
<pie-chart ref="experimentsPlot" :data="experimentData" :options="experimentOptions"></pie-chart>
</template>

<script>
import Vue from 'vue';
import ExperimentsService from '@/services/ExperimentsService'
import PieChart from './PieChart';

export default {
  components: {
    PieChart,
  },
  data: function () {
    return {
      experiments: null,
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
    this.timer = setInterval(this.fetchData, 1000)
  },
  methods: {
    initDatasets: function() {
      this.experimentData = {
        labels: ['Running', 'Queued', 'On Hold','Completed', 'Failed'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651',  '#FFFF00', '#00D8FF', '#DD1B16'],
            data: [0,0,0,0,0]
          }
        ]
      };
    },
    fetchData: function () { 
      this.getExperiments();
      var num_running_experiments = this.experiments.filter(item => item.status == "Running").length;
      var num_queued_experiments = this.experiments.filter(item => item.status == "Queued").length;
      var num_not_queued_experiments = this.experiments.filter(item => item.status == "On Hold").length;
      var num_completed_experiments = this.experiments.filter(item => item.status == "Completed").length;
      var num_failed_experiments = this.experiments.filter(item => item.status == "Failed").length;
      num_running_experiments = this.experiments.length;
      this.experimentData.datasets[0].data = [num_running_experiments,num_queued_experiments,num_not_queued_experiments,num_completed_experiments,num_failed_experiments];
      this.$refs.experimentsPlot.update();
    },
    getExperiments: async function () {
      const response = await ExperimentsService.fetchExperiments({owner: this.$user});
      this.experiments = response.data.experiments;
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
