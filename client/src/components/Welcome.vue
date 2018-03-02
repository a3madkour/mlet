<template>
  <div class = "welcome">
    <h6>
      WELCOME!
    </h6>
    <form>
      <div>
        <small id="db" class="form-text text-muted">Please enter the following information for the database you wish to connect to.</small>
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input type="address" class="form-control" id="address" placeholder="10.205.165.17">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="username" class="form-control" id="username" placeholder="sWalker">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="*********">
      </div>
      <div align="left">
      <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
        Cancel
      </button>
      </div>
      <div align="right">
      <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
        Next
      </button>
      </div>
    </form>
  </div>
</template>

<script>
    export default {
        name: "welcome1"
    }
</script>

<style >
</style>
