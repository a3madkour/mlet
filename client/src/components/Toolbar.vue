<template>
  <div class="toolbar">
    <div class="top">
      <a @click="activate_el(0)" v-bind:class="{active: active_el == 0}" href="#/" title="Dashboard">
        <icon name="home" scale="2.5"></icon><span>Dashboard</span>
      </a>
      <a @click="activate_el(1)" :class="{active: active_el == 1}" href="#/projects" title="Projects">
        <icon name="folder-open" scale="2.5"></icon><span>Projects</span>
        </a>
      <a @click="activate_el(2)" :class="{active: active_el == 2}" href="#/experiments" title="Experiments">
        <icon name="flask" scale="2.5"></icon><span>Experiments</span>
      </a>
    </div>
    <div class="bottom">
      <a @click="activate_el(3)" :class="{active: active_el == 3}" href="#/search" title="Search">
        <icon name="search" scale="2.5"></icon><span>Search</span>
      </a>
      <a @click="activate_el(4)" :class="{active: active_el == 4}" href="#/settings" title="Settings">
        <icon name="cog" scale="2.5"></icon><span>Settings</span>
      </a>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  export default {
    components: {
      Icon
    },
    data: function() {
      return {
        active_el: 0,
      }
    },
    methods: {
      activate_el: function(el) {
        this.active_el = el;
      }
    }
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
  border-width: 3px;
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
  border-width: 3px;
}

.toolbar .active {
  background-color: #4CAF50;
  border-style: solid;
  border-color: #FFFACD; 
  border-top: none;
  border-bottom: none;
  border-left: none;
  border-width: 3px;
}
</style>
