<template>
    <div v-if="user" class="account-container">
      <div class="account-content-profil">
        <h2>My informations</h2>
        <article>
          <div class="account-content__photo__container">
            <div class="account-content__photo aspect-ratio-box-account" >
                <img class="aspect-ratio-box-inside-account" alt="Profile picture" :src="user.profile_picture" >
            </div>
          </div>
          <div class="account-content__identification" >{{ user.givenName }} <span v-if="user.familyName != ''">{{ user.familyName }}</span></div>
          <div class="account-content__informations" >
            <div class="account-content__gender" ><span>Gender: </span> {{ user.gender }}</div>
            <div class="account-content__birth" v-if="user.date_of_birth != ''"><span>Birthday: </span>{{ new Date(user.date_of_birth).toUTCString().split(' ').slice(1,4).join(' ')  }}</div>
            <div class="account-content__adress" v-if="user.adress != ''"><span>Adress: </span>{{ user.adress }}</div>
            <div class="account-content__biography" v-if="user.biography != ''" ><span>Biography: </span>{{ user.biography }}</div>
            <div class="account-content__email" ><span>Email: </span>{{ user.email }}</div>
          </div>
        </article>
      </div>
      <div class="account-content__music">
        <div class="account-interpretations">
          <h2>My interpretations</h2>
          <div>
            <button class="button btn-third" @click="newInterpretation">Add interpretation</button>
            <InterpretationForm />
          </div>
          <div>
            <ul class="list-tracks">
              <li v-for="(track, index) in myStreamings.data" :key="track.id">
                <div>
                  <div class="player">
                    <div class="meta-container">
                      <div class="song-title">{{ track.name }}</div>
                      <div class="song-artist">{{ track.artist }}</div>

                      <div class="player__container">
                        <div class="control-container">
                          <div class="amplitude-play-pause" :data-amplitude-song-index="index">
                          </div>
                        </div>
                        <div class="time-container">
                          <div class="current-time">
                            <span class="amplitude-current-minutes" :data-amplitude-song-index="index"></span>:<span class="amplitude-current-seconds" :data-amplitude-song-index="index"></span>  /
                          </div>
                          
                          <div class="duration">
                            <span class="amplitude-duration-minutes" :data-amplitude-song-index="index"></span>:<span class="amplitude-duration-seconds" :data-amplitude-song-index="index"></span>
                          </div>
                        </div>
                        <progress class="amplitude-song-played-progress" :data-amplitude-song-index="index" @click="clickProgress($event, index)"></progress>

                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button class="button btn-primary" @click="updateThisTrack(track._id)">Edit</button>
                    <InterpretationEditForm 
                      :interpretation="track"
                    />
                  <button class="button btn-third" @click="deleteThisTrack(track._id)">Delete</button>
                </div>
              </li>
              <!-- <li v-for="track in myStreamings.data" :key="track.id">
                <div>
                  <span>{{ track.title }}</span> - <span>{{ track.artist_name }}</span>
                  <figure>
                    <audio
                        controls
                        :src="track.track">
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>
                  </figure>
                </div>
                <div>
                  <button class="button btn-primary" @click="updateThisTrack(track._id)">Edit</button>
                    <InterpretationEditForm 
                      :interpretation="track"
                    />
                  <button class="button btn-third" @click="deleteThisTrack(track._id)">Delete</button>
                </div>
              </li> -->
            </ul>   
          </div>
        </div>
      </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Amplitude from 'amplitudejs'

import InterpretationForm from './interpretation/InterpretationForm.vue';
import InterpretationEditForm from './interpretation/InterpretationEditForm.vue';

