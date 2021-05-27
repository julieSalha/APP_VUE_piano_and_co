<template>
    <div class="player-container">
      <div class="player-container__tools">
        <div id="white-player">
          <div class="white-player__block">
            <div class="white-player-top">
            <div>
              &nbsp;
            </div>
            <div class="center">
              <span class="now-playing">Now Playing</span>
            </div>
            
            <div>
                <img src="https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/show-playlist.svg" alt="show playlist" id="show-playlist" @click="displayPlaylist"/>
            </div>
          </div>
            <div id="white-player-center">
              <img data-amplitude-song-info="cover_art_url" alt="main album art" class="main-album-art"/>

              <div class="song-meta-data">
                <span data-amplitude-song-info="name" class="song-name"></span>
                <span data-amplitude-song-info="artist" class="song-artist"></span>
              </div>

              <div class="time-progress">
                <div id="progress-container">
                  <label class="hidden" for="amplitude-song-slider">song slider</label>
                  <input type="range" id="amplitude-song-slider" class="amplitude-song-slider"/>
                  <progress id="song-played-progress" class="amplitude-song-played-progress"></progress>
                  <progress id="song-buffered-progress" class="amplitude-buffered-progress" value="0"></progress>
                </div>

                <div class="time-container">
                  <span class="current-time">
                    <span class="amplitude-current-minutes"></span>:<span class="amplitude-current-seconds"></span>
                  </span>
                  <span class="duration">
                      <span class="amplitude-duration-minutes"></span>:<span class="amplitude-duration-seconds"></span>
                    </span>
                </div>
              </div>
            </div>
          <div id="white-player-controls">
            <div class="amplitude-prev" id="previous">
              <svg class="icon-previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.52 493.52"><path d="M447.126.236c-10.056 0-20.884 4.12-32.148 11.884L140.882 200.952c-17.644 12.152-27.252 28.504-27.252 46.06-.004 17.56 9.78 33.924 27.428 46.076L415.39 481.784c11.284 7.768 22.568 11.736 32.604 11.736h.012c10.76 0 18.916-4.404 25.276-12.972 6.268-8.46 8.688-20.476 8.688-35.012V48.508C481.974 18.74 469.186.236 447.126.236zM53.106.036L39.894 0C25.018 0 11.55 12.112 11.55 26.996v439.42c0 14.884 13.024 27.1 27.908 27.1h.456l12.948-.072c14.88 0 28.092-12.164 28.092-27.048V27.028C80.958 12.144 67.97.036 53.106.036z"/></svg>
            </div>
            <div class="amplitude-play-pause" id="play-pause">
              <svg class="icon-play" xmlns="http://www.w3.org/2000/svg" width="30.051" height="30.047"><path data-name="Tracé 58" d="M19.982 14.436l-6.24-4.538a.752.752 0 00-1.2.607v9.069a.75.75 0 00.411.671.758.758 0 00.342.081.748.748 0 00.442-.146l6.24-4.532a.746.746 0 000-1.214z"/><path data-name="Tracé 59" d="M15.026-.002a15.023 15.023 0 1015.025 15.028A15.024 15.024 0 0015.026-.002zm0 27.54A12.516 12.516 0 1127.54 15.026 12.514 12.514 0 0115.026 27.54z"/></svg>
              <svg class="icon-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.019 74.98C388.667 26.629 324.38 0 256 0 187.619 0 123.332 26.629 74.98 74.98 26.629 123.332 0 187.619 0 256s26.629 132.668 74.98 181.02C123.332 485.371 187.619 512 256 512c68.38 0 132.667-26.629 181.019-74.98C485.371 388.668 512 324.38 512 256s-26.629-132.668-74.981-181.02zM256 482C131.383 482 30 380.617 30 256S131.383 30 256 30s226 101.383 226 226-101.383 226-226 226z"/><path d="M304.199 137.723c-8.284 0-15 6.716-15 15V359.28c0 8.284 6.716 15 15 15s15-6.716 15-15V152.723c0-8.284-6.716-15-15-15zM207.799 137.723c-8.284 0-15 6.716-15 15V359.28c0 8.284 6.716 15 15 15s15-6.716 15-15V152.723c0-8.284-6.716-15-15-15z"/></svg>
            </div>
            <div class="amplitude-next" id="next">
              <svg class="icon-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.796 493.796"><path d="M355.938 200.956L81.414 12.128C70.134 4.352 58.402.248 48.358.248c-22.052 0-36.672 18.496-36.672 48.26v397.036c0 14.54 4.228 26.688 10.496 35.144 6.364 8.572 16.32 13.108 27.076 13.108 10.04 0 21.308-4.112 32.584-11.876l274.276-188.828c17.632-12.152 27.3-28.508 27.296-46.076 0-17.56-9.82-33.916-27.476-46.06zM456.446 493.672l-.293-.004c-.048 0-.095.004-.143.004h.436zM455.638 0L444.29.032c-14.86 0-27.724 12.112-27.724 26.992v439.368c0 14.896 12.652 27.124 27.532 27.124l12.055.152c14.805-.079 25.957-12.412 25.957-27.252V26.996C482.11 12.116 470.51 0 455.638 0z"/></svg>
            </div>
          </div>
          </div>

          <div class="white-player__block">
            <div id="white-player-playlist-container">
              <div class="white-player-playlist-top">
                <div>

                </div>
                <div>
                  <span class="queue">Queue</span>
                </div>
                <div>
                    <img src="https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/close.svg" id="close-playlist" @click="closePlaylist"/>
                </div>
              </div>

              <div class="white-player-up-next">
                Up Next
              </div>

              <div class="white-player-playlist">
                <div class="white-player-playlist-song amplitude-song-container amplitude-play-pause" v-for="(song, index) in demoSongs" :key="song.id" :data-amplitude-song-index="index">
                  <img :src="song.cover_art_url" :alt="song.name"/>

                  <div class="playlist-song-meta" >
                    <span class="playlist-song-name">{{ song.name }}</span>
                    <span class="playlist-artist-album">{{ song.artist }}</span>
                  </div>
                </div>
              </div>

              <div class="white-player-playlist-controls">
                <img data-amplitude-song-info="cover_art_url" alt="playlist-album-art" class="playlist-album-art"/>

                <div class="playlist-controls">
                  <div class="playlist-meta-data">
                      <span data-amplitude-song-info="name" class="song-name"></span>
                      <span data-amplitude-song-info="artist" class="song-artist"></span>
                  </div>

                  <div class="playlist-control-wrapper">
                    <div class="amplitude-prev" id="playlist-previous">
                      <svg class="icon-previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.52 493.52"><path d="M447.126.236c-10.056 0-20.884 4.12-32.148 11.884L140.882 200.952c-17.644 12.152-27.252 28.504-27.252 46.06-.004 17.56 9.78 33.924 27.428 46.076L415.39 481.784c11.284 7.768 22.568 11.736 32.604 11.736h.012c10.76 0 18.916-4.404 25.276-12.972 6.268-8.46 8.688-20.476 8.688-35.012V48.508C481.974 18.74 469.186.236 447.126.236zM53.106.036L39.894 0C25.018 0 11.55 12.112 11.55 26.996v439.42c0 14.884 13.024 27.1 27.908 27.1h.456l12.948-.072c14.88 0 28.092-12.164 28.092-27.048V27.028C80.958 12.144 67.97.036 53.106.036z"/></svg>
                    </div>
                    <div class="amplitude-play-pause" id="playlist-play-pause">
                      <svg class="icon-play" xmlns="http://www.w3.org/2000/svg" width="30.051" height="30.047"><path data-name="Tracé 58" d="M19.982 14.436l-6.24-4.538a.752.752 0 00-1.2.607v9.069a.75.75 0 00.411.671.758.758 0 00.342.081.748.748 0 00.442-.146l6.24-4.532a.746.746 0 000-1.214z"/><path data-name="Tracé 59" d="M15.026-.002a15.023 15.023 0 1015.025 15.028A15.024 15.024 0 0015.026-.002zm0 27.54A12.516 12.516 0 1127.54 15.026 12.514 12.514 0 0115.026 27.54z"/></svg>
                      <svg class="icon-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.019 74.98C388.667 26.629 324.38 0 256 0 187.619 0 123.332 26.629 74.98 74.98 26.629 123.332 0 187.619 0 256s26.629 132.668 74.98 181.02C123.332 485.371 187.619 512 256 512c68.38 0 132.667-26.629 181.019-74.98C485.371 388.668 512 324.38 512 256s-26.629-132.668-74.981-181.02zM256 482C131.383 482 30 380.617 30 256S131.383 30 256 30s226 101.383 226 226-101.383 226-226 226z"/><path d="M304.199 137.723c-8.284 0-15 6.716-15 15V359.28c0 8.284 6.716 15 15 15s15-6.716 15-15V152.723c0-8.284-6.716-15-15-15zM207.799 137.723c-8.284 0-15 6.716-15 15V359.28c0 8.284 6.716 15 15 15s15-6.716 15-15V152.723c0-8.284-6.716-15-15-15z"/></svg>
                    </div>
                    <div class="amplitude-next" id="playlist-next">
                      <svg class="icon-next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 493.796 493.796"><path d="M355.938 200.956L81.414 12.128C70.134 4.352 58.402.248 48.358.248c-22.052 0-36.672 18.496-36.672 48.26v397.036c0 14.54 4.228 26.688 10.496 35.144 6.364 8.572 16.32 13.108 27.076 13.108 10.04 0 21.308-4.112 32.584-11.876l274.276-188.828c17.632-12.152 27.3-28.508 27.296-46.076 0-17.56-9.82-33.916-27.476-46.06zM456.446 493.672l-.293-.004c-.048 0-.095.004-.143.004h.436zM455.638 0L444.29.032c-14.86 0-27.724 12.112-27.724 26.992v439.368c0 14.896 12.652 27.124 27.532 27.124l12.055.152c14.805-.079 25.957-12.412 25.957-27.252V26.996C482.11 12.116 470.51 0 455.638 0z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="player-container__songs">
        <h3>Last interpretations...</h3>
        <div class="player-container__songs-container">
          <div v-for="(song, index) in lastStreamings.data" :key="song.id" class="song-to-add" :song-to-add="index">
            <a class="add-to-playlist-button button btn-second" song-to-add="0" @click="addToPlaylist(index)">
              <div>
                <img :src="song.cover_art_url" :alt="song.name + '-' + song.artist"/>
              </div>
              <div>
                <p class="song-to-add__description">{{song.name}} - {{song.artist}}</p>
                <span>Add To Playlist</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Amplitude from 'amplitudejs'
