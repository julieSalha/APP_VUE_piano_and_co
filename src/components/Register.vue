<template>
  <div>
    <div id="register" class="hidden">
      <form action="#" method="" id="registerFormUser" class="register-form" @submit.prevent="register">
        <h2>Register</h2>
        <div>
          <p>
            <label for="userGname">First Name / Given name *</label>
          </p>
          <p>
            <input id="userGname" type="text" name="userGname" required minlength="3" placeholder="Your name" v-model="name" @keyup="checkInput($event)">
          </p>
          <p><span id='register-gname-infos' hidden>Please enter a valid first name.</span></p>
        </div>
        <div>
          <p>
            <label for="userLname">Last Name </label>
          </p>
          <p>
            <input id="userLname" type="text" name="userLname" minlength="2" placeholder="Your last name" v-model="lastname" @keyup="checkInput($event)">
          </p>
          <p><span id='register-lname-infos' hidden>Please enter a valid last name.</span></p>
        </div>
        <div>
          <p>
            <label class="block-forms__description">Gender *</label>
          </p>
          <div>
            <input type="radio" id="userMale" name="gender" value="male" v-model="gender">
            <label for="userMale">Male</label>
          </div>
          <div>
            <input type="radio" id="userFemale" name="gender" value="female" v-model="gender">
            <label for="userFemale">Female</label>
          </div>
          <div>
            <input type="radio" id="userOther" name="gender" value="other" v-model="gender">
            <label for="userOther">Other</label>
          </div>
        </div>
        <div>
          <p>
            <label for="userBirthday">Date of birth:</label>
          </p>
          <p>
            <input type="date" id="userBirthday" name="userBirthday" v-model="birthday">
          </p>
        </div>
        <div v-if="!profile_picture">
          <label for="userPicture">Select image to upload: *</label>
          <input type="file" @change="onFileChange" name="userPicture" id="userPicture" accept=".png, .jpg, .jpeg" required>
        </div>
        <div v-else class="userpicture__display">
          <p>Picture uploaded:</p>
          <img :src="profile_picture"/>
          <button @click="removeImage">Remove image</button>
        </div>
        <div>
          <p>
            <label for="userAdress">Adress (Country, town)</label>
          </p>
          <p>
            <input id="userAdress" type="text" name="userAdress" minlength="5" placeholder="Your adress" v-model="adress" @keyup="checkInput($event)">
          </p>
          <p><span id='register-adress-infos' hidden>Please enter a valid adress.</span></p>
        </div>
        <div>
          <p>
            <label for="userBiography">Your biography:</label>
          </p>
          <p>
            <textarea id="userBiography" name="userBiography" rows="4" cols="50" placeholder="Your biography" v-model="biography"></textarea>
          </p>
        </div>
        <div>
          <p>
            <label for="userPassword">Password: *</label>
          </p>
          <p>
            <input type="password" id="userPassword" minlength="4" name="userPassword" required v-model="password" @keyup="checkInput($event)">
          </p>
          <p><span id='register-password-infos' hidden>Please enter a valid adress.</span></p>
        </div>
        <div>
          <p>
            <label for="userEmail">Enter your email: *</label>
          </p>
          <p>
            <input type="email" id="userEmail" name="userEmail" v-model="email" @keyup="checkInput($event)">
          </p>
          <p><span id='register-email-infos' hidden>Please enter a valid email.</span></p>
        </div>
        <button class="button btn-third" type="submit">Register</button>
    </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      lastname: "",
      gender: "",
      birthday: "",
      profile_picture: "",
      adress: "",
      biography: "",
      error: null,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    checkInput: function(event) {
      const inputGname = document.querySelector('#userGname');
      const infosGname = document.querySelector('#register-gname-infos');

      const inputLname = document.querySelector('#userLname');
      const infosLname = document.querySelector('#register-lname-infos');

      const inputAdress = document.querySelector('#userAdress');
      const infosAdress = document.querySelector('#register-adress-infos');

      const inputPassword = document.querySelector('#userPassword');
      const infosPassword = document.querySelector('#register-password-infos');

      const inputEmail = document.querySelector('#userEmail');
      const infosEmail = document.querySelector('#register-email-infos');

      let isValidInput;

      function displayInfos(infos) {
          isValidInput ? infos.hidden = true : infos.hidden = false;
        }

      switch (event.target) {
        case inputGname:
          isValidInput = inputGname.checkValidity();
          displayInfos(infosGname);
          break;

        case inputLname:
          isValidInput = inputLname.checkValidity();
          displayInfos(infosLname);
          break;

        case inputAdress:
          isValidInput = inputAdress.checkValidity();
          displayInfos(infosAdress);
          break;

        case inputPassword:
          isValidInput = inputPassword.checkValidity();
          displayInfos(infosPassword);
          break;

        case inputEmail:
          isValidInput = inputEmail.checkValidity();
          displayInfos(infosEmail);
          break;
      }
    },
    resizeImage(base64Str, maxWidth = 400, maxHeight = 400) {
      return new Promise((resolve) => {
      const img = new Image()
      img.src = base64Str
      img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = maxWidth
          const MAX_HEIGHT = maxHeight
          let width = img.width
          let height = img.height

          if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
          }
          } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height
              height = MAX_HEIGHT
          }
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          resolve(this.profile_picture = canvas.toDataURL());
        }
      })
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      //this.cover = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        this.cover = this.resizeImage(e.target.result);
      };
      console.log('this.profile_picture',this.profile_picture);
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.profile_picture = '';
    },
    register: function() {
      const data = {
        givenName : this.name, 
        familyName : this.lastname,
        gender: this.gender,
        date_of_birth: this.birthday,
        profile_picture: this.profile_picture,
        adress: this.adress ,
        biography: this.biography,
        password: this.password,
        email: this.email
      }
      document.querySelector('#login').classList.remove('hidden');
      document.querySelector('#register').classList.add('hidden');
      this.$store.dispatch('registerUser', data)
  }
  },
};
</script>

<style>
#register {
  max-width: 50%;
  margin: 30px auto;
}
</style>