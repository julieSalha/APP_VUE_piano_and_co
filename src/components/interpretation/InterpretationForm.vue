<template>
    <div class="modal block-modal-interpretation" id="interpretation-modal" @click="closeModal">
        <div class="modal-content block-modal-interpretation__content">
            <span class="modal-close block-modal-interpretation__close" @click="close">
              <img src="../../assets/arrow.svg" alt="arrow close">
            </span>
            <form id="block-modal-interpretation__form" @submit.prevent="postTrack">
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
                  <label for="interpretationTrack">Select track to upload*</label>
                  <input type="file" @change="onTrackChange($event)" name="interpretationTrack" id="interpretationTrack" accept=".mp3" required>
                  <p><span id='track-informations' hidden>Please enter a track.</span></p>
                </div>
                <div v-else class="interpretationTrack__display">
                  <label for="interpretationTrack">Track uploaded: {{trackName}} </label>
                  <button class="button btn-third" @click="removeTrack">Remove track</button>
                </div>
                <div v-if="!cover">
                  <label for="interpretationCover">Select cover to upload*</label>
                  <input type="file" @change="onFileChange" name="interpretationCover" id="interpretationCover" accept=".png, .jpg, .jpeg" required>
                  <p><span id='cover-informations' hidden>Please enter a cover.</span></p>
                </div>
                <div v-else class="interpretationCover__display">
                  <p>Cover uploaded:</p>
                  <img :src="cover"/>
                  <button class="button btn-third" @click="removeImage">Remove image</button>
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
      title: '',
      artist: '',
      cover: '',
      track: '',
      trackName: '',
      duration:''
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
      this.trackName = e.target.files[0].name;

      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createAudio(files[0]);
    },
    createAudio(file) {
      this.track = new Audio();
      const reader = new FileReader();

      reader.onload = (e) => {
        this.track = e.target.result;

      };
      reader.readAsDataURL(file);
    },
    removeTrack: function () {
      this.track = '';
    },
    resizeImage(base64Str, maxWidth = 400, maxHeight = 400) {
      return new Promise((resolve) => {
      const img = new Image()
      img.src = base64Str
      img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = maxWidth
          const MAX_HEIGHT = maxHeight
          let width = img.width
          let height = img.height

          if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
          }
          } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
          }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          resolve(this.cover = canvas.toDataURL());
        }
      })
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      //this.cover = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        this.cover = this.resizeImage(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.cover = '';
    },
    postTrack: function() {
      this.$store.dispatch('postTrack', { 
        title : this.title, 
        artist_name : this.artist,
        track: this.track,
        cover: this.cover,
        duration: this.duration,
        user: this.user
      })
      document.querySelector('#interpretation-modal').classList.remove('active');
        this.title = '';
        this.artist = '';
        this.track = '';
        this.cover = '';
        this.duration = '';
    }
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

input:valid {
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

@media screen and (min-width:768px) {
  .modal-content {
    max-width: 450px;

  }
}
</style>
