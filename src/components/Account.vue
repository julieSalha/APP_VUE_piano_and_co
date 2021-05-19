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
              <li v-for="track in myStreamings.data" :key="track.id">
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
              </li>
            </ul>   
          </div>
        </div>
        <!-- <div class="account-playlists">
          <h2>My playlists</h2>
          <button class="button btn-third">New playlist</button>
        </div> -->
      </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex'

import InterpretationForm from './interpretation/InterpretationForm.vue';
import InterpretationEditForm from './interpretation/InterpretationEditForm.vue';

export default {
  name: 'Account',
  components: {
    InterpretationForm,
    InterpretationEditForm
  },
  computed: {
    ...mapState(['user', 'interpretations', 'myStreamings', 'interpretationToEdit'])
  },
  methods: {
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

    div:not(.modal-content) {
      width: 100%;
      min-width: 100%;
    }
    
  }

  span {
    font-size: 1.6rem;
    margin-bottom: 10px;
    display: inline-block;
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