<template>
  <div class="posts">
   <label for="repo">Please assign users to the project:</label>
    <div class = "userContainer">
      <div :class = "{active: user.active, ind:true}"  v-for = "user in users" @click="userClick(user)">
        <icon name="user" scale="2.5"></icon>
        <span :class = "{active: user.active, text:true}" >{{user.name}}</span>
      </div>
    </div>
    <div class ="buttons"> 
      <button class="btn btn-info" style="float:right;"> Assign </button>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'posts',
  props : ["userName"],
  components: { Icon
  },
  data () {
    return {
      users: [{name:"Charlie", active:false},{name:"User", active:false}, {name:"Sam", active:false}],
      selected : []
    }  
  },
  methods: {
    userClick(user){
        
        this.users[this.users.indexOf(user)].active = !this.users[this.users.indexOf(user)].active;
        if(this.selected.indexOf(user.name) <0 ){
            this.selected.push(user.name);
        }else{
            this.selected.splice(this.selected.indexOf(user.name));
        }
        console.log(this.selected);
    }
  }
}
</script>
<style>
.userContainer {
  align:center;
  display:flex;
  border-style:solid;
  background-color: #DCDCDC;
  border-color: #555;
  border-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: center;
}
.ind{
  float:left;
  padding-left: 1%;
  padding-right: 1%;
  text-align: center;
  color: black;
  font-size: 20px;
}
.text{
  padding-left: 1%;
  padding-right: 1%;
  text-align: center;
  color: black;
  font-size: 20px;
  display: block;
}
.active{
  color: #4CAF50;
}
</style>
