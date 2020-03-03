<template>
  <div>
    <div class="sticky-top blueBG">
      <div class="container-fluid p-0 justify-content-center">
        <!-- app header -->
        <div class="row pt-3 pb-0 m-0 mb-1 d-flex justify-content-center blueBG">
          <!-- notifications icon  -->
          <div class="col-2 pb-2 d-flex flex-wrap align-content-center" @click="$router.go(-1)">
            <font-awesome-icon class="white" style="width: 24px; height: 24px;" icon="arrow-left" />
          </div>

          <!-- section title -->
          <div class="col-8 pb-2 p-0 d-flex flex-wrap align-content-start">
            <h1 style="fontSize: 1.5em;" class="font-weight-bold white">Early leave</h1>
          </div>

          <!-- circle photo -->
          <div class="col-2 p-0">
            <div class="d-flex pb-2 justify-content-center circle">
              <img
                class="p-0 img-fluid"
                style="width:40px; height: 40px; borderRadius: 50%;"
                :src="studentPhoto(student)"
              />
            </div>
          </div>

          <!-- container separator  -->
          <div style="zIndex: 1" class="col-12 divider"></div>
        </div>
      </div>
    </div>

    <div class="container-fluid pt-0 p-2 justify-content-center" id="leave">
      <div class="row pt-2 m-0">
        <div class="col-4 p-0">
          <p class="blue text-left m-0">Leave date</p>
        </div>
        <div class="col-6 p-0">
          <p class="gray text-right m-0">{{choosenDate}}</p>
        </div>
        <div class="col-2 p-0 d-flex justify-content-center align-items-center">
          <b-form-datepicker
            id="date-picker-leave"
            size="sm"
            v-model="value"
            :date-disabled-fn="dateDisabled"
            :hide-header="true"
            label-help
            locale="en"
          ></b-form-datepicker>
        </div>
      </div>

      <div class="row pt-2 m-0">
        <div class="col-4 p-0">
          <p class="blue text-left m-0">Leave time</p>
        </div>
        <div class="col-6 p-0">
          <b-form-input class="p-0 h-75 gray text-right" id="time" type="time"></b-form-input>
          <!-- <p class="gray text-right m-0">{{dueTime}}</p> -->
        </div>
        <div class="col-2 p-0 pl-2 d-flex justify-content-start align-items-center">
          <font-awesome-icon class="blue" style="width: 20px; height: 20px;" icon="clock" />
        </div>
      </div>

      <div class="row pt-2 m-0 d-flex justify-content-center">
        <div class="col-12 p-0">
          <p class="blue text-left m-0">Choose leave type</p>
        </div>
        <div class="col-10 p-0">
          <b-dropdown
            id="dropdown-leave"
            class="p-2 w-100"
            toggle-class="text-decoration-none"
            :no-caret="true"
          >
            <template v-slot:button-content :no-caret="true">
              <div class="row leave-box">
                <div class="col-10">
                  <p class="text-left gray m-0 p-2">Select</p>
                </div>
                <div class="col-2 d-flex align-items-center">
                  <font-awesome-icon
                    class="blue"
                    style="width: 20px; height: 20px;"
                    icon="chevron-down"
                  />
                </div>
              </div>
            </template>
            <b-dropdown-item v-for="(reason, index) in reasons" :key="index">
              <p class="text-left gray">{{reason}}</p>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div class="row pt-2 m-0 d-flex justify-content-center">
        <div class="col-12 p-0">
          <p class="blue text-left m-0">Reason</p>
        </div>
        <div class="col-10 p-0">
          <b-form-textarea
            id="textarea-large"
            size="lg"
            placeholder="Description"
            class="leave-box p-1"
          ></b-form-textarea>
        </div>
      </div>

      <div class="row m-0 mt-4 d-flex justify-content-start">
        <div class="col-7 leave-box">
          <div class="row m-0">
            <div class="col-1 p-0 d-flex align-items-center">
              <font-awesome-icon class="blue" style="width: 20px; height: 20px;" icon="paperclip" />
            </div>
            <div class="col-11 p-0">
              <p class="blue text-right m-0">Add attachment</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-0 mt-4 d-flex justify-content-center">
        <div class="col-9 d-flex justify-content-center">
          <button class="activeButton p-1 pl-4 pr-4" role="button" aria-pressed="false" @click="fire()">Apply leave</button>
        </div>
      </div>

      <b-modal ref="modal-students" hide-footer hide-header-close centered>
        <div class="container p-0 w-100">
          <div class="row m-0 d-flex justify-content-center">
            <div class="col-12">
              <p class="font-weight-bold m-0 pb-2 text-center blue">Select students that apply</p>
            </div>
            <!-- container separator  -->
            <div class="col-12 divider"></div>
          </div>

          <b-form-group id="input-students-group">
            <b-form-checkbox-group v-model="form.checked" id="checkboxes-students">
              <div v-for="(student, index) in studentPersons" :key="index">
                <b-form-checkbox :value="index" >{{studentName(index)}}</b-form-checkbox>
                <!-- container separator  -->
                <div class="col-12 divider"></div>
              </div>
            </b-form-checkbox-group>
          </b-form-group>

        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrow.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'earlyleave',
  components: {
    HeaderArrow
  },
  data() {
    const today = moment().format('YYYY-MM-DD');
    const day = moment().format('dddd, MMMM DD');
    const time = moment().format('h:mm a');
    return {
      value: today,
      choosenDate: day,
      dueTime: time,
      reasons: ['Full day', 'Will return'],
      form: {
        checked: []
      },
    };
  },
  methods: {
    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`)
      const weekday = date.getDay();
      const day = date.getDate();
      // Return `true` if the date should be disabled
      return weekday === 0 || weekday === 6;
    },
    fire: function() {
      this.form.checked.push(this.student);
      this.$refs['modal-students'].show();
    }
  },
  computed: {
    ...mapGetters(['studentPhoto', 'student', 'studentPersons', 'studentName', 'student'])
  },
  watch: {
    value: function() {
      let date = moment(this.value).format('YYYY-MM-DD');
      this.choosenDate = moment(this.value).format('dddd, MMMM DD');
    }
  }
};
</script>

<style scoped>
.leave-box {
  background: #ffffff;
  border: 1px solid #1071a3;
  box-sizing: border-box;
  border-radius: 5px;
}

.activeButton {
  background: #1071a3;
  border: 1px solid #1071a3;
  box-sizing: border-box;
  border-radius: 10px;
  color: #ffffff;
}

.blueBG {
  background-color: #1071a3 !important;
}

.circle {
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.25);
}

.divider {
  background: #ffffff;
  border-radius: 100px 100px 0px 0px;
  height: 15px;
}
</style>