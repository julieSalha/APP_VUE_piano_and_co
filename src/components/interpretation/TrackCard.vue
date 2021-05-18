<template>
    <div class="interpretation-item">
      <!-- <div class="interpretation-item__description">
        <span class="logo-play" @click="displayPlayer($event)"><svg xmlns="http://www.w3.org/2000/svg" width="30.051" height="30.047"><title>play</title><path data-name="Tracé 58" d="M19.982 14.436l-6.24-4.538a.752.752 0 00-1.2.607v9.069a.75.75 0 00.411.671.758.758 0 00.342.081.748.748 0 00.442-.146l6.24-4.532a.746.746 0 000-1.214z"/><path data-name="Tracé 59" d="M15.026-.002a15.023 15.023 0 1015.025 15.028A15.024 15.024 0 0015.026-.002zm0 27.54A12.516 12.516 0 1127.54 15.026 12.514 12.514 0 0115.026 27.54z"/></svg></span>
        <span class="interpretation-item__title">{{ track[0].title }}</span>
        <span class="interpretation-item__artist">{{ track[0].artist_name }}</span>
      </div>
      <div class="interpretation-item__content">
        <div class="interpretation-item__content__top">
          <div class="interpretation-visual__container">
            <div class="interpretation-visual__photo aspect-ratio-box-track" >
                <img class="interpretation-visual aspect-ratio-box-inside-track" :src="track[0].cover" :alt="track[0].title">
            </div>
          </div>
          <figure class="interpretation-item__audio">
            <audio
                controls
                :src="track[0].track">
                Your browser does not support the
                <code>audio</code> element.
            </audio>
          </figure>
        </div>
        <div class="interpretation-item__content__bottom">
          <div class="like-container">
          <div v-if="track[2].length > 0">
          <template v-if="checkLikes(track[2])">
              <button class="like-button button active" @click="toggleLike($event, track[0]._id, track[2])">
              <span class="like-button_like">
                  <img src="../../assets/like.svg" alt="like track">
              </span>
              <span class="like-button_liked">
                  <img src="../../assets/liked.svg" alt="liked track">
              </span>
              </button>
          </template>
          <template v-else>
              <button class="like-button button" @click="toggleLike($event, track[0]._id, track[2])">
              <span class="like-button_like">
                  <img src="../../assets/like.svg" alt="like track">
              </span>
              <span class="like-button_liked">
                  <img src="../../assets/liked.svg" alt="liked track">
              </span>
              </button>
          </template>
          </div>
          <div v-else>
          <button class="like-button button" @click="toggleLike($event, track[0]._id, track[2])">
              <span class="like-button_like">
              <img src="../../assets/like.svg" alt="like track">
              </span>
              <span class="like-button_liked">
              <img src="../../assets/liked.svg" alt="liked track">
              </span>
          </button>
          </div>
          <p v-if="track[2].length > 2">Liked by {{ track[2].length }} people</p> 
          </div>
          <div class="comment-space">
            <div class="comment-space-container">
              <ul>
                <li class="comment-track" v-for="track in track[1]" :key="track._id" :id="track._id">
                  <div>{{ track.content }}</div> 
                  <div class="comment-track-actions">
                      <button class="delete-button button" @click="deleteComment($event, track._id)">
                        <span>
                            <img class="trash-clear" src="../../assets/trash.svg" alt="delete comment">
                        </span>
                        <span>
                            <img class="trash-dark" src="../../assets/trash-dark.svg" alt="delete comment">                      
                        </span>
                      </button>
                      <button class="like-button like-button-comment button" @click="toggleLike($event, track._id)">
                        <span class="like-button_like">
                            <svg class="icon-like-two" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 304c0-12.821-5.099-24.768-13.888-33.579 9.963-10.901 15.04-25.515 13.653-40.725-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819 16.981-56.149 16.981-85.333 0-46.272-39.317-85.333-64-85.333-22.144 0-37.995 12.48-38.656 12.992A10.672 10.672 0 00234.666 32v72.341L173.205 237.44l-2.539 1.301v-4.075c0-5.888-4.779-10.667-10.667-10.667H53.333C23.915 224 0 247.915 0 277.333V448c0 29.419 23.915 53.333 53.333 53.333h64c23.061 0 42.773-14.72 50.197-35.264C185.28 475.2 209.173 480 224 480h195.819c23.232 0 43.563-15.659 48.341-37.248 2.453-11.136 1.024-22.336-3.84-32.064 15.744-7.915 26.347-24.192 26.347-42.688 0-7.552-1.728-14.784-4.992-21.312C501.419 338.752 512 322.496 512 304zm-44.992 26.325a10.719 10.719 0 00-8.917 7.232 10.688 10.688 0 002.816 11.136c5.419 5.099 8.427 11.968 8.427 19.307 0 13.461-10.176 24.768-23.637 26.325a10.719 10.719 0 00-8.917 7.232 10.688 10.688 0 002.816 11.136c7.019 6.613 9.835 15.893 7.723 25.451-2.624 11.904-14.187 20.523-27.499 20.523H224c-17.323 0-46.379-8.128-56.448-18.219-3.051-3.029-7.659-3.925-11.627-2.304a10.667 10.667 0 00-6.592 9.856c0 17.643-14.357 32-32 32h-64c-17.643 0-32-14.357-32-32V277.333c0-17.643 14.357-32 32-32h96V256c0 3.691 1.92 7.125 5.077 9.088a10.902 10.902 0 0010.368.448l21.333-10.667a10.65 10.65 0 004.907-5.056l64-138.667c.64-1.408.981-2.944.981-4.48V37.781c4.438-2.453 12.14-5.781 21.334-5.781C289.024 32 320 61.056 320 96c0 37.547-20.437 91.669-20.629 92.203a10.739 10.739 0 001.173 9.856 10.728 10.728 0 008.789 4.608h146.795c17.792 0 32.896 12.736 34.389 28.992 1.131 12.16-4.715 23.723-15.189 30.187-3.264 2.005-5.205 5.632-5.056 9.493s2.368 7.317 5.781 9.088c9.024 4.587 14.613 13.632 14.613 23.573.001 13.461-10.175 24.768-23.658 26.325z"/><path d="M160 245.333c-5.888 0-10.667 4.779-10.667 10.667v192c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667V256c0-5.888-4.779-10.667-10.667-10.667z"/></svg>
                        </span>
                        <span class="like-button_liked">
                            <svg class="icon-liked-two"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M53.333 224C23.936 224 0 247.936 0 277.333V448c0 29.397 23.936 53.333 53.333 53.333h64c12.011 0 23.061-4.053 32-10.795V224h-96zM512 304c0-12.821-5.077-24.768-13.888-33.579 9.963-10.901 15.04-25.515 13.653-40.725-2.496-27.115-26.923-48.363-55.637-48.363H324.352c6.528-19.819 16.981-56.149 16.981-85.333 0-46.272-39.317-85.333-64-85.333-22.165 0-37.995 12.48-38.677 12.992A10.72 10.72 0 00234.667 32v72.341l-61.44 133.099-2.56 1.301v228.651C188.032 475.584 210.005 480 224 480h195.819c23.232 0 43.563-15.659 48.341-37.269 2.453-11.115 1.024-22.315-3.861-32.043 15.765-7.936 26.368-24.171 26.368-42.688 0-7.552-1.728-14.784-5.013-21.333C501.419 338.731 512 322.496 512 304z"/></svg>
                        </span>
                      </button>
                  </div>
                </li> 
              </ul>
            </div>
            <label :for="'newcomment' + track[0]._id">Press enter to post comment</label>
            <input :id="'newcomment' + track[0]._id" @keyup.prevent.enter="postComment($event, track[0]._id)" placeholder="Add your comment..." form="comment-form">
          </div>  
        </div>
      </div> -->
      <div class="player">
        <img :src="track[0].cover" class="album-art"/>
        <div class="meta-container">
          <div class="song-title">{{ track[0].title }}</div>
          <div class="song-artist">{{ track[0].artist_name }}</div>

          <div class="time-container">
            <div class="current-time">
              <span class="amplitude-current-minutes" data-amplitude-song-index="0"></span>:<span class="amplitude-current-seconds" data-amplitude-song-index="0"></span>
            </div>

            <div class="duration">
              <span class="amplitude-duration-minutes" data-amplitude-song-index="0">3</span>:<span class="amplitude-duration-seconds" data-amplitude-song-index="0">30</span>
            </div>
          </div>
          <progress class="amplitude-song-played-progress" data-amplitude-song-index="0" @click="progressBar($event)"></progress>
          <div class="control-container">
            <div class="amplitude-prev">

            </div>
            <div class="amplitude-play-pause" data-amplitude-song-index="0">

            </div>
            <div class="amplitude-next">

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Amplitude from 'amplitudejs'

