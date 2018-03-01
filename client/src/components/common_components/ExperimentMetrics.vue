<template>
  <table class="table table-bordered"> 
    <thead>
      <tr> 
        <th v-for="key in columns"> 
          {{ key | capitalize }}
        </th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="entry in data">
      <th v-for="key in columns">
        {{ entry[key] }}
      </th>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  components: {},
  data: function () {
    return {
      columns: ['queued', 'running', 'completed', 'failed'],
      data:  [{queued: '1', running: '1', completed: '1', failed: '1'}]
    }
  }
}
</script>

<style lang='scss'>
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
