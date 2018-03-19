<template>
<div class="py-3 project-details container-fluid">
  <div class="row">
    <div class="col-1">
      <a class="back" href="#/experiments" title="Back">
        <icon name="caret-left" scale="5.0"></icon>
      </a>
    </div>
    <div class="col">
      <h1 class="float-left">my_first_exp</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-6">
      <div class="card" align="left">
        <div class="card-body">
          <p class="card-text-1"><b>Status:</b> Complete</p>
          <p class="card-text-2"><b>Project:</b> <a href="#/projects/details">Project #1</a></p>
          <p class="card-text-3"><b>Owner:</b> User #1</p>
          <p class="card-text-4"><b>Started:</b> February 15, 2018 14:32:11</p>
          <p class="card-text-5"><b>Finished:</b> February 15, 2018 16:22:45</p>
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="card" align="left">
        <div class="card-body">
          <p class="card-text-1"><b>batch_size:</b> 128</p>
          <p class="card-text-2"><b>epochs:</b> 100</p>
          <p class="card-text-3"><b>learning_rate:</b> 0.01</p>
          <p class="card-text-4"><b>model:</b> CNN_v1</p>
          <p class="card-text-5"><b>optimizer:</b> SGD</p>
        </div>
      </div>
    </div>
  </div>
  <div class="row top-buffer">
    <div class="col-6">
      <textarea rows="20" cols="50" type="experimentNotes" placeholder="Experiment notes..." class="form-control" id="experimentNotes" v-on-clickaway="saveNotes" @click="editingNotes">
      </textarea>
    </div>
    <div class="col-6">
      <md-card>
        <md-card-media>
          <swiper :options="swiperOption">
            <swiper-slide><img src="./placeholder.png" height=200 width=200></swiper-slide>
            <swiper-slide><img src="./placeholder.png" height=200 width=200></swiper-slide>
            <swiper-slide><img src="./placeholder.png" height=200 width=200></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </md-card-media>
      </md-card>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import Icon from 'vue-awesome/components/Icon'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mixin as clickaway } from 'vue-clickaway';

export default {
  mixins: [ clickaway ],
  components: {Icon, swiper, swiperSlide},
  data: function () {
    return {
      editting_notes: false,
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
    EventBus.$emit('activate_element', 2);
  },
  methods: {
    editingNotes: function() {
      this.editing_notes = true;
    },
    saveNotes: function() {
      if (this.editing_notes) {
        this.editing_notes = false;
        this.$notify({group: 'experiment-saved', type:'success', title: 'Experiment notes have been saved!'});
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
  height: 320px; 
  width: 300px!important;
  padding: 50px!important;
}
</style>
