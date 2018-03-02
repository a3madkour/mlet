<template>
  <div class = "dialog">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div style="position :absolute;left:0px;bottom:0px;" >
      <button type="button" class="btn btn-danger" @click="$emit('close')" >
        Cancel 
      </button>
    </div>
    <div style="position :absolute;right:0px;bottom:0px;" >
      <button type="button" class="btn btn-primary" @click=nextDialog >
        Next 
      </button>
    </div>
    <div v-if='currentScreen === 0'>
        world
    </div>
    <div v-if='currentScreen === 1'>
        hello 
    </div>
    <div v-if='currentScreen === 2'>
        hello collin
    </div>
  </div>
</template>
<script>
export default {
  name: 'projectDialog',
  props: ['text'],
  methods: {
    nextDialog : function(){
      this.currentScreen += 1;
    }
  },
  data (){
    return{currentScreen : 0}
  }
}
</script>
<style>
</style>
