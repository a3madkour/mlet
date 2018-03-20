<template>
  <div class="help-modal">
    <button type="button" class="close" aria-label="Close" @click="$emit('close')" >
      <span aria-hidden="true"> &times; </span>
    </button>
    <h3 class="text-center"> {{ header_text }} </h3>
    <div class="help-body">
      <p> {{ help_text }} </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'helpModal',
  props : ["header_text", "help_text"],
  components: {},
  data: function () {
    return {}  
  },
}
</script>

<style>

.help-modal {
  margin:auto; 
  padding-top: 2%;
  padding-left: 2%;
  padding-right: 2%;
}

.close {
  line-height: 12px;
  width: 18px;
  font-size: 20pt;
  font-family: tahoma;
  margin-top: 1px;
  margin-right: 2px;
  position:absolute;
  top:10px;
  right:10px;
}

.help-body {
  text-align: center;
}

</style>
