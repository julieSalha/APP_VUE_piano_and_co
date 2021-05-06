<template>
    <div v-if="user"> 
      <h2>Music</h2>
      <!-- <Player />  -->
      <div>
        <ul class="list-interpretations">
          <li v-for="item in interpretations.data" :key="item.id" :id="item.id">
            <TrackCard :track="item" />
          </li>
        </ul>
        <form action="#" method="" id="comment-form" class="hidden"></form>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Player from './Player';
import TrackCard from './interpretation/TrackCard'

export default {
  name: 'Interpretation',
  data() {
    return {
      //totalLikes: 0
    }
  },
  components: {
    Player,
    TrackCard
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
      event.target.parentNode.parentNode.classList.add('hidden');
      this.$store.dispatch('deleteComment', id);
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

.list-interpretations {
  padding: 10px;  

  li {
    margin-bottom: 10px;
    border-bottom: 1px solid;
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

@media screen and (min-width:768px) {
  .interpretation-item.active .interpretation-item__content {
    flex-wrap: wrap;
    flex-direction: row;
  }

  .interpretation-item__content__top,
  .interpretation-item__content__bottom {
    width: 50%;
    min-width: 50%;
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
</style>

