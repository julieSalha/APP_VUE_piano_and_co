<template>
    <div v-if="user"> 
      <h2>Interpretations</h2>  
      <div>
        <ul>
          <li v-for="item in interpretations.data" :key="item.id" :id="item.id">
            <img :src="item[0].cover" :alt="item[0].title">
            <figure>
              <figcaption>Listen to {{ item[0].title }} -- {{ item[0].artist_name }}</figcaption>
              <audio
                  controls
                  :src="item[0].track">
                      Your browser does not support the
                      <code>audio</code> element.
              </audio>
            </figure>
            <div>
              <button class="like-button button" @click="postLike($event, item[0]._id)">Like track</button>
            </div>
            <div class="comment-space">
              <ul>
                <li v-for="item in item[1]" :key="item._id" :id="item._id">{{ item.content }} 
                  <button @click="deleteComment($event, item._id)">delete</button>
                  <button class="like-button button" @click="postLike($event, item._id)">Like Comm</button>
                </li>
                
              </ul>
              <ul>
                <p>Likes: {{ item[2].length }}</p>
              </ul>
              <input @keyup.prevent.enter="postComment($event, item[0]._id)" placeholder="Add your comment" form="comment-form">
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
    postLike(event, id) {
      const data = {
        subjectOf: id,
        author: this.user
      }

      console.log('id post like', id);
    
      //console.log('data post Like',data)
      if (!event.target.classList.contains('active')) {
        this.$store.dispatch('createLike', data);
        console.log('createLike')
      } else {
        this.$store.dispatch('deleteLike', id);
        console.log('deleteLike');
      }

      event.target.classList.toggle('active');
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
.like-button {
  &.active {
    color: blue;
  }
}
</style>

