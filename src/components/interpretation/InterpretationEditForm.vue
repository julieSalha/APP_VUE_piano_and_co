<template>
    <div class="modal block-modal-interpretation-edit" :id="interpretation._id" @click="closeModal($event)">
        <div class="modal-content block-modal-interpretation__content">
            <span class="modal-close block-modal-interpretation__close" @click="close($event)">
              <svg class="icon-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 496" width="30" fill="#000000"><path d="M248 0C111.033 0 0 111.033 0 248s111.033 248 248 248 248-111.033 248-248C495.841 111.099 384.901.159 248 0zm0 480C119.87 480 16 376.13 16 248S119.87 16 248 16s232 103.87 232 232c-.141 128.072-103.928 231.859-232 232z"/><path d="M361.136 134.864a8 8 0 00-11.312 0L248 236.688 146.176 134.864a8 8 0 10-11.312 11.312L236.688 248 134.864 349.824a8 8 0 00-.196 11.312 8 8 0 0011.508 0L248 259.312l101.824 101.824a8 8 0 0011.312-.196 8 8 0 000-11.116L259.312 248l101.824-101.824a8 8 0 000-11.312z"/></svg>
            </span>
            <form id="block-modal-interpretation__form" @submit.prevent="editTrack($event)">
                <h2 class="block-modal-interpretation__title">Edit interpretation</h2>
                <label for="editTitle">Title*</label>
                <input id="editTitle" type="text" name="editTitle" required minlength="2" maxlength="20" placeholder="Title interpretation" v-model="interpretation.title" >
                <div>
                    <label for="editArtist">Artist name*</label>
                    <input id="editArtist" type="text" name="editArtist" required minlength="2" maxlength="25" placeholder="Artist interpretation" v-model="interpretation.artist_name" >
                </div>
                <div v-if="!interpretation.track">
                  <label for="editTrack">Select track to upload*</label>
                  <input type="file" @change="onTrackChange($event)" name="editTrack" id="editTrack" accept=".mp3" required>
                </div>
                <div v-else class="interpretationTrack__display">
                  <label for="editTrack">Track uploaded:  </label>
                  <audio controls :src="interpretation.track"></audio>
                  <button class="button btn-third" @click="removeTrack">Remove track</button>
                </div>
                <div v-if="!interpretation.cover">
                  <label for="editCover">Select cover to upload*</label>
                  <input type="file" @change="onFileChange" name="editCover" id="editCover" accept=".png, .jpg, .jpeg" required>
                </div>
                <div v-else class="interpretationCover__display">
                  <p>Cover uploaded:</p>
                  <img :src="interpretation.cover"/>
                  <button class="button btn-third" @click="removeImage">Remove image</button>
                </div>
                <div>
                    <label for="editDuration">Duration:*</label>
                    <input id="editDuration" name="editDuration" placeholder="Enter duration" minlength="5" maxlength="10" required v-model="interpretation.duration" > 
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
      duration:'',
      trackChange: false,
      coverChange: false
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
    },
    onTrackChange(e) {
      this.trackChange = true;
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
    resizeImage(base64Str, maxWidth = 300, maxHeight = 300) {
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
      this.coverChange = true;
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
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
      let dataTuUpdate;
      if (this.trackChange) {
        console.log('this.trackChange');
        dataTuUpdate = {
          id: this.id,
          payload: {
            title : this.interpretation.title, 
            artist_name : this.interpretation.artist_name,
            track: this.track,
            cover: this.$store.state.interpretationToEdit.data.cover,
            duration: this.interpretation.duration,
            user: this.user 
          }
        }
      } else if (this.coverChange) {
        console.log('this.coverChange');
        dataTuUpdate = {
          id: this.id,
          payload: {
            title : this.interpretation.title, 
            artist_name : this.interpretation.artist_name,
            track: this.$store.state.interpretationToEdit.data.track,
            cover: this.cover,
            duration: this.interpretation.duration,
            user: this.user 
          }
        }
      } else if (this.trackChange && this.coverChange) {
        console.log('this.trackChange && this.coverChange');
        dataTuUpdate = {
          id: this.id,
          payload: {
            title : this.interpretation.title, 
            artist_name : this.interpretation.artist_name,
            track: this.track,
            cover: this.cover,
            duration: this.interpretation.duration,
            user: this.user 
          }
        }
      } else {
        console.log('else');
        dataTuUpdate = {
          id: this.id,
          payload: {
            title : this.interpretation.title, 
            artist_name : this.interpretation.artist_name,
            track: this.$store.state.interpretationToEdit.data.track,
            cover: this.$store.state.interpretationToEdit.data.cover,
            duration: this.interpretation.duration,
            user: this.user 
          }
        }
      }



      //this.trackChange ? dataTuUpdate.payload.track = this.track : this.$store.state.interpretationToEdit.data.track;
      //this.coverChange ? dataTuUpdate.payload.cover = this.cover : this.$store.state.interpretationToEdit.data.cover;

      console.log('dataTuUpdate',dataTuUpdate)
      this.$store.dispatch('editTrack', dataTuUpdate);
      // Close
      event.target.parentNode.parentNode.classList.remove('active');
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


  .icon-arrow {
    fill:black;
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

  p {
    margin-bottom: 10px;
  }
}

input:valid:not(input[type="range"]) {
  border: 1px solid #404642;
}

input:invalid {
  border: 1px solid red;
}

label[for="editTrack"] {
  display: block;
}

@media screen and (min-width:768px) {
  .modal-content {
    max-width: 450px;
  }
}
</style>
