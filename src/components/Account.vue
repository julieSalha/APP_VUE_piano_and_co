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
                            <svg class="icon-play" xmlns="http://www.w3.org/2000/svg" width="30.051" height="30.047"><path data-name="Tracé 58" d="M19.982 14.436l-6.24-4.538a.752.752 0 00-1.2.607v9.069a.75.75 0 00.411.671.758.758 0 00.342.081.748.748 0 00.442-.146l6.24-4.532a.746.746 0 000-1.214z"/><path data-name="Tracé 59" d="M15.026-.002a15.023 15.023 0 1015.025 15.028A15.024 15.024 0 0015.026-.002zm0 27.54A12.516 12.516 0 1127.54 15.026 12.514 12.514 0 0115.026 27.54z"/></svg>
                            <svg class="icon-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.019 74.98C388.667 26.629 324.38 0 256 0 187.619 0 123.332 26.629 74.98 74.98 26.629 123.332 0 187.619 0 256s26.629 132.668 74.98 181.02C123.332 485.371 187.619 512 256 512c68.38 0 132.667-26.629 181.019-74.98C485.371 388.668 512 324.38 512 256s-26.629-132.668-74.981-181.02zM256 482C131.383 482 30 380.617 30 256S131.383 30 256 30s226 101.383 226 226-101.383 226-226 226z"/><path d="M304.199 137.723c-8.284 0-15 6.716-15 15V359.28c0 8.284 6.716 15 15 15s15-6.716 15-15V152.723c0-8.284-6.716-15-15-15zM207.799 137.723c-8.284 0-15 6.716-15 15V359.28c0 8.284 6.716 15 15 15s15-6.716 15-15V152.723c0-8.284-6.716-15-15-15z"/></svg>
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
                  <button class="button btn-primary" @click="updateThisTrack(track.id)">Edit</button>
                    <InterpretationEditForm 
                      :interpretation="track"
                    />
                  <button class="button btn-third" @click="deleteThisTrack(track.id)">Delete</button>
                </div>
              </li>
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
      if ( Amplitude.getActiveIndex() === index ) {
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
      console.log('id', id);
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

.icon-play, .icon-pause {
  width: 30px;
  height: 30px;
}

.dark-mode {
  .account-content__identification, .account-content__informations span {
    color: #FFFFFF;
  }

  .icon-play, .icon-pause {
    fill: #FFFFFF;
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
      .icon-play {
        display: block;
      }

      .icon-pause {
        display: none;
      }

      &.amplitude-playing {
        .icon-play {
          display: none;
        }

        .icon-pause {
          display: block;
        }
      }
      &.amplitude-paused {
        .icon-play {
          display: block;
        }

        .icon-pause {
          display: none;
        }
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
      cursor: pointer;
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