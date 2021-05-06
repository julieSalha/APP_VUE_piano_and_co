<template>
    <div class="interpretation-item">
      <div class="interpretation-item__description">
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
          <ul>
              <li class="comment-track" v-for="track in track[1]" :key="track._id" :id="track._id">
                <div>{{ track.content }}</div> 
                <div class="comment-track-actions">
                    <button class="delete-button button" @click="deleteComment($event, track._id)">
                    <span>
                        <img class="trash-clear" src="../../assets/trash.svg" alt="delete comment">
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
          <label :for="'newcomment' + track[0]._id">Press enter to post comment</label>
          <input :id="'newcomment' + track[0]._id" @keyup.prevent.enter="postComment($event, track[0]._id)" placeholder="Add your comment..." form="comment-form">
          </div>  
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'TrackCard',
    props: {
        track: Array
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
      checkLikes(data) {
      const authors = [];
      data.forEach(like => {
        authors.push(like.author);
      });
      return authors.includes(this.user._id);
      },
      toggleLike(event, id, likes) {
        const data = {
          subjectOf: id,
          author: this.user
        }
      
        if (!event.target.parentNode.parentNode.classList.contains('active')) {
          this.$store.dispatch('createLike', data);
        } else {
          this.$store.dispatch('deleteLike', id);
        }
        event.target.parentNode.parentNode.classList.toggle('active');
      }
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

    svg {
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

.interpretation-visual__container {
  // width: 30%;
  // min-width: 30%;
}

.dark-mode {
  .logo-play {
    fill: #FFFFFF;
  }
}

.like-button.button {
  margin: 0;
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
}
</style>
