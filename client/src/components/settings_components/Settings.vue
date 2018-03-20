<template>
  <div class="py-3 container-fluid">
    <p> TODO: Settings stuff </p>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';

export default {
  components: {},
  created: function() {
    EventBus.$emit('activate_element', 5);
  },
}
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
