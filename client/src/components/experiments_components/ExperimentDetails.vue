<template>
  <div class="py-3 project-details container-fluid">
    <div class="row">
      <div class="col-1">
        <a class="back" href="javascript:history.back()" title="Back">
          <icon name="caret-left" scale="5.0"></icon>
        </a>
      </div>
      <div class="col">
        <h1 class="float-left">{{this.name}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="card" align="left" style="height:23.6rem; ">
          <div class="card-body">
            <p class="card-text-1"><b>Status:</b> {{this.status}} 
            <button v-if='this.status === "On Hold"' @click="runExperiment">Run Experiment</button>
            <button v-if='this.status === "Running"' @click="stopExperiment">Stop Experiment</button></p>
            <p class="card-text-2"><b>Project:</b> <router-link v-bind:to="{name: 'ProjectDetails', params: {id:this.project_id}}">{{this.project_name}}</router-link></p>
            <p class="card-text-3"><b>Owner:</b> {{this.owner}} </p>
            <p class="card-text-4"><b>Started:</b> {{this.start_time}} </p>
            <p class="card-text-5"><b>Finished:</b> {{this.finished_time}}</p>
            <button  @click="cloneExperiment">Clone Experiment</button></p>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card" align="left" style="max-height:23.6rem;overflow:auto" @click="editingParameters" v-on-clickaway="saveParameters">
          <div class='parameters' v-for="(param, index) in project.parameters" >
            <label>{{param}} ({{project.param_types[index]}}): {{project.param_help_msgs[index]}}</label>
            <input class="form-control" v-model="parameters[index]" v-bind:disabled="is_exp_running">
          </div>
        </div>
      </div>
    </div>
    <div class="row top-buffer">
      <div class="col-6">
        <textarea rows="20" cols="50" type="experimentNotes" placeholder="Experiment notes..." class="form-control" id="experimentNotes" v-on-clickaway="saveNotes" @click="editingNotes" v-model="notes">
        </textarea>
      </div>
      <div class="col-6">
        <md-card>
          <md-card-media>
            <swiper :options="swiperOption">
            <swiper-slide>
              <img v-if='this.status == Finished' src="./loss.jpeg" height=400 width=400>
              <img v-else src="./placeholder.png" height=400 width=400>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </md-card-media>
        </md-card>
      </div>
    </div>
    <div class="row top-buffer">
      <div class="col-12">
        <h3>Terminal Output</h3>
      </div>
      <div class="col-12">
        <div class="card" align="left">
            <textarea rows="25" cols="50" class="form-control" v-model="terminal_out" readonly></textarea>
        </div>
      </div>
    </div>
    <modals-container/>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import ExperimentsService from '@/services/ExperimentsService'
import ProjectsService from '@/services/ProjectsService'
import CloneDialog from './CloneDialog.vue';
import Icon from 'vue-awesome/components/Icon'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  name: 'ExperimentDetails',
  components: {Icon, swiper, swiperSlide},
  data: function () {
    return {
      name: '',
      status: '',
      is_exp_running: false,
      project: null,
      project_name: '',
      owner: '',
      start_time: null,
      finished_time: null,
      editing_notes: false,
      editing_parameters: false,
      oldNotes: '',
      notes: '',
      parameters: [],
      terminal_out: '',
      oldParameter: [],
      swiperOption: {
        spaceBetween: 50,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 3);
  },
  mounted() {
    this.getExperiment();
  },
  methods: {
    cloneExperiment: function(){
      this.$modal.show(CloneDialog,{id:this.$route.params.id}, {name:"clone_experiment", clickToClose: false, height:"auto", width:"50%"});

    },
    editingNotes: function() {
      this.editing_notes = true;
      this.oldNotes = this.notes;
    },
    editingParameters: function() {
      this.editing_parameters = true;
      this.oldParameter = this.parameters.slice();
    },
    async getExperiment(){
      const response = await ExperimentsService.getExperiment({
          id: this.$route.params.id
      });
      this.name = response.data.name;
      this.status = response.data.status;
      this.is_exp_running = (this.status === "Running");
      this.owner = response.data.owner;
      this.project_name = response.data.project;
      this.project_id = response.data.project_id;
      this.start_time = response.data.start_time;
      this.parameters = response.data.parameters;
      this.notes = response.data.notes;
      this.terminal_out = response.data.terminal_out;
      this.oldNotes = this.notes;
      this.oldParameter = this.parameters.slice();

      const project_response = await ProjectsService.getProject({
          id: this.project_id
      });
      this.project = project_response.data;
    },
    runExperiment: function() {
      this.$notify({group: 'experiment-saved', type:'success', title: 'Experiment is running!'});
      this.status = "Running";
      this.is_exp_running = true;
      this.saveStatus();
    },
    stopExperiment: function() {
      this.$notify({group: 'experiment-saved', type:'warning', title: 'Experiment is stopped!'});
      this.status = "On Hold";
      this.is_exp_running = false;
      this.saveStatus();
    },
    async saveStatus() {
      await ExperimentsService.updateExperiment({
        id:this.$route.params.id,
        status:this.status
      })
    },
    async saveNotes() {
      if (this.editing_notes) {
        this.editing_notes = false;
        if(this.oldNotes !== this.notes){
          this.$notify({group: 'experiment-saved', type:'success', title: 'Experiment notes have been saved!'});
          await ExperimentsService.updateExperiment({
            id:this.$route.params.id,
            notes:this.notes
          })
        }
      }
    },
    async saveParameters() {
      if (this.editing_parameters) {
        this.editing_parameters = false;
        if(!this.arraysEqual(this.oldParameter, this.parameters)){
          this.$notify({group: 'experiment-saved', type:'success', title: 'Experiment parameters have been saved!'});
          await ExperimentsService.updateExperiment({
            id:this.$route.params.id,
            parameters:this.parameters
          })
        }
      }
    },
	  arraysEqual: function(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }
  },
}
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.project-details h1 {
  color: black;
  font-size: 64px;
}

.project-details .back {
  display: block;
  text-align: center;
  transition: all 0.3s ease;
  color: black;
  font-size: 36px;
}

.top-buffer {
  margin-top:20px;
}

.swiper-container {
  height: 420px;
  width: 500px!important;
  padding: 40px!important;
}

.parameters {
  padding: 10px 10px;
}
</style>
