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
      runningExperiments: null,
      queuedExperiments: null,
      completedExperiments: null,
      failedExperiments: null,
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
    this.timer = setInterval(this.fetchData, 5000);
  },
  methods: {
    initDatasets: function() {
      this.experimentData = {
        labels: ['Running', 'Queued', 'Completed', 'Failed'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [0,0,0,0]
          }
        ]
      };
    },
    fetchData: function () { 
      this.getExperiments();
      var num_running_experiments = this.runningExperiments.length;
      var num_queued_experiments = this.queuedExperiments.length;
      var num_completed_experiments = this.completedExperiments.length;
      var num_failed_experiments = this.failedExperiments.length;
      this.experimentData.datasets[0].data = [num_running_experiments,num_queued_experiments,num_completed_experiments,num_failed_experiments];
      this.$refs.experimentsPlot.update();
    },
    //TODO: There is probably a better way to do this
    getExperiments: async function () {
      const runningResponse = await ExperimentsService.fetchExperiments({status: 'Running'});
      this.runningExperiments = runningResponse.data.experiments;

      const queuedResponse = await ExperimentsService.fetchExperiments({status: 'Queued'});
      this.queuedExperiments = queuedResponse.data.experiments;

      const completedResponse = await ExperimentsService.fetchExperiments({status: 'Completed'});
      this.completedExperiments = completedResponse.data.experiments;

      const failedResponse = await ExperimentsService.fetchExperiments({status: 'Failed'});
      this.failedExperiments = failedResponse.data.experiments;
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