export default {
  name: 'Account',
  components: {
    InterpretationForm,
    InterpretationEditForm
  },
  data(){
    return {
      songsList: Array
    }
  },
  computed: {
    ...mapState(['user', 'myStreamings', 'interpretationToEdit'])
  },
  methods: {
    initPlayers() {
      Amplitude.init({
        songs: this.myStreamings.data
      });
    },
    clickProgress(e, index) {
      if( Amplitude.getActiveIndex() == index ){
        const offset = e.target.getBoundingClientRect();
        const x = e.pageX - offset.left;

        Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( e.target.offsetWidth) ) * 100 );
      }
    },
    oneInterpretation(id) {
      this.$store.dispatch('fetchOneStreaming', id)
    },
    checkDataUser() {
      this.$store.dispatch('checkUser');
    },
    newInterpretation: function() {
      document.querySelector('#interpretation-modal').classList.add('active');
    },
    deleteThisTrack(id) {
      this.$store.dispatch('deleteStreaming', id);
    },
    updateThisTrack(id) {
      this.oneInterpretation(id);
      const allFormsEdit = Array.from(document.querySelectorAll('.block-modal-interpretation-edit'));
      const formEdit = allFormsEdit.find(form => form.getAttribute('id') === id );
      formEdit.classList.add('active');
    }
  ,
  },
  async mounted() {
    await this.checkDataUser();
    await this.initPlayers();
  }
};
</script>

<style lang="scss">
.account-content-profil, .account-content__music {
  margin-bottom: 20px;

  text-align: center;
}

.account-content__photo__container {
  max-width: 200px;
  margin: auto;
}

.aspect-ratio-box-account {
  height: 0;
  overflow: hidden;
  padding-top: 100%;
  position: relative;
}

.aspect-ratio-box-inside-account {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.account-content__photo {
  img {
    width: 100%;
    border-radius: 50%;
    border: 2px solid;
  }
}

.account-content__identification {
  margin-bottom: 20px;
  color: #000000;
  font-size: 2.5rem;
  text-transform: capitalize;
}

.account-content__informations {
    text-align: center;

    span {
      color: #000000;
      font-size: 1.5rem;
  }
}

.dark-mode {
  .account-content__identification, .account-content__informations span {
    color: #FFFFFF;
  }
}

.list-tracks {
  .button:not(.form-submit) {
    display: inline-block;

    margin: 5px 10px !important;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;

    margin: 0 auto 10px;

    div:not(.modal-content):not(.player__container):not(.control-container):not(.time-container) {
      width: 100%;
      min-width: 100%;
    }
    
  }

  span {
    font-size: 1.6rem;
    margin-bottom: 10px;
    display: inline-block;
  }

  div.player {
    border: 0;
    div.control-container div.amplitude-play-pause {
      height: 30px;
      background: none;
      background-image: url('../assets/play.svg');
      background-repeat: no-repeat;

      &.amplitude-playing {
        background-image: url('../assets/pause.svg');
      }
      &.amplitude-paused {
        background-image: url('../assets/play.svg');
      }
    }

    div.meta-container {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }

    .time-container {
      display: flex;
      min-width: 60px;
      width: 60px;
      justify-content: flex-start;
    }
  }

  div.meta-container div.song-title, div.meta-container div.song-artist {
    font-family: 'Roboto', sans-serif;
    text-align: left;
  }

  div.meta-container div.song-title {
    font-size: 2rem;
  }

  div.meta-container div.song-artist {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .player__container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;

    div.control-container {
      margin-top: 0;
    }

    progress.amplitude-song-played-progress {
      margin-bottom: 15px;
    }
  }

  .control-container {
    width: 11%;
    min-width: 11%;

    div.control-container div.amplitude-play-pause {
      height: 30px;
    }
  }

  .time-container {
    width: 22%;
    min-width: 22%;

    margin-right: 60px;
  }

  .amplitude-song-played-progress {
    width: 50%;
    min-width: 50%;
  }
}

@media screen and (min-width:768px) {
  .account-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    .button {
      margin: 0;
    }

    .list-tracks {
      padding-top: 20px;
    }
  }

  .account-content__photo__container {
    margin: 0 auto;
  }

  .account-content__music {
    width: 50%;
    min-width: 50%;

    text-align: left;
  }

  .account-content-profil {
    max-width: 300px;
    width: 100%;
  }

  .account-content__informations {
    text-align: center;
  }

}
</style>