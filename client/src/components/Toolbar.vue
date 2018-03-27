<template>
  <div class="toolbar">
    <div class="top">
      <a v-bind:class="{active: active_el == 0}" href="#/dashboard" title="Dashboard">
        <icon name="home" scale="2.5"></icon><span>Dashboard</span>
      </a>
      <a v-bind:class="{active: active_el == 1}" href="#/notifications" title="Notifications">
        <Popper v-if="num_new_notifications > 0" :trigger='null' :force-show=true :visible-arrow=false :options="{placement: 'top-end'}">
          <div class="popper">
            {{ num_new_notifications }}
          </div>

          <icon slot="reference" name="bell" scale="2.5"></icon>
        </Popper>
        <span>Notifications</span>
      </a>
      <a v-bind:class="{active: active_el == 2}" href="#/projects" title="Projects">
        <icon name="folder-open" scale="2.5"></icon><span>Projects</span>
      </a>
      <a v-bind:class="{active: active_el == 3}" href="#/experiments" title="Experiments">
        <icon name="flask" scale="2.5"></icon><span>Experiments</span>
      </a>
    </div>
    <div class="bottom">
      <a v-bind:class="{active: active_el == 4}" href="#/search" title="Search">
        <icon name="search" scale="2.5"></icon><span>Search</span>
      </a>
      <a v-bind:class="{active: active_el == 5}" href="#/settings" title="Settings">
        <icon name="cog" scale="2.5"></icon><span>Settings</span>
      </a>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import Popper from 'vue-popperjs';
import EventBus from '../event-bus';
import 'vue-popperjs/dist/css/vue-popper.css';

export default {
  components: {
    Popper,
    Icon
  },
  data: function() {
    return {
      active_el: 0,
      num_new_notifications: 1,
    }
  }, 
  created: function() {
    EventBus.$on('activate_element', this.activate_el);
  },
  beforeDestroy: function() {
    EventBus.$off('activate_element', this.activate_el);
  },
  methods: {
    activate_el: function(el) {
      this.active_el = el;
    }
  },
}
</script>

<style>
.toolbar {
  width: 125px;
  height: 100%;
  position: fixed;
  margin: 0px;
  padding: 0px;
  background-color: #555;
  border-style: solid;
  border-color: #FFFACD; 
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-width: 4px;
}

.toolbar .top {
  position: fixed;
  top: 0px;
  width: inherit;
}

.toolbar .bottom {
  position: fixed;
  bottom: 0px;
  width: inherit;
}

.toolbar a {
  display: block;
  text-align: center;
  padding: 16px;
  transition: all 0.3s ease;
  color: white;
  font-size: 36px;
}

.toolbar a span {
  color: white;
  font-size: 10px;
  padding: 5px 0 10px 0;
  display: block;
  text-transform: uppercase;
  letter-spacing: 1px; 
}

.toolbar a:hover {
  background-color: #000;
  border-style: solid;
  border-color: #FFFACD; 
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-width: 4px;
}

.toolbar .active {
  background-color: #4CAF50;
  border-style: solid;
  border-color: #FFFACD; 
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-width: 4px;
}

.popper {
  background: #FF0000;
  border-color: #FF0000;
  color: #FFFFFF;
  text-align: center;
}

</style>
