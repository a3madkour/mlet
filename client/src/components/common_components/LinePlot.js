import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['color', 'data'],
  mounted () {
    this.renderChart({
      labels: this.generateLabels(-this.data.length+1, 0),
      datasets: [
        {
          backgroundColor: "#f87979",
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  methods: {
    generateLabels: function (a, b) {
      var list = [];
			for (var i=a; i<=b; i++) {
 			  list.push(i);
      }
      return list;
    },
  }
}
