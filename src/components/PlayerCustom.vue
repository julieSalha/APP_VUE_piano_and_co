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
                <img src="https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/show-playlist.svg" id="show-playlist" @click="displayPlaylist"/>
            </div>
          </div>
            <div id="white-player-center">
              <img data-amplitude-song-info="cover_art_url" class="main-album-art"/>

              <div class="song-meta-data">
                <span data-amplitude-song-info="name" class="song-name"></span>
                <span data-amplitude-song-info="artist" class="song-artist"></span>
              </div>

              <div class="time-progress">
                <div id="progress-container">
                  <input type="range" class="amplitude-song-slider"/>
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
            <div class="amplitude-shuffle amplitude-shuffle-off" id="shuffle"></div>
            <div class="amplitude-prev" id="previous"></div>
            <div class="amplitude-play-pause" id="play-pause"></div>
            <div class="amplitude-next" id="next"></div>
            <div class="amplitude-repeat" id="repeat"></div>
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
                  <img :src="song.cover_art_url"/>

                  <div class="playlist-song-meta" >
                    <span class="playlist-song-name">{{ song.name }}</span>
                    <span class="playlist-artist-album">{{ song.artist }}</span>
                  </div>
                </div>
              </div>

              <div class="white-player-playlist-controls">
                <img data-amplitude-song-info="cover_art_url" class="playlist-album-art"/>

                <div class="playlist-controls">
                  <div class="playlist-meta-data">
                      <span data-amplitude-song-info="name" class="song-name"></span>
                      <span data-amplitude-song-info="artist" class="song-artist"></span>
                  </div>

                  <div class="playlist-control-wrapper">
                    <div class="amplitude-prev" id="playlist-previous"></div>
                    <div class="amplitude-play-pause" id="playlist-play-pause"></div>
                    <div class="amplitude-next" id="playlist-next"></div>
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
          <div v-for="(song, index) in songsList" :key="song.id" class="song-to-add" :song-to-add="index">
            <img :src="song.cover_art_url" :alt="song.name + '-' + song.artist"/>

            <a class="add-to-playlist-button button btn-second" song-to-add="0" @click="addToPlaylist(index)">
              Add To Playlist
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
    ...mapState(['streamings'])
  },
  methods: {
    keyDown: function() {
      window.onkeydown = function(e) {
        return !(e.keyCode === 32);
      };
    },
    initPlayer() {
      const songs = [];
      this.tracks.forEach(song => {
        songs.push({
          name: song[0].title,
          artist: song[0].artist_name,
          url: song[0].track,
          cover_art_url: song[0].cover
        });
      });
      this.songsList = songs;

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
      const newIndex = Amplitude.addSong(this.songsList[index]);
      this.appendToSongDisplay(this.songsList[index], newIndex);
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
    },
    displayList() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        document.querySelector('#white-player-playlist-container').style.display = "block";
        document.querySelector('#show-playlist').style.display = "none";
        document.querySelector('#close-playlist').style.display = "none";
      } else {
        document.querySelector('#white-player-playlist-container').style.display = "none";
        document.querySelector('#show-playlist').style.display = "block";
        document.querySelector('#close-playlist').style.display = "block";
      }
    }
  },
  async mounted() {
    this.keyDown();
    this.initPlayer();
    this.displayList();
  },
  created() {
    window.addEventListener('resize', this.displayList);
  },
  destroyed() {
    window.removeEventListener('resize', this.displayList);
  }
}
</script>

<style lang="scss">
div#white-player {
  width: 100%;
  max-width: 375px;
  background-color: #FFFFFF;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-family: "Lato", sans-serif;
  margin: 50px auto;
  position: relative; 
}

div.white-player-top {
  height: 64px;
  display: flex;
  width: 100%;
  align-items: center; }
  div.white-player-top div {
    flex: 1; }
    div.white-player-top div.center {
      text-align: center; }
  div.white-player-top span.now-playing {
    color: #414344;
    font-family: "Lato", sans-serif;
    line-height: 64px;
    font-weight: 600; }
  div.white-player-top img#show-playlist {
    float: right;
    cursor: pointer;
    margin-right: 10px; }

div#white-player-center img.main-album-art {
  display: block;
  margin: auto;
  margin-top: 16px;
  margin-bottom: 50px;
  border-radius: 8px;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
  width: 280px;
  height: 280px; }
div#white-player-center div.song-meta-data span.song-name {
  color: #414344;
  display: block;
  text-align: center;
  font-size: 20px; }
