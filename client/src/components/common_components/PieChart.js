import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  },
  methods: {
    update: function () {
      this.$data._chart.update();
    },
  }
}
