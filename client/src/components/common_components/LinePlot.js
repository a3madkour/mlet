import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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