div#white-player-center div.song-meta-data span.song-artist {
  color: #AAAFB3;
  display: block;
  text-align: center;
  font-size: 14px; }
div#white-player-center div.time-progress {
  margin-bottom: 30px; }
  div#white-player-center div.time-progress span.current-time {
    color: #AAAFB3;
    font-size: 12px;
    display: block;
    float: left;
    margin-left: 20px; }
  div#white-player-center div.time-progress div#progress-container {
    margin-left: 20px;
    margin-right: 20px;
    position: relative;
    height: 20px;
    cursor: pointer;
    /*
      IE 11
    */ }
    div#white-player-center div.time-progress div#progress-container:hover input[type=range].amplitude-song-slider::-webkit-slider-thumb {
      display: block; }
    div#white-player-center div.time-progress div#progress-container:hover input[type=range].amplitude-song-slider::-moz-range-thumb {
      visibility: visible; }
    div#white-player-center div.time-progress div#progress-container progress#song-played-progress {
      width: 100%;
      position: absolute;
      left: 0;
      top: 8px;
      right: 0;
      width: 100%;
      z-index: 60;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 4px;
      border-radius: 5px;
      background: transparent;
      border: none;
      /* Needed for Firefox */ }
    @media all and (-ms-high-contrast: none) {
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container progress#song-played-progress {
        color: #FA6733;
        border: none;
        background-color: #E1E1E1; } }
    @supports (-ms-ime-align: auto) {
      div#white-player-center div.time-progress div#progress-container progress#song-played-progress {
        color: #FA6733;
        border: none; } }
    div#white-player-center div.time-progress div#progress-container progress#song-played-progress[value]::-webkit-progress-bar {
      background: none;
      border-radius: 5px; }
    div#white-player-center div.time-progress div#progress-container progress#song-played-progress[value]::-webkit-progress-value {
      background-color: #FA6733;
      border-radius: 5px; }
    div#white-player-center div.time-progress div#progress-container progress#song-played-progress::-moz-progress-bar {
      background: none;
      border-radius: 5px;
      background-color: #FA6733;
      height: 5px;
      margin-top: -2px; }
    div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress {
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
    div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress[value]::-webkit-progress-bar {
      background-color: #E1E1E1;
      border-radius: 5px; }
    div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress[value]::-webkit-progress-value {
      background-color: #E1E1E1;
      border-radius: 5px;
      transition: width .1s ease; }
    div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress::-moz-progress-bar {
      background: none;
      border-radius: 5px;
      background-color: #E1E1E1;
      height: 5px;
      margin-top: -2px; }
    div#white-player-center div.time-progress div#progress-container progress::-ms-fill {
      border: none; }
@-moz-document url-prefix() {
  div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress {
    top: 9px;
    border: none; } }
    @media all and (-ms-high-contrast: none) {
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress {
        color: #78909C;
        border: none; } }
    @supports (-ms-ime-align: auto) {
      div#white-player-center div.time-progress div#progress-container progress#song-buffered-progress {
        color: #78909C;
        border: none; } }
    div#white-player-center div.time-progress div#progress-container input[type=range] {
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
    div#white-player-center div.time-progress div#progress-container input[type=range]:focus {
      outline: none; }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0px;
      cursor: pointer;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
      background: #FA6733;
      border-radius: 0px;
      border: 0px solid #010101; }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-webkit-slider-thumb {
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
      border: 1px solid #FA6733;
      height: 15px;
      width: 15px;
      border-radius: 16px;
      background: #FA6733;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -7.5px; }
    div#white-player-center div.time-progress div#progress-container input[type=range]:focus::-webkit-slider-runnable-track {
      background: #FA6733; }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-moz-range-track {
      width: 100%;
      height: 0px;
      cursor: pointer;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
      background: #FA6733;
      border-radius: 0px;
      border: 0px solid #010101; }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-moz-range-thumb {
      box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
      border: 1px solid #FA6733;
      height: 15px;
      width: 15px;
      border-radius: 16px;
      background: #FA6733;
      cursor: pointer; }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-ms-track {
      width: 100%;
      height: 0px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent; }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-ms-fill-lower {
      background: #003d57;
      border: 0px solid #010101;
      border-radius: 0px;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0); }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-ms-fill-upper {
      background: #FA6733;
      border: 0px solid #010101;
      border-radius: 0px;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0); }
    div#white-player-center div.time-progress div#progress-container input[type=range]::-ms-thumb {
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
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container input[type="range"].amplitude-song-slider {
        padding: 0px; }
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container input[type=range].amplitude-song-slider::-ms-thumb {
        height: 15px;
        width: 15px;
        border-radius: 10px;
        cursor: pointer;
        margin-top: -8px; }
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container input[type=range].amplitude-song-slider::-ms-track {
        border-width: 15px 0;
        border-color: transparent; }
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container input[type=range].amplitude-song-slider::-ms-fill-lower {
        background: #E1E1E1;
        border-radius: 10px; }
      div#white-player-center div.time-progress div#progress-container *::-ms-backdrop, div#white-player-center div.time-progress div#progress-container input[type=range].amplitude-song-slider::-ms-fill-upper {
        background: #E1E1E1;
        border-radius: 10px; } }
    @supports (-ms-ime-align: auto) {
      div#white-player-center div.time-progress div#progress-container input[type=range].amplitude-song-slider::-ms-thumb {
        height: 15px;
        width: 15px;
        margin-top: 3px; } }
    div#white-player-center div.time-progress div#progress-container input[type=range]:focus::-ms-fill-lower {
      background: #FA6733; }
    div#white-player-center div.time-progress div#progress-container input[type=range]:focus::-ms-fill-upper {
      background: #FA6733; }
  div#white-player-center div.time-progress span.duration {
    color: #AAAFB3;
    font-size: 12px;
    display: block;
    float: right;
    margin-right: 20px; }

