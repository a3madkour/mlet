<template>
<div class="row justify-content-center top-buffer">
  <div class = "welcome col-6">
    <h1>
      WELCOME!
    </h1>
    <form v-if = "currentScreen === 0" >
      <div>
        <p id="db" class="form-text text-muted">Please enter the following information for the database you wish to connect to.</p>
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input type="address" class="form-control" id="address" placeholder="10.205.165.17" v-model="welcomeScreen.address">
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="username" class="form-control" id="username" placeholder="sWalker"  v-model="welcomeScreen.username">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="*********"  v-model="welcomeScreen.password">
      </div>
    </form>
    <div v-if = "currentScreen === 1">
      <form>
        <div>
          <p id="db" class="form-text text-muted">Please update the following information.</p>
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="username" class="form-control" id="username" placeholder="sWalker" v-model="welcomeScreen.username">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="*********" v-model="welcomeScreen.password">
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="name" class="form-control" id="name" placeholder="Samantha Walker" v-model="welcomeScreen.name">
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="walker.s@bogus.edu" v-model="welcomeScreen.email">
        </div>
      </form>
    </div>
    <div v-if = "currentScreen === 2">
        <div>
          <p id="db" class="form-text text-muted">Please select the projects you wish to be added to.</p>
        </div>
        <select class="custom-select" multiple>
          <option selected>Sample Project</option>
        </select>
      </div>
      <div class='buttons'>
        <div  style = 'float:right;' v-if = "currentScreen != 2">
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" @click=nextDialog>
              Next
            </button>
        </div>
        <div  style = 'float:left;' v-if = "currentScreen != 0">
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off" @click=previousDialog>
              Back
            </button>
        </div>
        <div style = 'float:right;' v-if = "currentScreen === 2">
          <a href="#/dashboard" >
            <button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
              Done
            </button>
          </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "welcome",
    methods: {
      nextDialog: function(){
        this.currentScreen +=1;
      },
      previousDialog: function(){
        this.currentScreen -=1;
      },
      endDialog: function(){

      }
    },
    data(){
        return {currentScreen: 0, welcomeScreen:{}}
    }
}
</script>

<style >
.top-buffer {
  margin-top: 50px
}
</style>