export default {
    name: 'TrackCard',
    props: {
        track: Array,
        index: Number
    },
    data() {
        return {

        }
    },
    computed: {
      ...mapState(['interpretations', 'user', 'comments'])
    },
    methods: {
      displayPlayer(event) {
        event.target.parentNode.parentNode.classList.toggle('active');
      },
      UserAccount() {
        this.$store.dispatch('checkUser');
    },
      checkLikes(data) {
      const authors = [];
      data.forEach(like => {
        authors.push(like.author);
      });
      return authors.includes(this.user._id);
      },
      toggleLike(event, id) {
        const data = {
          subjectOf: id,
          author: this.user
        }
      
        if (!event.target.parentNode.classList.contains('active')) {
          this.$store.dispatch('createLike', data);
          // //console.log('this.track length', this.track.length)
          // let actualLength = this.track.length;
          //this.track[2].splice(indexOf(this.track[2]), 1);
          //console.log('this.index', this.index);

        } else {
          this.$store.dispatch('deleteLike', id);
          //this.track.splice(this.track.length - 1);
        }

        event.target.parentNode.classList.toggle('active');
      },
      allComments() {
        this.$store.dispatch('fetchAllComments');
      },
      postComment(event, id) {
        const data = {
          id: id,
          content: event.target.value,
          subjectOf: id,
          author: this.user
        }
        this.$store.dispatch('createComment', data);
      },
      deleteComment(event, id) {
        event.target.closest('.comment-track').classList.add('hidden');
        this.$store.dispatch('deleteComment', id);
      },
      progressBar(e) {
        if ( Amplitude.getActiveIndex() === 0 ){
          var offset = e.target.getBoundingClientRect();
          var x = e.pageX - offset.left;

          Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
        }
      }
    },
    async mounted() {
      await this.UserAccount();
      await this.allComments();
  }   
}