import { mapState } from 'vuex';

export default {
  name:"PlayerCustom",
  props: {
    tracks: Array
  },
  data() {
    return {
      songsList: Array,
      demoSongs: [
          {
            name: "Bohemian Rhapsody",
            artist: "Queen",
            url: "./uploads/track-bohemian_rhapsody.mp3",
            cover_art_url: "./uploads/cover-bohemian_rhapsody.jpg"
          },
          {
            name: "La vie en rose",
            artist: "Edith Piaf",
            url: "./uploads/track-la_vie_en_rose.mp3",
            cover_art_url: "./uploads/cover-la_vie_en_rose.jpeg"
          },
          {
            name: "Hey Jude",
            artist: "The Beatles",
            url: "./uploads/track-hey_jude.mp3",
            cover_art_url: "./uploads/cover-hey_jude.jpeg"
          }
        ]
    }
  },
  computed: {
    ...mapState(['lastStreamings'])
  },
  methods: {
    keyDown: function() {
      window.onkeydown = function(e) {
        return !(e.keyCode === 32);
      };
    },
    initPlayer() {
      Amplitude.init({
        songs: this.demoSongs
      });
    },
    displayPlaylist() {
      document.getElementById('white-player-playlist-container').classList.remove('slide-out-top');
      document.getElementById('white-player-playlist-container').classList.add('slide-in-top');
      document.getElementById('white-player-playlist-container').style.display = "block";
    },
    closePlaylist() {
      document.getElementById('white-player-playlist-container').classList.remove('slide-in-top');
      document.getElementById('white-player-playlist-container').classList.add('slide-out-top');
      document.getElementById('white-player-playlist-container').style.display = "none";
    },
    addToPlaylist(index) {
      const newIndex = Amplitude.addSong(this.lastStreamings.data[index]);
      this.appendToSongDisplay(this.lastStreamings.data[index], newIndex);
      Amplitude.bindNewElements();

      const songToAddRemove = document.querySelector('.song-to-add[song-to-add="' + index + '"]');
      songToAddRemove.parentNode.removeChild(songToAddRemove);
    },
    appendToSongDisplay(song, index) {
      /*
      Grabs the playlist element we will be appending to.
      */
      const playlistElement = document.querySelector('.white-player-playlist');
      //console.log('playlistElement',playlistElement);
      /*
        Creates the playlist song element
      */
      const playlistSong = document.createElement('div');
      playlistSong.setAttribute('class', 'white-player-playlist-song amplitude-song-container amplitude-play-pause');
      playlistSong.setAttribute('data-amplitude-song-index', index);
      /*
        Creates the playlist song image element
      */
      const playlistSongImg = document.createElement('img');
      playlistSongImg.setAttribute('src', song.cover_art_url);

      /*
        Creates the playlist song meta element
      */
      const playlistSongMeta = document.createElement('div');
      playlistSongMeta.setAttribute('class', 'playlist-song-meta');
      /*
        Creates the playlist song name element
      */
      const playlistSongName = document.createElement('span');
      playlistSongName.setAttribute('class', 'playlist-song-name');
      playlistSongName.innerHTML = song.name;

      /*
        Creates the playlist song artist album element
      */
      const playlistSongArtist = document.createElement('span');
      playlistSongArtist.setAttribute('class', 'playlist-song-artist');
      playlistSongArtist.innerHTML = song.artist;

      /*
        Appends the name and artist album to the playlist song meta.
      */
      playlistSongMeta.appendChild( playlistSongName );
      playlistSongMeta.appendChild( playlistSongArtist );

      /*
        Appends the song image and meta to the song element
      */
      playlistSong.appendChild( playlistSongImg );
      playlistSong.appendChild( playlistSongMeta );
    }
  },
  async mounted() {
    this.keyDown();
    this.initPlayer();
  }
}
</script>

