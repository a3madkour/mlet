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
      <td v-for="key in columns">
        {{ entry[key] }}
      </td>
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
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  props: ['data']
}
</script>

<style lang='scss'>
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
