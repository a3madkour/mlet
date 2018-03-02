<template>
  <div class="userPermissions">
    <div align="center" style = "margin:auto;width:50%;bottom:50%;">
      <div  class = "buttons">
        <a href="#" class="btn btn-info btn-lg">
          <span class="glyphicon glyphicon-user"></span> 
        </a>
        <p> <b>User:</b> {{user.name}} </p>
      </div>
      <div id='example-3'>
        <input type="checkbox" id="Read" value="Read" v-model="user.permissions">
        <label for="Read">Read</label>
        <input type="checkbox" id="Write" value="Write" v-model="user.permissions">
        <label for="Write">Write</label>
        <input type="checkbox" id="Execute" value="Execute" v-model="user.permissions">
        <label for="Execute">Execute</label>
      </div>
      <div class = "buttons">
        <div style = "float:right;"> 
         <button type="button" class="btn btn-primary" @click="$emit('close')" >
          Confirm
        </button>
        </div>
        <div style = "float:left;"> 
         <button type="button" class="btn btn-danger" @click="$emit('close')" >
          Cancel
        </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
export default {
  name: 'userPermissions',
  props : ["user"],
  components: {
  },
  data () {
    return {
      selected: [], // Must be an array reference!
    }  
  },
  methods: {}
}
</script>
<style>
</style>