div#white-player-controls {
  text-align: center;
  padding-bottom: 35px; }
  div#white-player-controls div#shuffle {
    display: inline-block;
    width: 19px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 24px; }
    div#white-player-controls div#shuffle.amplitude-shuffle-off {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/shuffle-off.svg"); }
    div#white-player-controls div#shuffle.amplitude-shuffle-on {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/shuffle-on.svg"); }
  div#white-player-controls div#previous {
    display: inline-block;
    height: 53px;
    width: 53px;
    cursor: pointer;
    background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/previous.svg");
    vertical-align: middle;
    margin-right: 16px; }
  div#white-player-controls div#play-pause {
    display: inline-block;
    width: 85px;
    height: 85px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 16px; }
    div#white-player-controls div#play-pause.amplitude-paused {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg"); }
    div#white-player-controls div#play-pause.amplitude-playing {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/pause.svg"); }
  div#white-player-controls div#next {
    display: inline-block;
    height: 53px;
    width: 53px;
    cursor: pointer;
    background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/next.svg");
    vertical-align: middle;
    margin-right: 24px; }
  div#white-player-controls div#repeat {
    display: inline-block;
    width: 18px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle; }
    div#white-player-controls div#repeat.amplitude-repeat-off {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/repeat-off.svg"); }
    div#white-player-controls div#repeat.amplitude-repeat-on {
      background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/repeat-on.svg"); }

div#white-player-playlist-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  z-index: 9999;
  display: none;
  border-radius: 8px; }

div.white-player-playlist-top {
  height: 64px;
  text-align: center;
  display: flex; }
  div.white-player-playlist-top div {
    flex: 1; }
    div.white-player-playlist-top div span.queue {
      color: #414344;
      font-family: "Lato", sans-serif;
      line-height: 64px;
      font-weight: 600; }
    div.white-player-playlist-top div img#close-playlist {
      margin-right: 16px;
      margin-top: 22px;
      float: right;
      cursor: pointer; }

