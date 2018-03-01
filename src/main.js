import Vue from 'vue'
import App from './App.vue'
import { TableComponent, TableColumn } from 'vue-table-component';
import 'vue-awesome/icons'

new Vue({
  el: '#app',
  render: h => h(App),

  components: {
	TableColumn,
    TableComponent,
  },
})