<style lang="scss">
#white-player {
  position: relative; 
  width: 100%;
  max-width: 375px;

  margin: 50px auto;

  background-color: #FFFFFF;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
}

.white-player-top {
  display: flex;
  align-items: center; 

  width: 100%;

  padding: 20px 10px;

  div {
    flex: 1; 

    &.center {
      text-align: center;
    }
  }

  span.now-playing {
    color: #000000;
    font-weight: 600; 
  }
}

#show-playlist { 
  margin-left: 60px;
  cursor: pointer;
  float: right;
}

#white-player-center {
  .main-album-art {
    display: block;

    max-width: 280px;
    width: 100%;
    max-height: 280px; 
    height: 100%;

    margin: 16px auto 50px;

    border-radius: 8px;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  }

  .song-name, .song-artist {
    display: block;
    text-align: center;
  }

  .song-name {
    color: #000000;
    font-size: 20px; 
  }

  .song-artist {
    color: #000000;
    font-size: 14px; 
    }

  .time-progress {
    margin-bottom: 30px; 
  }

  .current-time {
    color: #000000;
    font-size: 12px;
    display: block;
    float: left;
    margin-left: 20px; 
  }
}

#progress-container {
  position: relative;

  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;

  cursor: pointer;
  z-index: 1;
}


