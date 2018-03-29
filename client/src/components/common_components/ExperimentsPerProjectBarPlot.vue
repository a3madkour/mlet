<template>
<bar-plot ref="experimentsProjectPlot" :data="experimentProjectData" :options="experimentProjectOptions"></bar-plot>
</template>

<script>
import Vue from 'vue';
import BarPlot from './BarPlot';
import ExperimentsService from '@/services/ExperimentsService'
import ProjectsService from '@/services/ProjectsService'

export default {
  components: {
    BarPlot
  },
  data: function () {
    return {
      experiments: null,
      projects: null,
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
    this.getProjects();
    this.getExperiments()

    this.initDatasets();
    this.timer = setInterval(this.fetchData, 1000)
  },
  methods: {
    initDatasets: function() {
      this.experimentProjectData = {
        labels: null,
        datasets: [
          {
            label: '# of Experiments',
            borderColor: '#36495d',
            borderWidth: 2,
            backgroundColor: 'rgba(54,73,93,.5)',
            data: null
          }
        ]
      };
    },
    fetchData: function () { 
      this.getProjects();
      this.getExperiments()
     
      var projectNames = this.projects.map(item => item.name);
      this.experimentProjectData.labels = projectNames;
      var numExperimentsPerProject = projectNames.map(pname => this.experiments.filter(item => item.project == pname).length);
      this.experimentProjectData.datasets[0].data = numExperimentsPerProject;
      this.$refs.experimentsProjectPlot.update();
    },
    getProjects: async function () {
      const response = await ProjectsService.fetchProjects()
      this.projects = response.data.projects;
    },
    getExperiments: async function () {
      const response = await ExperimentsService.fetchExperiments();
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
