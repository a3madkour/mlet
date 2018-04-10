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
        <div class="card" align="left">
          <div class="card-body">
            <p class="card-text-1"><b>Status:</b> {{this.status}} <button v-if='this.status === "On Hold"'>Run Experiment</button></p>
            <p class="card-text-2"><b>Project:</b> <router-link v-bind:to="{name: 'ProjectDetails', params: {id:this.project_id}}">{{this.project}}</router-link></p>
            <p class="card-text-3"><b>Owner:</b> {{this.owner}} </p>
            <p class="card-text-4"><b>Started:</b> {{this.start_time}} </p>
            <p class="card-text-5"><b>Finished:</b> {{this.finished_time}}</p>
          </div>
        </div>
      </div>
      <div class="col-6" v-if='this.status != "Running"'>
        <div class="card" align="left">
            <textarea rows="9" cols="50" placeholder="Parameters..." class="form-control" v-on-clickaway="saveParameters" @click="editingParameters" v-model="parameterFile">
            </textarea>
        </div>
      </div>
      <div class="col-6" v-if='this.status === "Running"'>
        <div class="card" align="left">
            <textarea rows="9" cols="50" placeholder="Parameters..." class="form-control" v-on-clickaway="saveParameters" @click="editingParameters" v-model="parameterFile" readonly>
            </textarea>
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
            <swiper-slide><img src="./loss.jpeg" height=400 width=400></swiper-slide>
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
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import ExperimentsService from '@/services/ExperimentsService'
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
      project: '',
      owner: '',
      start_time: null,
      finished_time: null,
      editting_notes: false,
      oldNotes: '',
      notes: '',
      parameterFile: '',
      oldParameter: '',
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
    editingNotes: function() {
      this.editing_notes = true;
      this.oldNotes = this.notes;
    },
    editingParameters: function() {
      this.editing_parameters = true;
      this.oldParameter = this.parameterFile;
    },
    async getExperiment(){
      const response = await ExperimentsService.getExperiment({
          id: this.$route.params.id
      })
      this.name = response.data.name;
      this.status = response.data.status;
      this.owner = response.data.owner;
      this.project = response.data.project;
      this.project_id = response.data.project_id;
      this.start_time = response.data.start_time;
      this.parameterFile = response.data.parameterFile;
      this.notes = response.data.notes;
      this.oldNotes = this.notes;
      this.oldParameter = this.parameterFile;
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
        if(this.oldParameter !== this.parameterFile){
          this.$notify({group: 'experiment-saved', type:'success', title: 'Experiment parameters have been saved!'});
          await ExperimentsService.updateExperiment({
            id:this.$route.params.id,
            parameterFile:this.parameterFile
          })
        }
      }
    },
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
</style>