#song-played-progress {
  position: absolute;
  left: 0;
  top: 8px;
  right: 0;

  width: 100%;
  height: 4px;


  z-index: 60;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 5px;
  background: transparent;
  border: none;
}

#song-played-progress[value]::-webkit-progress-bar {
  background: none;
  border-radius: 5px; }
#song-played-progress[value]::-webkit-progress-value {
  background-color: #FA6733;
  border-radius: 5px; }
#song-played-progress::-moz-progress-bar {
  background: none;
  border-radius: 5px;
  background-color: #FA6733;
  height: 5px;
  margin-top: -2px; }
#song-buffered-progress {
  position: absolute;
  left: 0;
  top: 8px;
  right: 0;
  width: 100%;
  z-index: 10;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 5px;
  background: transparent;
  border: none;
  background-color: #D7DEE3; }
#song-buffered-progress[value]::-webkit-progress-bar {
  background-color: #E1E1E1;
  border-radius: 5px; }
#song-buffered-progress[value]::-webkit-progress-value {
  background-color: #E1E1E1;
  border-radius: 5px;
  transition: width .1s ease; }
#song-buffered-progress::-moz-progress-bar {
  background: none;
  border-radius: 5px;
  background-color: #E1E1E1;
  height: 5px;
  margin-top: -2px; }
