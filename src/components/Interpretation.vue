<template>
    <div v-if="user"> 
      <h2>Interpretations</h2>  
      <div>
        <ul class="list-interpretations">
          <li v-for="item in interpretations.data" :key="item.id" :id="item.id">
            <img class="interpretation-visual" :src="item[0].cover" :alt="item[0].title">
            <figure>
              <figcaption>Listen to {{ item[0].title }} -- {{ item[0].artist_name }}</figcaption>
              <audio
                  controls
                  :src="item[0].track">
                      Your browser does not support the
                      <code>audio</code> element.
              </audio>
            </figure>
            <div class="like-container">
              <div v-if="item[2].length > 0">
              <template v-if="checkLikes(item[2])">
                <button class="like-button button active" @click="toggleLike($event, item[0]._id, item[2])">
                  <span class="like-button_like">
                    <img src="../assets/like.svg" alt="like music">
                  </span>
                  <span class="like-button_liked">
                    <img src="../assets/liked.svg" alt="liked music">
                  </span>
                </button>
              </template>
              <template v-else>
                <button class="like-button button" @click="toggleLike($event, item[0]._id, item[2])">
                  <span class="like-button_like">
                    <img src="../assets/like.svg" alt="like music">
                  </span>
                  <span class="like-button_liked">
                    <img src="../assets/liked.svg" alt="liked music">
                  </span>
                </button>
              </template>
              </div>
            <div v-else>
              <button class="like-button button" @click="toggleLike($event, item[0]._id, item[2])">
                <span class="like-button_like">
                  <img src="../assets/like.svg" alt="like music">
                </span>
                <span class="like-button_liked">
                  <img src="../assets/liked.svg" alt="liked music">
                </span>
              </button>
            </div>
            <p>Likes: {{ item[2].length }}</p> 
            </div>
            <div class="comment-space">
              <ul>
                <li class="comment-item" v-for="item in item[1]" :key="item._id" :id="item._id">
                  <div>{{ item.content }}</div> 
                  <div class="comment-item-actions">
                    <button class="delete-button button" @click="deleteComment($event, item._id)">
                      <span>
                        <img src="../assets/trash.svg" alt="delete comment">
                      </span>
                    </button>
                    <button class="like-button like-button-comment button" @click="toggleLike($event, item._id)">
                      <span class="like-button_like">
                        <img src="../assets/likeTwo.svg" alt="like comment">
                      </span>
                      <span class="like-button_liked">
                        <img src="../assets/likedTwo.svg" alt="liked comment">
                      </span>
                    </button>
                  </div>
                </li> 
              </ul>
              <label :for="'newcomment' + item[0]._id">Press enter to post comment</label>
              <input :id="'newcomment' + item[0]._id" @keyup.prevent.enter="postComment($event, item[0]._id)" placeholder="your comment" form="comment-form">
            </div>
          </li>
        </ul>
        <form action="#" method="" id="comment-form" class="hidden"></form>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Interpretation',
  data() {
    return {
      //totalLikes: 0
    }
  },
  components: {
  },
  computed: {
    ...mapState(['interpretations', 'user', 'comments'])
  },
  methods: {
    UserAccount() {
      this.$store.dispatch('checkUser');
    },
    allInterpretations() {
      this.$store.dispatch('fetchAllInterpretations');
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
      event.target.parentNode.classList.add('hidden');
      this.$store.dispatch('deleteComment', id);
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
  },

  async mounted() {
    await this.UserAccount();
    await this.allInterpretations();
    await this.allComments();
  }
};
</script>

<style lang="scss">
@media screen and (min-width:768px) {
  .list-interpretations {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: 50%;
    min-width: 50%;
    padding: 10px;
  }
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
    max-width: 20px;
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
  img {
    max-width: 20px;
  }
}

.comment-space {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  ul {
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
}

.interpretation-visual {
  max-width: 50%;
  width: 100%;

  ul, input {
    width: 100%;
    min-width: 100%;
  }
}

figcaption {
  margin-bottom: 20px;
}
</style>

