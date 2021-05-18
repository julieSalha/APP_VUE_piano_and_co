<template>
    <div v-if="user"> 
      <h2>Piano and Co</h2>
      <PlayerCustom :tracks="streamings.data" /> 
    </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayerCustom from './PlayerCustom';
import TrackCard from './interpretation/TrackCard'
import Amplitude from 'amplitudejs'

export default {
  name: 'Interpretation',
  data() {
    return {
      //totalLikes: 0
    }
  },
  components: {
    PlayerCustom,
    TrackCard
  },
  computed: {
    ...mapState(['streamings', 'user', 'comments'])
  },
  methods: {
    allStreamings() {
      this.$store.dispatch('fetchAllStreamings');
    }
  },
  async mounted() {
    await this.allStreamings();
  }
};
</script>

<style lang="scss">

.list-interpretations {
  padding: 10px;  

  .list-interpretations__li {
    margin-bottom: 10px;

    &.hidden {
      border-bottom: 0;
      margin: 0;
    }
  }
}

</style>

