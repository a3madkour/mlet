<template>
  <div class="userPermissions">
    <div align="center" style = "margin:auto;width:50%;bottom:50%;">
      <div  class = "buttons">
          <icon name="user" scale="2.5"></icon>
        <p> <b>User(s):</b> {{users.join()}} </p>
      </div>
      <div id='example-3'>
        <input type="checkbox" id="Read" value="Read">
        <label for="Read">Read</label>
        <input type="checkbox" id="Write" value="Write" >
        <label for="Write">Write</label>
        <input type="checkbox" id="Execute" value="Execute" >
        <label for="Execute">Execute</label>
      </div>
      <div class = "buttons">
        <div style = "float:right;"> 
         <button type="button" class="btn btn-primary" @click="addUser" >
          Confirm
        </button>
        </div>
        <div style = "float:left;"> 
         <button type="button" class="btn btn-danger" @click="$modal.hide(name)" >
          Cancel
        </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'userPermissions',
  props : ["users", "name"],
  components: {Icon
  },
  data () {
    return {
      selected: [], // Must be an array reference!
    }  
  },
  methods: {
    addUser(){
      this.$modal.hide(this.name)
    }
  }
}
</script>
<style>
</style>
