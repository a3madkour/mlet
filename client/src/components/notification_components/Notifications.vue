<template>
  <div class="py-3 container-fluid">
    <p> test </p>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  components: {},
  data: function () {
    return {}
  },
  created: function() {
    EventBus.$emit('activate_element', 1);
  },
}
</script>

<style>

</style>