div.white-player-up-next {
  margin-top: 6px;
  padding-left: 20px;
  font-size: 24px;
  color: #414344; }

div.white-player-playlist {
  margin-top: 32px;
  height: calc( 100% - 234px );
  overflow-y: scroll; }

div.white-player-playlist-song {
  border-bottom: 1px solid #F5F5F6;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer; }
  div.white-player-playlist-song:hover {
    background-color: rgba(211, 94, 154, 0.3); }
  div.white-player-playlist-song.amplitude-active-song-container {
    background-color: rgba(238, 100, 82, 0.3); }
  div.white-player-playlist-song img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
    margin-left: 16px;
    float: left; }
  div.white-player-playlist-song div.playlist-song-meta {
    float: left;
    margin-left: 15px;
    width: calc( 100% - 80px ); }
    div.white-player-playlist-song div.playlist-song-meta span.playlist-song-name {
      color: #414344;
      font-size: 14px;
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; }
    div.white-player-playlist-song div.playlist-song-meta span.playlist-artist-album {
      color: #AAAFB3;
      font-size: 12px;
      display: block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; }

div.white-player-playlist-song::after {
  content: "";
  display: table;
  clear: both; }

div.white-player-playlist-controls {
  background-color: #F5F5F6;
  border-radius: 8px;
  padding: 16px; }
  div.white-player-playlist-controls img.playlist-album-art {
    float: left;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    height: 64px;
    width: 64px; }
  div.white-player-playlist-controls div.playlist-controls {
    float: left;
    margin-left: 25px;
    width: calc( 100% - 89px ); }
    div.white-player-playlist-controls div.playlist-controls div.playlist-meta-data {
      display: inline-block;
      width: calc(100% - 125px);
      vertical-align: middle; }
      div.white-player-playlist-controls div.playlist-controls div.playlist-meta-data span.song-name {
        display: block;
        color: #414344;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; }
      div.white-player-playlist-controls div.playlist-controls div.playlist-meta-data span.song-artist {
        display: block;
        color: #AAAFB3;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; }
    div.white-player-playlist-controls div.playlist-controls div.playlist-control-wrapper {
      text-align: center;
      margin-top: 10px;
      display: inline-block;
      width: 120px;
      vertical-align: middle; }
      div.white-player-playlist-controls div.playlist-controls div.playlist-control-wrapper div#playlist-previous {
        display: inline-block;
        height: 32px;
        width: 32px;
        cursor: pointer;
        background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/previous.svg");
        vertical-align: middle;
        background-size: 32px 32px; }
      div.white-player-playlist-controls div.playlist-controls div.playlist-control-wrapper div#playlist-play-pause {
        display: inline-block;
        width: 32px;
        height: 32px;
        cursor: pointer;
        vertical-align: middle; }
        div.white-player-playlist-controls div.playlist-controls div.playlist-control-wrapper div#playlist-play-pause.amplitude-paused {
          background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg");
          background-size: 32px 32px; }
        div.white-player-playlist-controls div.playlist-controls div.playlist-control-wrapper div#playlist-play-pause.amplitude-playing {
          background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/pause.svg");
          background-size: 32px 32px; }
      div.white-player-playlist-controls div.playlist-controls div.playlist-control-wrapper div#playlist-next {
        display: inline-block;
        height: 32px;
        width: 32px;
        cursor: pointer;
        background: url("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/next.svg");
        vertical-align: middle;
        background-size: 32px 32px; }

div.white-player-playlist-controls::after {
  content: "";
  display: table;
  clear: both; }

div.song-to-add {
  width: 33%;
  min-width: 33%;
  padding: 10px;
  max-width: 250px; }
  div.song-to-add img {
    border-radius: 6px;
    width: 100%; }


/* Medium only */
@media screen and (min-width: 40em) and (max-width: 63.9375em) {
  div.song-to-add {
    width: 40%;
    padding: 5px; } }
/*
  3. Layout
*/

  body div.example-container {
    width: 100%;
    display: flex; }
    body div.example-container div.player-container__tools {
      width: 50%; }
    body div.example-container div.right {
      width: 50%;
      display: flex;
      flex-wrap: wrap; }

@media screen and (max-width: 39.9375em) {
  body div.example-container {
    flex-direction: column; }
    body div.example-container div.player-container__tools {
      width: 100%; }
    body div.example-container div.player-container__songs {
      width: 100%; } }
@media screen and (min-width: 40em) and (max-width: 63.9375em) {
  body div.player-container__songs {
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
  padding: 2px;
  font-size: 1.2rem;
}

.dark-mode {
  div#white-player,
  div#white-player-playlist-container,
  div.white-player-playlist-controls {
    background-color: #3c3939;
  }

  div.white-player-top span.now-playing,
  div#white-player-center div.song-meta-data span.song-name,
  div#white-player-center div.song-meta-data span.song-artist,
  div.white-player-playlist-top div span.queue,
  div.white-player-up-next,
  div.white-player-playlist-song div.playlist-song-meta span.playlist-song-name,
  div.white-player-playlist-song div.playlist-song-meta span.playlist-artist-album,
  div.white-player-playlist-controls div.playlist-controls div.playlist-meta-data span.song-name {
    color: #FFFFFF;
  }


}

@media screen and (min-width:1024px) {
  div#white-player {
    display: flex;
    flex-wrap: nowrap;
    max-width: 100%;
  }

  .white-player__block {
    width: 50%;
    min-width: 50%;
  }

  div#white-player-playlist-container {
    position: static;
  }

  .add-to-playlist-button.button {
    padding: 6px 12px;
    font-size: 1.4rem;
  }
}
</style>