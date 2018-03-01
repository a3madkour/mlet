<template>
  <div class="toolbar">
    <div class="top">
      <a class="active" href="#" title="Dashboard"><icon name="home" scale="2.5"></icon><span>Dashboard</span></a>
      <a href="#" title="Projects"><icon name="folder-open" scale="2.5"></icon><span>Projects</span></a>
      <a href="#" title="Experiments"><icon name="flask" scale="2.5"></icon><span>Experiments</span></a>
    </div>
    <div class="bottom">
      <a href="#" title="Search"><icon name="search" scale="2.5"></icon><span>Search</span></a>
      <a href="#" title="Settings"><icon name="cog" scale="2.5"></icon><span>Settings</span></a>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  export default {
    components: {
      Icon
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
}

.toolbar .active {
  background-color: #4CAF50;
}
</style>

