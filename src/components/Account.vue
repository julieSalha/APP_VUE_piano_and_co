<template>
    <div v-if="user" class="account-container">
      <div class="account-content-profil">
        <button class="button btn-third">Edit profile</button>
        <h2>My informations</h2>
        <article>
            <div class="account-content__photo" >
                <img alt="Profile picture" :src="user.profile_picture" >
            </div>
            <div class="account-content__identification" >Given name / Name: {{ user.givenName }}</div>
            <div class="account-content__gender" >Gender: {{ user.gender }}</div>
            <div class="account-content__birth">Birthday: {{ new Date(user.date_of_birth).toUTCString().split(' ').slice(1,4).join(' ')  }}</div>
            <div class="account-content__adress" >Adress: {{ user.adress }}</div>
            <div class="account-content__biography" >Biography: {{ user.biography }}</div>
            <div class="account-content__email" >Email: {{ user.email }}</div>
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
              <li v-for="(track) in myTracks" :key="track.id">
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
        <div class="account-playlists">
          <h2>My playlists</h2>
          <button class="button btn-third">New playlist</button>
        </div>
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
    ...mapState(['user', 'interpretations', 'myTracks'])
  },
  methods: {
    oneInterpretation(id) {
      this.$store.dispatch('fetchOneInterpretation', id)
    },
    allInterpretations() {
      //console.log('allInterpretations', this.state.myTracks);
      this.$store.dispatch('fetchAllInterpretations');
    },
    checkDataUser() {
      this.$store.dispatch('checkUser');
    },
    newInterpretation: function() {
      document.querySelector('#interpretation-modal').classList.add('active');
    },
    deleteThisTrack(id) {
      this.$store.dispatch('deleteTrack', id);
    },
    updateThisTrack(id) {
      console.log('id update', id);
      this.oneInterpretation(id);
      const allFormsEdit = Array.from(document.querySelectorAll('.block-modal-interpretation-edit'));
      const formEdit = allFormsEdit.find(form => form.getAttribute('id') === id );
      formEdit.classList.add('active');
    }
  ,
  },
  async mounted() {
    await this.allInterpretations();
    await this.checkDataUser();
  }
};
</script>

<style lang="scss">
.account-content-profil, .account-content__music {
  margin-bottom: 10px;

  text-align: center;
}

.account-content__photo {
  img {
    border-radius: 50%;
    border: 2px solid #42E4CE;
  }
}

.list-tracks {
  .button {
    display: inline-block;

    margin: 5px 10px !important;
  }

  li {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-end;

    margin-bottom: 10px;
    
  }
}

@media screen and (min-width:768px) {
  .account-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;

    .button {
      margin: 0;
    }
  }

  .account-content-profil, .account-content__music {
    width: 50%;
    min-width: 50%;

    text-align: left;
  }

}
</style>