div#progress-container progress::-ms-fill {
  border: none; 
}

@-moz-document url-prefix() {
  #song-buffered-progress {
    top: 9px;
    border: none; } }
    @media all and (-ms-high-contrast: none) {
      #progress-container *::-ms-backdrop, #song-buffered-progress {
        color: #78909C;
        border: none; } }
    @supports (-ms-ime-align: auto) {
      #song-buffered-progress {
        color: #78909C;
        border: none; } }
      #progress-container input[type=range] {
      -webkit-appearance: none;
      width: 100%;
      margin: 7.5px 0;
      position: absolute;
      z-index: 9999;
      top: -12px;
      left: -17px;
      right: 0;
      height: 20px;
      cursor: pointer;
      background-color: inherit; }
      #progress-container input[type=range]:focus {
      outline: none; }
    #progress-container input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0px;
      cursor: pointer;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
      background: #FA6733;
      border-radius: 0px;
      border: 0px solid #010101; }
    #progress-container input[type=range]::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
      border: 1px solid #FA6733;
      height: 15px;
      width: 15px;
      border-radius: 16px;
      background: #FA6733;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -7.5px; }
    #progress-container input[type=range]:focus::-webkit-slider-runnable-track {
      background: #FA6733; }
    #progress-container input[type=range]::-moz-range-track {
      width: 100%;
      height: 0px;
      cursor: pointer;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
      background: #FA6733;
      border-radius: 0px;
      border: 0px solid #010101; }
    #progress-container input[type=range]::-moz-range-thumb {
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
      border: 1px solid #FA6733;
      height: 15px;
      width: 15px;
      border-radius: 16px;
      background: #FA6733;
      cursor: pointer; }
    #progress-container input[type=range]::-ms-track {
      width: 100%;
      height: 0px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent; }
    #progress-container input[type=range]::-ms-fill-lower {
      background: #003d57;
      border: 0px solid #010101;
      border-radius: 0px;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0); }
    #progress-container input[type=range]::-ms-fill-upper {
      background: #FA6733;
      border: 0px solid #010101;
      border-radius: 0px;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0); }
    #progress-container input[type=range]::-ms-thumb {
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
      border: 1px solid #FA6733;
      height: 15px;
      width: 15px;
      border-radius: 16px;
      background: #FA6733;
      cursor: pointer;
      height: 0px;
      display: none; }
    @media all and (-ms-high-contrast: none) {
      #progress-container *::-ms-backdrop, #progress-container input[type="range"].amplitude-song-slider {
        padding: 0px; }
      #progress-container *::-ms-backdrop, #progress-container input[type=range].amplitude-song-slider::-ms-thumb {
        height: 15px;
        width: 15px;
        border-radius: 10px;
        cursor: pointer;
        margin-top: -8px; }
      #progress-container *::-ms-backdrop, #progress-container input[type=range].amplitude-song-slider::-ms-track {
        border-width: 15px 0;
        border-color: transparent; }
      #progress-container *::-ms-backdrop, #progress-container input[type=range].amplitude-song-slider::-ms-fill-lower {
        background: #E1E1E1;
        border-radius: 10px; }
      #progress-container *::-ms-backdrop, #progress-container input[type=range].amplitude-song-slider::-ms-fill-upper {
        background: #E1E1E1;
        border-radius: 10px; } }
    @supports (-ms-ime-align: auto) {
      #progress-container input[type=range].amplitude-song-slider::-ms-thumb {
        height: 15px;
        width: 15px;
        margin-top: 3px; } }
    #progress-container input[type=range]:focus::-ms-fill-lower {
      background: #FA6733; }
    #progress-container input[type=range]:focus::-ms-fill-upper {
      background: #FA6733; }
  #white-player-center span.duration {
    color: #000000;
    font-size: 12px;
    display: block;
    float: right;
    margin-right: 20px; }

