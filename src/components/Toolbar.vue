<template>
  <div class="toolbar">
    <div class="top">
      <a class="active" href="#" title="Dashboard"><icon name="fa-home"></icon><span>Dashboard</span></a>
      <a href="#" title="Projects"><icon name="folder-open"></icon><span>Projects</span></a>
      <a href="#" title="Experiments"><i class="fa fa-flask"></i><span>Experiments</span></a>
    </div>
    <div class="bottom">
      <a href="#" title="Search"><i class="fa fa-search"></i><span>Search</span></a>
      <a href="#" title="Settings"><i class="fa fa-cog"></i><span>Settings</span></a>
    </div>
  </div>
</template>

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
