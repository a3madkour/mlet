<template>
<Popper tigger='click' :options="{placement: 'bottom-start', positionFix, modifiers: {preventOverflow: {enabled: false, boundariesElement: 'window'}, offset: {enabled: true, offset: '0,0'}}}">
  <div class="popper">
    <h3 class="text-center"> {{ header_text }} </h3>
    <div class="help-body">
      <p> {{ help_text }} </p>
    </div>
  </div>

  <button type="button" class="btn btn-default btn-sm" slot="reference" style="float: right;">
    <span class="glyphicon glyphicon-question-sign" style="font-size:15px;"></span> 
  </button>
</Popper>
</template>

<script>
import Vue from 'vue';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/css/vue-popper.css';

export default {
  name: 'HelpPopper',
  props : ["header_text", "help_text"],
  components: {Popper},
  data: function () {
    return {}  
  },
}
</script>

<style>
.help-popper {
  margin:auto; 
  padding-top: 2%;
  padding-left: 2%;
  padding-right: 2%;
}

.help-body {
  text-align: center;
}
</style>