#white-player-controls {
  text-align: center;
  padding-bottom: 35px; }
  #white-player-controls div#shuffle {
    display: inline-block;
    width: 19px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 24px; }
    #white-player-controls div#shuffle.amplitude-shuffle-off {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/shuffle-off.svg"); }
    #white-player-controls div#shuffle.amplitude-shuffle-on {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/shuffle-on.svg"); }
  #white-player-controls div#previous {
    display: inline-block;
    height: 53px;
    width: 53px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 16px; }
  #white-player-controls div#play-pause {
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;

    .icon-play, .icon-pause {
      transform: scale(1.7);
      margin-top: 10px;
    }
  }

    #white-player-controls div#play-pause.amplitude-paused {
      background: none; 
      .icon-play {
        display: block;
      }

      .icon-pause {
        display: none;
      }
    }
    #white-player-controls div#play-pause.amplitude-playing {
      background: none; 
      .icon-play {
        display: none;
      }

      .icon-pause {
        display: block;
      }
    }
  #white-player-controls div#next {
    display: inline-block;
    height: 53px;
    width: 53px;
    cursor: pointer;
    vertical-align: middle;
    margin-left: 16px; }
  #white-player-controls div#repeat {
    display: inline-block;
    width: 18px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle; }
    #white-player-controls div#repeat.amplitude-repeat-off {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/repeat-off.svg"); }
    #white-player-controls div#repeat.amplitude-repeat-on {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/repeat-on.svg"); }

#white-player-playlist-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  z-index: 9999;
  display: none;
  border-radius: 8px; }

.white-player-playlist-top {
  height: 64px;
  text-align: center;
  display: flex; }
  .white-player-playlist-top div {
    flex: 1; }
    .white-player-playlist-top div span.queue {
      color: #000000;
      font-family: "Roboto", sans-serif;
      line-height: 64px;
      font-weight: 600; }
    .white-player-playlist-top div img#close-playlist {
      margin-right: 16px;
      margin-top: 22px;
      float: right;
      cursor: pointer; }

.white-player-up-next {
  margin-top: 6px;
  padding-left: 20px;
  font-size: 24px;
  color: #000000; }

.white-player-playlist {
  margin-top: 32px;
  height: calc( 100% - 234px );
  overflow-y: scroll; }

.white-player-playlist-song {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  border-bottom: 1px solid #F5F5F6;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer; 
}
  .white-player-playlist-song:hover {
    background-color: rgba(211, 94, 154, 0.3); }
  .white-player-playlist-song.amplitude-active-song-container {
    background-color: rgba(238, 100, 82, 0.3); }
  .white-player-playlist-song img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    margin-left: 16px;
    float: left; }
  .white-player-playlist-song div.playlist-song-meta {
    float: left;
    margin-left: 15px;
    width: calc( 100% - 80px ); }
    .white-player-playlist-song div.playlist-song-meta span.playlist-song-name {
      color: #000000;
      font-size: 14px;
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; }
    .white-player-playlist-song div.playlist-song-meta span.playlist-artist-album {
      color: #000000;
      font-size: 12px;
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; }

.white-player-playlist-song::after {
  content: "";
  display: table;
  clear: both; }

.white-player-playlist-controls {
  background-color: #F5F5F6;
  border-radius: 8px;
  padding: 16px; 

  .icon-previous, .icon-next {
    width: 20px;
    height: 20px;
  }
}
  .white-player-playlist-controls img.playlist-album-art {
    float: left;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    height: 64px;
    width: 64px; }
  .white-player-playlist-controls .playlist-controls {
    float: left;
    margin-left: 25px;
    width: calc( 100% - 89px ); }
    .white-player-playlist-controls div.playlist-meta-data {
      display: inline-block;
      width: calc(100% - 125px);
      vertical-align: middle; }
      .white-player-playlist-controls span.song-name {
        display: block;
        color: #000000;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; }
      .white-player-playlist-controls .song-artist {
        display: block;
        color: #000000;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; }
    .white-player-playlist-controls .playlist-control-wrapper {
      text-align: center;
      margin-top: 10px;
      display: inline-block;
      width: 120px;
      vertical-align: middle; }
      .white-player-playlist-controls #playlist-previous {
        display: inline-block;
        height: 32px;
        width: 32px;
        cursor: pointer;
        vertical-align: middle;
      }
      .white-player-playlist-controls #playlist-play-pause {
        display: inline-block;
        width: 32px;
        height: 32px;
        cursor: pointer;
        vertical-align: middle; 

        .icon-pause, .icon-play {
          margin-top: 15px;
        }
      }
        .white-player-playlist-controls #playlist-play-pause.amplitude-paused {
          .icon-play {
            display: block;
          }
          .icon-pause {
            display: none;
          }
        }
        .white-player-playlist-controls #playlist-play-pause.amplitude-playing {
          .icon-play {
            display: none;
          }
          .icon-pause {
            display: block;
          }
        }
      .white-player-playlist-controls #playlist-next {
        display: inline-block;
        height: 32px;
        width: 32px;
        cursor: pointer;
        vertical-align: middle;
      }

