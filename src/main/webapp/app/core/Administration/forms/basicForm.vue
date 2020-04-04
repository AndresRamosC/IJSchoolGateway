<template>
  <b-form @submit.prevent="$emit('onSubmit', personDTO, contactDTO)">
    <div class="row m-0">
      <div class="col-10 py-2 d-flex align-items-center blueBG">
        <h3 class="font-weight-bold m-0 p-0 text-left white"> {{title}} </h3>
      </div>
      <div class="col-2 py-2 d-flex justify-content-end blueBG">
        <font-awesome-icon style="width: 25px; height: 25px; color: white;" icon="times" />
      </div>
    </div>
    <!-- photo and person data -->
    <div class="row mx-2 mt-4">
      <!-- photo holder -->
      <div class="col-6 d-flex justify-content-center">
        <label>
          <div
            class="d-flex align-items-center justify-content-center"
            style="background: #FFFFFF; width: 200px; height: 200px; border: 5px solid #1071A3; borderRadius: 50%;"
          >
            <font-awesome-icon
              v-if="file == null"
              style="width: 77%; height: 74%; color: #1071A3;"
              icon="user-plus"
            />
            <img v-if="file != null" class="circle-img p-0" :src="photoB64" />
          </div>
          <b-form-file
            name="photo"
            accept=".jpg, .png"
            v-model="file"
            class="mt-3"
            plain
            style="display: none;"
            required
          ></b-form-file>
        </label>
      </div>
      <!-- photo holder end -->

      <div class="col-6 p-0">
        <div class="row my-3 m-0">
          <div class="col-5 p-0 m-0">
            <p class="font-weight-bold text-right pr-2 m-0 blue">First name:</p>
          </div>
          <div class="col-7 p-0 m-0 pr-2">
            <b-form-input
              required
              v-model="personDTO.firstName"
              class="forms-input"
              id="form-firstname"
            ></b-form-input>
          </div>
        </div>

        <div class="row my-3 m-0">
          <div class="col-5 p-0 m-0">
            <p class="font-weight-bold text-right pr-2 m-0 blue">Last name:</p>
          </div>
          <div class="col-7 p-0 m-0 pr-2">
            <b-form-input
              required
              v-model="personDTO.lastName"
              class="forms-input"
              id="form-lastname"
            ></b-form-input>
          </div>
        </div>

        <div class="row my-3 m-0">
          <div class="col-5 p-0 m-0">
            <p class="font-weight-bold text-right pr-2 m-0 blue">Gender:</p>
          </div>
          <div class="col-7 p-0 pr-2 m-0">
            <b-form-select
              id="form-gender"
              class="forms-combo-input p-0 w-100"
              v-model="personDTO.gender"
              :options="genders"
              value-field="item"
              text-field="name"
              required
            ></b-form-select>
          </div>
        </div>

        <div class="row my-3 m-0">
          <div class="col-5 p-0 m-0">
            <p class="font-weight-bold text-right pr-2 m-0 blue">Birth date:</p>
          </div>
          <div class="col-7 p-0 m-0 pr-2">
            <b-form-input
              required
              type="date"
              v-model="personDTO.dateOfBirth"
              class="forms-input"
              id="form-birthdate"
            ></b-form-input>
          </div>
        </div>

        <div class="row my-3 m-0">
          <div class="col-5 p-0 m-0">
            <p class="font-weight-bold text-right pr-2 m-0 blue">Blood type:</p>
          </div>
          <div class="col-7 p-0 m-0 pr-2">
            <b-form-select
              id="form-bloodGroup"
              class="forms-combo-input p-0 w-100"
              v-model="personDTO.bloodGroup"
              :options="types"
              value-field="name"
              text-field="item"
              required
            ></b-form-select>
          </div>
        </div>
      </div>
    </div>
    <!-- photo and person data end -->

    <!-- contact info -->
    <div class="row mx-2">
      <div class="row w-100 mt-3 m-0">
        <div class="col-7 p-0">
          <div class="row m-0">
            <div class="col-3 p-0 m-0">
              <p class="font-weight-bold text-right pr-2 m-0 blue">Address:</p>
            </div>
            <div class="col-9 p-0 m-0">
              <b-form-input
                required
                v-model="contactDTO.address"
                class="forms-input"
                id="form-address"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="col-5 p-0">
          <div class="row m-0">
            <div class="col-5 p-0 m-0">
              <p class="font-weight-bold text-right pr-2 m-0 blue">Zip code:</p>
            </div>
            <div class="col-7 p-0 m-0 pr-2">
              <b-form-input
                required
                type="number"
                number
                v-model="contactDTO.zipCode"
                class="forms-input"
                id="form-zipcode"
              ></b-form-input>
            </div>
          </div>
        </div>
      </div>

      <div class="row w-100 mt-3 m-0">
        <div class="col-6 p-0">
          <div class="row m-0">
            <div class="col-3 p-0 m-0">
              <p class="font-weight-bold text-right pr-2 m-0 blue">State:</p>
            </div>
            <div class="col-9 p-0 m-0 pr-2">
              <b-form-select
                id="form-state"
                class="forms-combo-input p-0 w-100"
                v-model="contactDTO.state"
                :options="states"
                required
              ></b-form-select>
            </div>
          </div>
        </div>

        <div class="col-6 p-0">
          <div class="row m-0">
            <div class="col-3 p-0 m-0">
              <p class="font-weight-bold text-right pr-2 m-0 blue">City:</p>
            </div>
            <div class="col-9 p-0 pr-2 m-0">
              <b-form-select
                id="form-city"
                class="forms-combo-input p-0 w-100"
                v-model="contactDTO.city"
                :options="cities"
                required
                :disabled="contactDTO.state ==  null"
              ></b-form-select>
            </div>
          </div>
        </div>
      </div>

      <div class="row w-100 my-3 m-0">
        <div class="col-6 p-0">
          <div class="row m-0">
            <div class="col-3 p-0 m-0">
              <p class="font-weight-bold text-right pr-2 m-0 blue">Phone:</p>
            </div>
            <div class="col-9 p-0 m-0">
              <b-form-input
                type="tel"
                v-model="contactDTO.phoneNumber"
                required
                class="forms-input"
                id="form-phone"
              ></b-form-input>
            </div>
          </div>
        </div>
        <div class="col-6 p-0">
          <div class="row m-0">
            <div class="col-3 p-0 m-0">
              <p class="font-weight-bold text-right pr-2 m-0 blue">E-mail:</p>
            </div>
            <div class="col-9 p-0 m-0 pr-2">
              <b-form-input
                type="email"
                v-model="contactDTO.eMail"
                debounce="500"
                :state="!userDuplicated"
                required
                class="forms-input"
                id="form-email"
              ></b-form-input>
              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-check-username">e-mail already registered</b-form-invalid-feedback>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- contact info end -->

    <!-- page content -->
    <slot name="content"></slot>

    <div class="row mx-2">
      <!-- save button  -->
      <div class="row w-100 my-3 m-0">
        <div class="col-12 py-2 d-flex justify-content-end">
          <b-button id="save-newTeacher" type="submit" variant="primary">Save</b-button>
        </div>
      </div>
    </div>
  </b-form>
