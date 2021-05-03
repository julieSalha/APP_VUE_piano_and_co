<template>
    <div :interpretation="interpretation" class="modal block-modal-interpretation-edit" :id="interpretation._id" @click="closeModal($event)">
        <div class="modal-content block-modal-interpretation__content">
            <span class="modal-close block-modal-interpretation__close" @click="close($event)">
              <img src="../../assets/arrow.svg" alt="arrow close">
            </span>
            <form id="block-modal-interpretation__form" @submit.prevent="editTrack($event)">
                <h2 class="block-modal-interpretation__title">Edit interpretation</h2>
                <label for="editTitle">Title*</label>
                <input id="editTitle" type="text" name="editTitle" required minlength="2" maxlength="20" placeholder="Title interpretation" v-model="title" @keyup="checkInput($event)">
                <p><span id='title-informations-edit' hidden>Please enter a title between 2 and 20 characters.</span></p>
                <div>
                    <label for="editArtist">Artist name*</label>
                    <input id="editArtist" type="text" name="editArtist" required minlength="2" maxlength="25" placeholder="Artist interpretation" v-model="artist" @keyup="checkInput($event)">
                    <p><span id='artist-informations-edit' hidden>Please enter an artist between 2 and 20 characters.</span></p>
                </div>
                <div v-if="!interpretation.track">
                  <label for="editTrack">Select track to upload*</label>
                  <input type="file" @change="onTrackChange($event)" name="editTrack" id="editTrack" accept=".mp3" required>
                  <p><span id='track-informations-edit' hidden>Please enter a track.</span></p>
                </div>
                <div v-else class="interpretationTrack__display">
                  <label for="editTrack">Track uploaded:  </label>
                  <audio controls :src="interpretation.track"></audio>
                  <button class="button btn-third" @click="removeTrack">Remove track</button>
                </div>
                <div v-if="!interpretation.cover">
                  <label for="editCover">Select cover to upload*</label>
                  <input type="file" @change="onFileChange" name="editCover" id="editCover" accept=".png, .jpg, .jpeg" required>
                  <p><span id='cover-informations-edit' hidden>Please enter a cover.</span></p>
                </div>
                <div v-else class="interpretationCover__display">
                  <p>Cover uploaded:</p>
                  <img :src="interpretation.cover"/>
                  <button class="button btn-third" @click="removeImage">Remove image</button>
                </div>
                <div>
                    <label for="editDuration">Duration:*</label>
                    <input id="editDuration" name="editDuration" placeholder="Enter duration" minlength="5" maxlength="10" required v-model="duration" @keyup="checkInput($event)"> 
                    <p><span id='duration-informations-edit' hidden>Please enter a valid duration. (5-10 characters)</span></p>
                </div>
                <button class="button btn-second form-submit" type="submit" >Save</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "InterpretationEditForm",
  props: {
    interpretation: Object
  },
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
    ...mapState(['user', 'interpretationToEdit'])
  },
  methods: {
    closeModal: function(event) {
      event.target.classList.remove('active');
    },
    close: function(event) {
      const allFormsEdit = document.querySelectorAll('.block-modal-interpretation-edit');
      for (const form of allFormsEdit) {
        if (form.classList.contains('active')) {
            form.classList.remove('active');
        }
      }
      //document.querySelector('#interpretation-modal').classList.remove('active');
      //event.target.closest('block-modal-interpretation-edit').classList.remove('active');
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
      const reader = new FileReader();

      reader.onload = (e) => {
        this.track = e.target.result;

      };
      console.log('this.track', this.track);
      reader.readAsDataURL(file);
    },
    removeTrack: function () {
      this.interpretation.track = '';
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
      console.log('this.cover',this.cover);
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.interpretation.cover = '';
    },
    editTrack: function(event) {
   this.id = event.target.closest('.block-modal-interpretation-edit').getAttribute('id');
      console.log('id local',this.id);

      const dataTuUpdate = {
        id: this.id,
        payload: {
          title : this.title, 
          artist_name : this.artist,
          track: this.$store.state.interpretationToEdit.data.track,
          cover: this.$store.state.interpretationToEdit.data.cover,
          duration: this.duration,
          user: this.user 
        }
      }
      this.$store.dispatch('editTrack', dataTuUpdate)
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
    padding: 60px 20px 20px;
    max-width: 560px;
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
    cursor: pointer;
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

@media screen and (min-width:768px) {
  .modal-content {
    max-width: 450px;
  }
}
</style>