.white-player-playlist-controls::after {
  content: "";
  display: table;
  clear: both; }

.song-to-add {
  width: 50%;
  min-width: 50%;
  padding: 10px;
  max-width: 250px; 
}
  div.song-to-add img {
    border-radius: 6px;
    width: 100%; }
/*
  3. Layout
*/

  .example-container {
    width: 100%;
    display: flex; }
    .example-container .player-container__tools {
      width: 50%; }
    .example-container .right {
      width: 50%;
      display: flex;
      flex-wrap: wrap; }

@media screen and (max-width: 39.9375em) {
  .example-container {
    flex-direction: column; }
    .example-container div.player-container__tools {
      width: 100%; }
    .example-container div.player-container__songs {
      width: 100%; } }
@media screen and (min-width: 40em) and (max-width: 63.9375em) {
  .player-container__songs {
    padding-left: 20px; } }

.slide-in-top {
  -webkit-animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }

/* ----------------------------------------------
 * Generated by Animista on 2019-3-25 18:39:54
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */
/**
 * ----------------------------------------
 * animation slide-in-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    opacity: 0; }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1; } }
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    opacity: 0; }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1; } }
.slide-out-top {
  -webkit-animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: slide-out-top 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both; }

/* ----------------------------------------------
 * Generated by Animista on 2019-3-25 18:45:17
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */
/**
 * ----------------------------------------
 * animation slide-out-top
 * ----------------------------------------
 */
@-webkit-keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1; }
  100% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    opacity: 0; } }
@keyframes slide-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1; }
  100% {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    opacity: 0; } }

/*# sourceMappingURL=app.css.map */

a.more-on-ssu{
    background-color: white;
    color: #CC5CAD;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
    text-align: center;
    max-width: 300px;
    border-radius: 6px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin: auto;
    display: block;
    margin-top: 20px;
    font-weight: bold;
    cursor: pointer;
  text-decoration: none;
}


.player-container__songs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.add-to-playlist-button.button {
  min-height: 185px;
  padding: 2px;
  margin: 0;
  font-size: 1.2rem;

  span {
    text-decoration: underline;
  }
}

.icon-previous, .icon-next {
  width: 25px;
  height: 25px;

  margin-top: 20px;
}

.dark-mode {
  #white-player,
  #white-player-playlist-container,
  .white-player-playlist-controls {
    background-color: #011918;
  }

  .white-player-top .now-playing,
  #white-player-center .song-name,
  #white-player-center .song-artist,
  .white-player-playlist-top div .queue,
  .white-player-up-next,
  .white-player-playlist-song .playlist-song-name,
  .white-player-playlist-song .playlist-artist-album,
  .white-player-playlist-controls .song-name {
    color: #FFFFFF;
  }

  .white-player-playlist-song div.playlist-song-meta span.playlist-song-name,
  .white-player-playlist-song div.playlist-song-meta span.playlist-artist-album,
  .song-artist,
  #white-player-center .current-time,
  #white-player-center span.duration {
    color: #FFFFFF;
  }

  .icon-previous, .icon-next {
    fill: #FFFFFF;
  }
}

.song-to-add__description {
  min-height: 54px;
}

@media screen and (min-width:768px) {
  .song-to-add {
    width: 33%;
    min-width: 33%;
  }
}

@media screen and (min-width:1024px) {


  div#white-player {
    max-width: 100%;
  }

  div#white-player-center img.main-album-art {
    max-width: 400px;
    max-height: 400px;
  }

  .add-to-playlist-button.button {
    width: 100%;

    padding: 6px 12px;
    font-size: 1.4rem;
  }

  #play-pause {
    width: 300px;

    .icon-play, .icon-pause {
      margin: auto;
    }
  }

  .white-player-playlist-song img {
    width: 70px;
    height: 70px;
  }
}
</style>