</template>

<script>
import axios, { AxiosPromise } from 'axios';
import { parseJSON } from 'date-fns';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'basicForm',
  props: {
    title: String
  },
  data() {
    return {
      personDTO: {
        photograph: null,
        photographContentType: '',
        firstName: '',
        lastName: '',
        gender: null,
        dateOfBirth: '',
        bloodGroup: null,
        // keycloakUserId: null
      },
      contactDTO: {
        address: '',
        zipCode: null,
        city: null,
        state: null,
        phoneNumber: '',
        eMail: ''
      },
      types: [
        { item: 'A+', name: 'APLUS' },
        { item: 'A-', name: 'AMINUS' },
        { item: 'B+', name: 'BPLUS' },
        { item: 'B-', name: 'BMINUS' },
        { item: 'O+', name: 'OPLUS' },
        { item: 'O-', name: 'OMINUS' },
        { item: 'AB+', name: 'ABPLUS' },
        { item: 'AB-', name: 'ABMINUS' }
      ],
      genders: [{ item: 'MALE', name: 'Male' }, { item: 'FEMALE', name: 'Female' }],
      mexico: '',
      states: [],
      cities: [],
      file: null,
      photoB64: null
    };
  },
  created() {
    axios.get('../../content/data/mexico.json').then(response => ((this.mexico = response.data), (this.states = _.keys(response.data))));
  },
  methods: {
    fileToBase64: function() {
      return new Promise(resolve => {
        var reader = new FileReader();
        // Read file content on file loaded event
        reader.onload = function(event) {
          resolve(event.target.result);
        };

        // Convert data to base64
        reader.readAsDataURL(this.file);
      });
    }
  },
  computed: {
    ...mapGetters(['userDuplicated'])
  },
  watch: {
    'contactDTO.state'() {
      this.cities = this.mexico[this.contactDTO.state.toString()];
    },
    'contactDTO.eMail'() {
      this.$store.dispatch('verifyUser', this.contactDTO.eMail);
    },
    file() {
      this.personDTO.photographContentType = this.file.type;
      this.fileToBase64().then(result => {
        this.personDTO.photograph = _.split(result, ',')[1];
        this.photoB64 = result;
      });
    }
  }
};
</script>

<style scoped>
.divider {
  border: 1px solid #1071a3;
  margin-bottom: 0.5rem;
}

.blueBG {
  background-color: #1071a3;
}

.combo-box {
  background: #ffffff;
  border-bottom: 1px solid #1071a3;
  box-sizing: border-box;
}

.circle-img {
  width: 194px !important;
  height: 194px !important;
  border-radius: 50%;
}
</style>