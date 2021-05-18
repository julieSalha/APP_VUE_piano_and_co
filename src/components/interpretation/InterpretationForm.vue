<template>
    <div class="modal block-modal-interpretation" id="interpretation-modal" @click="closeModal">
        <div class="modal-content block-modal-interpretation__content">
            <span class="modal-close block-modal-interpretation__close" @click="close">
              <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" width="30" fill="#000000"><path d="M248 0C111.033 0 0 111.033 0 248s111.033 248 248 248 248-111.033 248-248C495.841 111.099 384.901.159 248 0zm0 480C119.87 480 16 376.13 16 248S119.87 16 248 16s232 103.87 232 232c-.141 128.072-103.928 231.859-232 232z"/><path d="M361.136 134.864a8 8 0 00-11.312 0L248 236.688 146.176 134.864a8 8 0 10-11.312 11.312L236.688 248 134.864 349.824a8 8 0 00-.196 11.312 8 8 0 0011.508 0L248 259.312l101.824 101.824a8 8 0 0011.312-.196 8 8 0 000-11.116L259.312 248l101.824-101.824a8 8 0 000-11.312z"/></svg>
            </span>
              <form enctype="multipart/form-data" id="block-modal-interpretation__form" @submit.prevent="postStreaming">
                <h2 class="block-modal-interpretation__title">Add new interpretation</h2>
                <label for="interpretationTitle">Title*</label>
                <input id="interpretationTitle" type="text" name="interpretationTitle" required minlength="2" maxlength="20" placeholder="Title interpretation" v-model="title" @keyup="checkInput($event)">
                <p><span id='title-informations' hidden>Please enter a title between 2 and 20 characters.</span></p>
                <div>
                    <label for="interpretationArtist">Artist name*</label>
                    <input id="interpretationArtist" type="text" name="interpretationArtist" required minlength="2" maxlength="25" placeholder="Artist interpretation" v-model="artist" @keyup="checkInput($event)">
                    <p><span id='artist-informations' hidden>Please enter an artist between 2 and 20 characters.</span></p>
                </div>
                <div v-if="!track">
                  <label for="streamingTrack">Select track to upload*</label>
                  <input ref="file" type="file" @change="onTrackChange($event)" name="track" id="streamingTrack" accept=".mp3" required>
                  <p><span id='track-informations' hidden>Please enter a track.</span></p>
                </div>
                <div v-else class="interpretationTrack__display">
                  <label for="interpretationTrack">Track uploaded: {{trackName}} </label>
                  <button class="button btn-third" @click="removeTrack">Remove track</button>
                </div>
                <div v-if="!cover" class="upload-image-container">
                  <label for="streamingCover">Select cover to upload*</label>
                  <div class="dropbox">
                    <input ref="file" id="streamingCover" type="file" name="cover" @change="onCoverChange($event)"
                      accept="image/*" class="input-file" required>
                      <p>
                        Drag your file(s) here to begin<br> or click to browse
                      </p>
                  </div>
                </div>
                <div v-else class="upload-image-container">
                  <label for="streamingCover">Cover uploaded: </label>
                  <div class="dropbox droppox-uploaded">
                    <img :src="coverUrl" alt="cover uploaded">
                  </div>
                  <button class="button btn-third" @click="removeCover">Remove cover</button>
                </div>
                <div>
                    <label for="interpretationDuration">Duration:*</label>
                    <input id="interpretationDuration" name="interpretationDuration" placeholder="Enter duration" minlength="5" maxlength="10" required v-model="duration" @keyup="checkInput($event)"> 
                    <p><span id='duration-informations' hidden>Please enter a valid duration. (5-10 characters)</span></p>
                </div>
                <p>
                  <button class="button btn-second form-submit" type="submit">Create</button>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "InterpretationForm",
  data() {
    return {
      isValidInput: Boolean,
      title: 'rrrrr',
      artist: 'rrrrrr',
      cover: '',
      coverUrl: '',
      track: '',
      trackName: '',
      duration:'rrrr',
      formData: new FormData()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    closeModal: function(event) {
      event.target.classList.remove('active');
    },
    close: function() {
      document.querySelector('#interpretation-modal').classList.remove('active');
    },
    checkInput: function(event) {
      const inputTitle = document.querySelector('#interpretationTitle');
      const infosTitle = document.querySelector('#title-informations');

      const inputArtist = document.querySelector('#interpretationArtist');
      const infosArtist = document.querySelector('#artist-informations');

      const inputDuration = document.querySelector('#interpretationDuration');
      const infosDuration = document.querySelector('#duration-informations');

      let isValidInput;

      function displayInfos(infos) {
          isValidInput ? infos.hidden = true : infos.hidden = false;
        }

      switch (event.target) {
        case inputTitle:
          isValidInput = inputTitle.checkValidity();
          displayInfos(infosTitle);
          break;

        case inputArtist:
          isValidInput = inputArtist.checkValidity();
          displayInfos(infosArtist);
          break;

        case inputDuration:
          isValidInput = inputDuration.checkValidity();
          displayInfos(infosDuration);
          break;
      }
    },
    onTrackChange(e) {
      this.track = e.target.files[0];
      this.trackName = e.target.files[0].name;
      this.formData.append('track', this.track)
    },
    onCoverChange(e) {
      this.cover = e.target.files[0];
      this.formData.append('cover', this.cover)
      this.coverUrl = URL.createObjectURL(e.target.files[0]);
    },
    removeTrack: function () {
      this.track = '';
    },
    removeCover: function () {
      this.cover = '';
    },
    postStreaming: function() {
      this.formData.append('title', this.title);
      this.formData.append('artist_name', this.artist);
      this.formData.append('duration', this.duration);
      this.formData.append('user', this.user);

      this.$store.dispatch('postStream', this.formData);
      document.querySelector('#interpretation-modal').classList.remove('active');
      this.title = '';
      this.artist = '';
      this.track = null;
      this.cover = null;
      this.duration = '';
    }
  },
  mounted() {
    //this.reset();
  }
}
</script>

<style lang="scss">
/* Modals */
.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal.active {
    display: block;
  }

    /* Modals Content */
  .modal-content{
    position: relative;
    margin: 15% auto; 
    padding: 20px;
    width: 100%; 
    background-color: #FFFFFF;
    color: #000000;
    border: 1px solid #888;
  }

  /* The Close Button Modals */
  .modal-close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
  
  #bblock-modal-interpretation__form button {
    background-color: grey;
    border-radius: 20px;
    border: 2px solid;
  }

  .modal-close::after, .delete::after {
    height: 50%;
    width: 2px;
    background-color: black !important;
}

.modal-close::before, .delete::before {
    height: 50%;
    width: 2px;
    background-color: black !important;
}

.interpretationCover__display {
  padding: 10px 0;
  overflow: hidden;
}

input:valid:not(input[type="range"]) {
  border: 1px solid #404642;
}

input:invalid {
  border: 1px solid red;
}

form:not(#chords-suggestion-form) {
  text-align: left;
}

.form-submit {
  max-width: 100px;

  &.button {
    margin: auto !important;
  }
}

.block-modal-interpretation__title {
  text-align: center;
}

// Upload image
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
    overflow: hidden;
    max-height: 230px;
    height: 100%;
  }

  .droppox-uploaded {
    outline: 0;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    cursor: pointer;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }

@media screen and (min-width:768px) {
  .modal-content {
    max-width: 450px;

  }
}
</style>
