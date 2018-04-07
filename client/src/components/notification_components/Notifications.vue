<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <v-client-table class="n-table" :columns="columns" :data="tableData" :options="options">
        </v-client-table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import moment from 'moment'
import UsersService from '@/services/UsersService'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

var unixToDate = function (t) {
  return moment.unix(t).format("YYYY-MM-DD HH:mm");
}

export default {
  components: {
  },
  data: function () {
    return {
      columns: ['description', 'type', 'time'],
      tableData: [],
      nOptions: {
          filterable: false,
          perPage:5,
          orderBy: {column: 'time'},
      }
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 1);
  },
  methods:{
    async getUser(){
      const response = await UsersService.getUser({
        id : 111,
        name: this.$user
      })
      this.tableData = response.data[0].notifications
    }
  },
  mounted: function(){
    this.getUser();
  }
}

</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.toggle {
  display:block;
}

.n-table tr td:nth-child(n+1):nth-child(-n+6) {
  white-space: nowrap;
}

.n-table tr tf:nth-child(n+7) {
  width: 25px;
}

.add-button {
 position: fixed;
 bottom: 10px;
 right: 10px;
}
</style>
