<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <h2 class='text-left'>Notifications</h2>
        <DashNotificationsTable/>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h2 class='text-left'>Experiments</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
      </div>

      <div class="col-4">
        <h2 class='text-left'>Projects</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
      </div>

      <div class="col-2">
        <h2 class='text-left'>System Info</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DashNotificationsTable from './DashNotificationsTable.vue'

export default {
  components: {
    DashNotificationsTable
  }
}

</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
