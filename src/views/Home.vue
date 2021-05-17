<template>
  <div class="home-content">
    <div class="home-content__container">
      <form id="chords-suggestion-form" @submit.prevent="songs()">
        <div class="chords-suggestion-form__key">
        <h2>Tone choice</h2>
          <div>
            <label for="key_selected">Select a key*</label>
          </div>
          <select id="key_selected" v-model="key_selected" @change="choiceKey" required>
            <option value="">--Please select a key--</option>
            <option
              v-for="chord in this.keysArray"
              :value="chord.key"
              :key="chord.id"
            >
              {{ chord.key }}
            </option>
          </select>
          <p><span id='key-informations' hidden>Please select a key.</span></p>
          </div>
        <div class="chords-suggestion-form__chords">
          <h2>Chords suggestion</h2>
          <div class="agreement-suggestion__content">
            <div>
              <div>
                <div>
                  <label for="first-code-select">First chord*</label>
                </div>
                <div>
                  <select
                    name="first-code-select"
                    id="first-code-select"
                    v-model="firstChord"
                    @change="secondChords()"
                    required
                  >
                    <option value="">--Select a first chord--</option>
                    <option
                      v-for="item in this.selectFirstChords"
                      :value="romanToInteger(item.roman)"
                      :key="item.id"
                      :chord="item.chord"
                    >
                      {{ item.chord }}
                    </option>
                  </select>
                </div>
                <p><span id='chords-informations' hidden>Please select at least two chords.</span></p>
              </div>
              <div>
                <div>
                  <label for="second-code-select">Second chord*</label>
                </div>
                <div>
                  <select
                    name="second-code-select"
                    id="second-code-select"
                    v-model="secondChord"
                    @change="ThirstChords()"
                    required
                  >
                    <option value="">--Select a second chord--</option>
                    <option
                      v-for="item in this.secondChordsOptions"
                      :value="item.value"
                      :key="item.id"
                    >
                      proba: {{ item.probability }} - {{ item.chord }}
                    </option>
                  </select>
                </div>
                <p><span id='chords-informations-bis' hidden>Please select at least two chords.</span></p>
              </div>
              <div>
                <div>
                  <label for="thirst-code-select">Thirst chord</label>
                </div>
                <div>
                  <select
                    name="thirst-code-select"
                    id="thirst-code-select"
                    v-model="thirstChord"
                  >
                    <option value="">--Select a thirst chord--</option>
                    <option
                      v-for="item in this.thirstChordsOptions"
                      :value="item.value"
                      :key="item.id"
                    >
                      proba: {{ item.probability }} - {{ item.chord }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" class="button btn-third">Search</button>
            </div>
          </div>
        </div>
      </form>
      <section id="agreement-suggestion" class="agreement-suggestion hidden">
        <h2>Songs inspiration</h2>
        <p>Results of your search:</p>
        <div id="agreement-suggestion__list-hook" class="agreement-suggestion__list-hook">
          <ul>
            <li v-for="item in this.arraySongs.slice(1, 10)" :key="item.index">
              <div>
                <p>{{ item.artist }}</p>
                <p>{{ item.song }}</p>
                <p>{{ item.section }}</p>
              </div>
              <div>
                <a :href="item.url" target="_blank" class="button btn-third agreement-suggestion__item">Music sheet</a>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div class="hidden" id="agreement-suggestion__no-result">
        <p>No songs match this chord progression</p>
      </div>
      <section>
        <div v-if="!statusLogged" class="agreement-suggestion__connexion">
          <login></login>
          <register></register>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import Player from "@/components/Player";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    Player,
    Login,
    Register
  },
  data() {
    return {
      key_selected: "",
      selectFirstChords: [],
      selectSecondChords: [],
      selectThirstChords: [],
      firstChord: "",
      secondChord: "",
      thirstChord: "",
      array_thirst: [],
      keysArray: [],
      chordsArray: [],
      firstChordsOptions: [],
      secondChordsOptions: [],
      thirstChordsOptions: [],
      songsSelection: [],
      arraySongs: [Object]
    };
  },
  methods: {
    // Conversion numerals/integers
    romanToInteger: function (str1) {
      const char_to_int = (c) => {
        switch (c) {
          case "I":
            return 1;
          case "ii":
            return 2;
          case "iii":
            return 3;
          case "IV":
            return 4;
          case "V":
            return 5;
          case "vi":
            return 6;
          case "vii":
            return 7;
          default:
            return -1;
        }
      };
      if (str1 == null) return -1;
      const num = char_to_int(str1);
      return num;
    },
    integerToRoman: function (str1) {
      const char_to_int = (c) => {
        switch (c) {
          case "1":
            return 'I';
          case "22":
            return 'ii';
          case "3":
            return 'iii';
          case "4":
            return 'IV';
          case "5":
            return 'V';
          case "6":
            return 'vi';
          case "7":
            return 'vii';
          default:
            return -1;
        }
      };
      if (str1 == null) return -1;
      const num = char_to_int(str1);
      return num;
    },
    checkSelect: function() {
      const selectKey = document.querySelector('#key_selected');
      const infosKey = document.querySelector('#key-informations');

      const selectFirst = document.querySelector('#first-code-select');
      const infosChords = document.querySelector('#chords-informations');

      const selectSecond = document.querySelector('#second-code-select');
      const infosChordsBis = document.querySelector('#chords-informations-bis');

      const selects = [selectKey, selectFirst];

      let isValidSelect;

      function displayInfos(infos) {
        isValidSelect ? infos.hidden = true : infos.hidden = false;
      }

      for (const select of selects) {
        switch (select.getAttribute('id')) {
          case 'key_selected':
            isValidSelect = selectKey.checkValidity();
            displayInfos(infosKey);
            break;

          case 'first-code-select':
            isValidSelect = selectFirst.checkValidity();
            displayInfos(infosChords);
            break;
            
          case 'second-code-select':
            isValidSelect = selectSecond.checkValidity();
            displayInfos(infosChordsBis);
            break;
        }
      }
    },
        // Choice key define first chords
    async choiceKey() {
      this.selectFirstChords = [];
      this.selectSecondChords = [];
      this.selectThirstChords = [];
      this.firstChord = "";
      this.secondChord = "";
      this.thirstChord = "";
      this.arraySongs = [];

      document.querySelector('#agreement-suggestion').classList.add('hidden');


      this.keyChords = this.keysArray.find(
        (item) => item.key === this.key_selected
      );

      for (const item of this.keyChords.chords) {
        for (const chord of item.array) {
          this.selectFirstChords.push({ roman: item.roman, chord: chord });
        }
      }
    },
    // Second chords
    async secondChords() {
      try {
        const response = await axios.get(
          "http://localhost:9966/suggest_chord/?chord=" + this.firstChord
        );
        // Success 🎉
        const arrayChords = response.data;

        arrayChords.forEach((item) => {
          if (
            item.chord_HTML === "I" ||
            item.chord_HTML === "ii" ||
            item.chord_HTML === "iii" ||
            item.chord_HTML === "V" ||
            item.chord_HTML === "vi" ||
            item.chord_HTML === "vii°"
          ) {
            const chord = this.keyChords.chords.find(
              (chord) => chord.roman === item.chord_HTML
            );
            chord.array.forEach((element) =>
              this.secondChordsOptions.push({
                value: item.chord_ID,
                chord: element,
                probability: item.probability,
              })
            );
          }
        });
      } catch (error) {
        console.log(this.error);
      }
    },
    // Thirst chord
    async ThirstChords() {
      try {
        const response = await axios.get(
          "http://localhost:9966/suggest_chord/?chord=" +
            this.firstChord +
            "," +
            this.secondChord
        );
        // Success 🎉
        const arrayChords = response.data;

        arrayChords.forEach((item) => {
          if (
            item.chord_HTML === "I" ||
            item.chord_HTML === "ii" ||
            item.chord_HTML === "iii" ||
            item.chord_HTML === "V" ||
            item.chord_HTML === "vi" ||
            item.chord_HTML === "vii°"
          ) {
            const chord = this.keyChords.chords.find(
              (chord) => chord.roman === item.chord_HTML
            );
            chord.array.forEach((element) =>
              this.thirstChordsOptions.push({
                value: item.chord_ID,
                chord: element,
                probability: item.probability,
              })
            );
          }
        });
      } catch (error) {
        console.log(this.error);
      }
    },
    // Songs with chords selected
    async songs() {
      // Check validity select
      this.checkSelect();
      try {
        let response = "";
        if (!this.thirstChord === "") {
          response = await axios.get("http://localhost:9966/suggest_song/?song=" +
            this.secondChord +
            "," +
            this.thirstChord 
          );
        } else {
          response = await axios.get("http://localhost:9966/suggest_song/?song=" +
            this.firstChord +
            "," +
            this.secondChord 
          );
        }

        // Success 🎉
        const arraySongs = response.data;
        if (arraySongs.length === 0) {
          const songContainer = document.querySelector('.agreement-suggestion__list-hook');
          songContainer.innerHTML = '<p>No song for this chord sequence</p>'
        }
        const uniqueSongs = [...new Set(arraySongs)];
        this.arraySongs = uniqueSongs;
        if (arraySongs !== 'No songs match this chord progressionnull') {
          document.querySelector('#agreement-suggestion').classList.remove('hidden');
          document.querySelector('#agreement-suggestion__no-result').classList.add('hidden');
        } else {
          document.querySelector('#agreement-suggestion__no-result').classList.remove('hidden');
        }

        this.key_selected = '';
        this.firstChord = '';
        this.secondChord = '';
        this.thirstChord = '';

      } catch (error) {
        console.log(this.error);
      }
    },
    // Register / Login
    displayRegister() {
      document.querySelector('#register').classList.remove('hidden');
      document.querySelector('#login').classList.add('hidden');
      document.querySelector('.agreement-suggestion__connexion-information').classList.add('hidden');
    },
  },
  computed: {
    ...mapState(['user', 'statusLogged'])
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:9966/api/chord");
      // Success 🎉
      const arrayKeys = response.data;
      for (const item of arrayKeys.data) {
        this.keysArray.push(item);
      }
    } catch (error) {
      console.log(this.error);
    }
  }
};
</script>

<style lang="scss">
section {
  margin-bottom: 40px;
}

#chords-suggestion-form {
  margin-bottom: 20px;
}

.agreement-suggestion__content {
  .field {
    display: inline-block;
    padding: 20px;
  }
}

.agreement-suggestion__list-hook {
  & > ul > li {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;

    & > div {
      min-width: 50%;
      width: 50%;
    }
  }
}

.agreement-suggestion__connexion {
  max-width: 400px;
  padding: 10px 20px;
  margin: auto;
  border: 2px solid;
}

@media screen and (min-width:768px) {
  .agreement-suggestion__content {
    & > div:first-child {
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      align-items: center;
    }

    select {
      margin: 0 20px 20px;
    }
  }

  .agreement-suggestion__list-hook {
    margin: auto;
    max-width: 800px;
  }
}
</style>
