<template>
  <div>
    <div class="sticky-top blueBG">
            <header-arrow headerTitle="Attendance">
                <template v-slot:content>
                    <div class="container">
                        <div class="row m-0">
                            <div class="col-6 text-left white">{{findCourseByGroupId(selectedCourse).courseName}}</div>
                            <div class="col-6 text-right white">{{findCourseByGroupId(selectedCourse).groupCode}}</div>
                        </div>
                        <div class="row m-0 d-flex justify-content-center">
                            <div class="col-12 p-0">
                                <div class="col-12 p-0 text-center white">{{dayName}}</div>
                                <div class="col-12 p-0 text-center white">{{day}}</div>
                            </div>
                        </div>
                    </div>
                </template>
            </header-arrow>
    </div>

    <div class="container-fluid pt-0 p-2 justify-content-center" id="leave">

        <div class="row pt-2 m-0">
            <div class="col-12">
                <p class="font-weight-bold blue m-0">New assignment</p>
            </div>
        </div>

        <div class="row pt-2 pb-2 m-0">
            <div class="col-12">
                <b-form-input  v-model="title" required class="p-0 gray text-left" id="form-title" placeholder="Title"></b-form-input>
            </div>
        </div>

      <div class="row pt-2 m-0 d-flex justify-content-center">
        <div class="col-10 p-0">
          <b-form-textarea
            v-model="description"
            id="textarea-large"
            size="lg"
            placeholder="Description"
            class="leave-box p-1"
          ></b-form-textarea>
        </div>
      </div>
    
      <div class="row pt-2 m-0">
        <div class="col-3 p-0">
          <p class="blue text-left m-0">Due date</p>
        </div>
        <div class="col-7 p-0">
          <p class="gray text-right m-0">{{dueDate}}</p>
        </div>
        <div class="col-2 p-0 d-flex justify-content-center align-items-center">
          <b-form-datepicker
            id="teacher-assignment"
            size="sm"
            v-model="value"
            :date-disabled-fn="dateDisabled"
            :hide-header="true"
            label-help
            locale="en"
          ></b-form-datepicker>
        </div>
      </div>

      <div class="row m-0 mt-4 d-flex justify-content-start">
        <div class="col-6 p-0">
           <p class="blue text-left m-0">Due time</p>
        </div>
        <div class="col-6">
            <div class="row pt-2 m-0">
                <div class="col-8 p-0">
                    <b-form-input v-model="dueTime" class="p-0 h-75 gray text-right" id="time" type="time"></b-form-input>
                </div>
                <div class="col-2 p-0 pl-2 d-flex justify-content-start align-items-center">
                    <font-awesome-icon class="blue" style="width: 20px; height: 20px;" icon="clock" />
                </div>
            </div>
        </div>
      </div>

      <div class="row m-0 mt-4 d-flex justify-content-start">
        <label class="leave-box p-1">
          <div class="row m-0">
            <div class="col-1 p-0 d-flex align-items-center">
              <font-awesome-icon class="blue" style="width: 20px; height: 20px;" icon="paperclip" />
            </div>
            <div class="col-11 p-0">
              <p class="blue text-right m-0">Add attachment</p>
            </div>
          </div>
          <b-form-file
            v-model="files"
            class="mt-3"
            plain multiple
            style="display: none;"
          ></b-form-file>
        </label>
        <div class="row m-0 d-flex align-items-center align-content-center">
          <div class="col p-0">
            <p class="text-center align-self-center m-0 blue" v-if="files.length == 0">No documents added</p>
            <p class="text-center align-self-center m-0 blue" v-if="files.length !== 0">{{files.length}} documents added</p>
          </div>
        </div>
      </div>

      <div class="row m-0 mt-4 d-flex justify-content-end">
        <div class="col-9 d-flex justify-content-center">
          <button class="activeButton p-1 pl-4 pr-4" role="button" aria-pressed="false" @click="showModal()">Create assignment</button>
        </div>
      </div>

      <b-modal ref="modal-notvalid" hide-footer hide-header-close centered>
        <div class="container p-0 w-100">
          <div class="row m-0 d-flex justify-content-center">
            <div class="col-12">
              <p class="font-weight-bold m-0 pb-2 text-center blue">Please fill all the inputs</p>
            </div>
            <!-- container separator  -->
            <div class="col-12">
              <div class="row m-0">
                <div class="col-12 d-flex justify-content-end blue" @click="hideNotValidModal()">Ok</div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>

      <b-modal ref="modal-students" hide-footer hide-header-close centered>
        <div class="container p-0 w-100">
          <div class="row m-0 d-flex justify-content-center">
            <div class="col-12">
              <p class="font-weight-bold m-0 pb-2 text-center blue">Are you sure you want to create the class?</p>
            </div>
            <!-- container separator  -->
            <div class="col-12">
              <div class="row m-0">
                <div class="col-6 d-flex justify-content-start blue" @click="hideModal()">No</div>
                <div class="col-6 d-flex justify-content-end blue" @click="fire()">Yes</div>
              </div>
            </div>
          </div>

        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'newassignment',
  components: {
    HeaderArrow
  },
  data() {
    const today = moment().format("YYYY-MM-DD");
    const choosenDate =  moment().format("LL");
    const name = moment().format('dddd');
    const due = moment().format('dddd, MMMM DD');
    const time = moment().format('HH:mm');
    return {
      value: today,
      day: choosenDate,
      dayName: name,
      dueDate: due,
      dueTime: time,
      title: '',
      description: '',
      files: []
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
    showModal: function() {
      if (this.title != '' && this.description != '') {
        this.$refs['modal-students'].show();
      } else {
        this.showNotValidModal();
      }
    },
    hideModal: function() {
      this.$refs['modal-students'].hide();
    },
    showNotValidModal: function() {
      this.$refs['modal-notvalid'].show();
    },
    hideNotValidModal: function() {
      this.$refs['modal-notvalid'].hide();
    },
    fire: function() {
      this.$store.dispatch('createAssignmentWithFiles', 
      { "title" :  this.title,
      "description" :  this.description,
      "dueDate" : moment(this.value).format('YYYY-MM-DD[T]HH:mm:ss-06:00'),
      "classGroupId": this.findCourseByGroupId(this.classGroupList[this.selectedCourse].classGroupId).classGroupId,
      "files": this.files });
    }
  },
  computed: {
    ...mapGetters([
        'teacher',
        'selectedCourse',
        'teacherTodayCourses',
        'studentsList',
        'studentsListLoaded',
        'classGroupList',
        'findCourseByGroupId',
        'newAssignmentId'])
  },
  watch: {
    value: function () {
      this.dueDate = moment(this.value).format('dddd, MMMM DD');
    },
    newAssignmentId: function () {
      console.log(this.newAssignmentId);
      this.$store.dispatch('assignAssignmentToAllGroup',
      { "assignmentId": this.newAssignmentId, "classGroupId":  this.findCourseByGroupId(this.classGroupList[this.selectedCourse].classGroupId).classGroupId } );
      this.hideModal();
      this.$router.go(-1);
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

.btn-file {
    position: relative;
    overflow: hidden;
}
.btn-file input[type="file"] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    color: #1071a3;
    cursor: inherit;
    display: block;
}
</style>