</script>

<style lang="scss">
.interpretation-item {

  &.active {
    .interpretation-item__content {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      & .interpretation-item__content__top {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
    }

    .logo-play svg {
      transform: rotate(90deg);
    }
  }
}

  .interpretation-item__content__top,
  .interpretation-item__content__bottom {
    width: 100%;
    min-width: 100%;
  }

.interpretation-item__description {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  margin-bottom: 10px;
}

.interpretation-item__title,
.interpretation-item__artist {
  margin-right: 10px;
}

.interpretation-item__audio {
  width: 100%;
  min-width: 100%;
}

.logo-play {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;

  svg {
    pointer-events: none;
    transition: .3s ease;
  }
}

.interpretation-item__content {
  display: none;

  margin-bottom: 10px;
}

.interpretation-visual__container {
  width: 50%;
  min-width: 50%;
  margin: auto auto 10px;
}

.dark-mode {
  .logo-play {
    fill: #FFFFFF;
  }
}

.like-container {
  img {
    pointer-events: none;
  }
}

.like-button.button {
  margin: 0;
}

.comment-track {
  text-align: left;
  padding-left: 13px;
}

.comment-track-actions {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;

  img, svg {
    width: 20px;
    height: 20px;
  }
}


.aspect-ratio-box-track {
  height: 0;
  overflow: hidden;
  padding-top: 100%;
  position: relative;
}

.aspect-ratio-box-inside-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.icon-trash,
.icon-like-two,
.icon-liked-two {
  fill: black;
}

.trash-dark {
  display: none;
}


.like-button {
  span {
    display: inline-block;
    width: 30px;
  }

  .like-button_liked {
    display: none;
  }

  &.active {
    .like-button_liked {
      display: block;
    }

    .like-button_like {
      display: none;
    }
  }

  img {
    max-width: 28px;
  }
}

.like-container {
  display: flex;
  align-items: center;
}

.delete-button {
  &.button {
    margin: 0;
  }
}

.comment-space {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  ul {
    width: 100%;
    min-width: 100%;
    margin-bottom: 10px;
  }
}

.comment-item {
  text-align: left;
  padding-left: 20px;
}

.comment-item-actions {
  display: flex;
  flex-wrap: nowrap;

  .button {
    padding: 0;
    margin: 0;
    width: 20px;
    height: 20px;
  }
}

.interpretation-visual {
  width: 100%;
  border-radius: 50%;
  border: 2px solid;

  ul, input {
    width: 100%;
    min-width: 100%;
  }
}

figcaption {
  margin-bottom: 20px;
}

@media screen and (min-width:768px) {
  .interpretation-item__content {
    flex-direction: row;
  }

  .interpretation-item__content__top {
    width: 50%;
    min-width: 50%;
  }

  .interpretation-item__content__bottom {
    width: 40%;
    min-width: 40%;
  } 

  .interpretation-item.active .interpretation-item__content {
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-end;
  }

  .interpretation-item__content__top,
  .interpretation-item__content__bottom {
    width: 50%;
    min-width: 50%;
  }
}

.comment-space-container {
  max-height: 150px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.like-button-comment {
  svg {
    pointer-events: none;
  }
}

// Custom player
body div#preload {
  display: none; 
}

div.player {
  border: 1px solid #eaeaea;
  margin-bottom: 20px;
  max-width: 750px;
  margin: auto;
  margin-top: 40px; }
  div.player:after {
    content: "";
    display: table;
    clear: both; }
  div.player img.album-art {
    width: 245px;
    height: 245px;
    float: left; }

@media screen and (max-width: 39.9375em) {
  div.player img.album-art {
    width: 100%;
    height: auto; } }

div.meta-container {
  float: left;
  width: calc(100% - 270px);
  padding: 10px; }
  div.meta-container div.song-title {
    text-align: center;
    color: #263238;
    font-size: 30px;
    font-weight: 600;
    font-family: "Open Sans", sans-serif; }
  div.meta-container div.song-artist {
    text-align: center;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: #263238;
    margin-top: 10px; }
  div.meta-container div.time-container {
    font-family: Helvetica;
    font-size: 18px;
    color: #000;
    margin-bottom: 10px; }
    div.meta-container div.time-container:after {
      content: "";
      display: table;
      clear: both; }
    div.meta-container div.time-container div.current-time {
      float: left; }
    div.meta-container div.time-container div.duration {
      float: right; }

  @media screen and (max-width: 39.9375em) {
  div.meta-container {
    width: 100%; } }

  div.control-container {
  text-align: center;
  margin-top: 40px; }
  div.control-container div.amplitude-prev {
    width: 28px;
    height: 24px;
    cursor: pointer;
    background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/multiple-songs/previous.svg");
    display: inline-block;
    vertical-align: middle; }
  div.control-container div.amplitude-play-pause {
    width: 40px;
    height: 44px;
    cursor: pointer;
    display: inline-block;

    background: url(https://521dimensions.com/img/open-source/amplitudejs/examples/multiple-songs/play.svg);

    vertical-align: middle; }
    div.control-container div.amplitude-play-pause.amplitude-paused {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/multiple-songs/play.svg"); }
    div.control-container div.amplitude-play-pause.amplitude-playing {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/multiple-songs/pause.svg"); }
  div.control-container div.amplitude-next {
    width: 28px;
    height: 24px;
    cursor: pointer;
    background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/multiple-songs/next.svg");
    display: inline-block;
    vertical-align: middle; }

  @media screen and (max-width: 39.9375em) {
  div.control-container div.amplitude-prev {
    margin-right: 75px; }
  div.control-container div.amplitude-next {
    margin-left: 75px; } }

  @media screen and (min-width: 40em) and (max-width: 63.9375em) {
  div.control-container div.amplitude-prev {
    margin-right: 40px; }
  div.control-container div.amplitude-next {
    margin-left: 40px; } }

  @media screen and (min-width: 64em) {
  div.control-container div.amplitude-prev {
    margin-right: 75px; }
  div.control-container div.amplitude-next {
    margin-left: 75px; } }
progress.amplitude-song-played-progress:not([value]) {
  background-color: #313252; }

progress.amplitude-song-played-progress {
  background-color: #d7dee3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 5px;
  display: block;
  cursor: pointer;
  border-radius: 3px;
  height: 8px;
  border: none; }


  progress[value]::-webkit-progress-bar {
  background-color: #d7dee3;
  border-radius: 3px; }

progress[value]::-moz-progress-bar {
  background-color: #00a0ff;
  border-radius: 3px; }

progress[value]::-webkit-progress-value {
  background-color: #00a0ff;
  border-radius: 3px; }



  
</style>
