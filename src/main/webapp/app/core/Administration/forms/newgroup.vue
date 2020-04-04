<template>
  <b-modal
    id="new-group"
    ref="new-group"
    hide-footer
    hide-header-close
    centered
    no-close-on-backdrop
  >
    <b-form @submit="onSubmit">
    <div class="container p-0">
      <div class="row m-0">
        <div class="col-10 py-2 d-flex align-items-center blueBG">
          <h3 class="font-weight-bold m-0 p-0 text-left white">New group</h3>
        </div>
        <div class="col-2 py-2 d-flex justify-content-end blueBG">
          <font-awesome-icon style="width: 25px; height: 25px; color: white;" icon="times" />
        </div>
      </div>

      <div class="row my-3 m-0">

          <div class="col-6">
            <div class="row m-0">
                <div class="col-5 p-0 m-0 d-flex justify-content-end align-items-center">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Group code:</p>
                </div>
                <div class="col-6 p-0 m-0 pr-2">
                    <b-form-input required type="text" v-model="classGroupDTO.groupCode" class="forms-input" id="form-groupcode"></b-form-input>
                </div>
            </div>
          </div>

          <div class="col-6">
              <div class="row m-0">
                <div class="col-6 p-0 m-0 d-flex justify-content-end align-items-center">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Classroom:</p>
                    </div>
                    <div class="col-6 p-0 m-0 pr-2">
                    <b-form-input required type="text" v-model="classGroupDTO.classRoom" class="forms-input" id="form-classroom"></b-form-input>
                </div>
              </div>
          </div>
        
      </div>

      <div class="row my-3 m-0">

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 blue">Time:</p>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 gray">Start</p>
        </div>

        <div class="col py-1">
          <b-form-input type="time" v-model="scheduleOne.startHour" required class="forms-input" id="form-s1-starthour"></b-form-input>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 gray">End</p>
        </div>

        <div class="col py-1">
          <b-form-input type="time" v-model="scheduleOne.endHour" required class="forms-input" id="form-s1-endhour"></b-form-input>
        </div>

        <div class="col-2 p-0">
          <p class="font-weight-bold text-right pr-1 m-0 gray">all weekdays</p>
        </div>

        <div class="col-2">
          <b-form-checkbox v-model="checked" name="check-button" switch/>
        </div>
        
      </div>

      <div v-if="!checked">
      <div class="row my-3 m-0">

          <div class="col-12">
            <p class="font-weight-bold text-left pr-2 m-0 blue">Weekdays:</p>
          </div>

          <div class="col-12">
            <b-form-checkbox-group
              id="weekdays"
              v-model="selected"
              :options="weekdays"
              name="flavors"
              class="ml-4"
              aria-label="Individual flavours"
            ></b-form-checkbox-group>
          </div>
        
      </div>

      <!-- added shift -->
      <div  v-for="(shift, index) in shifts" :key="index">
      <div class="row my-3 m-0">

        <div class="col-12">
          <p class="font-weight-bold text-left pr-2 m-0 gray">Second shift</p>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 blue">Time:</p>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 gray">Start</p>
        </div>

        <div class="col-2 py-1">
          <b-form-input type="time" required v-model="scheduleTwo.startHour" class="forms-input" id="form-s2-startHour"></b-form-input>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 gray">End</p>
        </div>

        <div class="col-2 py-1">
          <b-form-input type="time" required v-model="scheduleTwo.endHour" class="forms-input" id="form-s2-endHour"></b-form-input>
        </div>
        
      </div>
      <div class="row my-3 m-0">

          <div class="col-12">
            <p class="font-weight-bold text-left pr-2 m-0 blue">Weekdays:</p>
          </div>

          <div class="col-12">
            <b-form-checkbox-group
              id="weekdays"
              v-model="selectedDifference"
              :options="weekdays"
              name="flavors"
              class="ml-4"
              aria-label="Individual weekdays"
            ></b-form-checkbox-group>
          </div>
        
      </div>
      </div>

      <div class="row mx-2 d-flex justify-content-end" v-if="shifts == 0">

          <div class="col-2">
            <div class="addButton" style="position: relative;" @click="addShift()">
                <font-awesome-icon
                    style="width: 20px; height: 20px; color: #1071A3; position: absolute; left: 20.83%; right: 20.83%; top: 20.83%; bottom: 20.83%;"
                    icon="plus"
                />
            </div>
          </div>
        
      </div>
      </div>

      <div class="row my-3 m-0">

          <div class="col-12">
            <div class="row m-0">
                <div class="col-2 p-0 m-0 d-flex justify-content-end align-items-center">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Teacher:</p>
                </div>
                <div class="col-10 p-0 m-0 pr-2">
                  <b-form-select
                  v-if="teacherListLoaded"
                    id="form-teacher"
                    class="forms-combo-input p-0 w-100"
                    v-model="teacherId"
                    :options="teachers"
                    value-field="value"
                    text-field="text"
                    required
                  ></b-form-select>
                </div>
            </div>
          </div>
        
      </div>

      <div class="row my-3 m-0">

          <div class="col-12">

            <div class="row m-0 box">

                <div class="col-12 p-0">
                  <b-tabs v-if="studentListLoaded" id="tabs-estudiantes" content-class="m-0">

                  <b-tab title="Search by student" active>
                    <div class="col-12 p-0 m-0">
                      <b-form-input size="lg" type="search" class="forms-input" list="student-list" v-model="newStudent" placeholder="Select student"></b-form-input>

                      <b-form-datalist id="student-list">
                        <option v-for="(student, index) in students" :key="index">{{student.text}}</option>
                      </b-form-datalist>
                    </div>
                  </b-tab>

                  <b-tab title="Assign to group">
                    <div class="col-12 p-0 m-0">
                      <b-form-input size="lg" class="forms-input" list="group-list" placeholder="Select group"></b-form-input>

                      <!-- <b-form-datalist id="student-group" :options="weekdays" value-field="value" text-field="text"></b-form-datalist> -->
                    </div>
                  </b-tab>

                  </b-tabs>
                </div>

            </div>

            <div class="row m-0 closing-box">

                <div class="col-12">
                  <p class="font-weight-bold m-0 text-center blue"> Students registered for the group </p>
                </div>
              
                <div class="col-12">
                  <div v-for="(selectedStudent, index) in studentsGroup" :key="index">
                    <p class="blue"> {{selectedStudent}} </p>
                  </div>
                </div>

            </div>

          </div>
        
      </div>

      <!-- save button  -->
      <div class="row w-100 my-3 m-0">
        <div class="col-12 py-2 d-flex justify-content-end">
          <b-button id="save-newGroup" type="submit" variant="primary">Save</b-button>
        </div>
      </div>
    </div>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'newgroup',
  props: {
    subId: Number
  },
  data() {
    return {
        classGroupDTO: {
          "classRoom": '',
          "groupCode": '',
        },
        "scheduleOne": {
            "endHour": '',
            "startHour": ''
        },
        "scheduleTwo": {
            "endHour": '',
            "startHour": ''
        },
        "subjectId": this.subId,
        "teacherId": null,
        checked: true,
        weekdays: [
          { text: 'Monday', value: 1 },
          { text: 'Tuesday', value: 2 },
          { text: 'Wednesday', value: 4 },
          { text: 'Thursday', value: 8 },
          { text: 'Friday', value: 16 },
          { text: 'Saturday', value: 32 }
        ],
        selected: [],
        selectedDifference: [],
        shifts: 0,
        teachers: [],
        students: [],
        studentsGroup: [],
        studentsId: [],
        newStudent: ''
    };
  },
  created() {
        this.$store.dispatch('getAdministrationTeacherDashboard');
        this.$store.dispatch('getAdministrationStudentDashboard');
  },
  computed: {
    ...mapGetters([
      'teacherList',
      'teacherListLoaded',
      'studentList',
      'studentListLoaded'
    ])
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()

      this.classGroupDTO.size = this.studentsId.length;
      var classGroupData = JSON.stringify(this.classGroupDTO);

      if (this.checked == true) {
        this.scheduleOne.weekDays = 31
      } else {
        this.scheduleOne.weekDays = _.sum(this.selected);
        this.scheduleTwo.weekDays = _.sum(this.selectedDifference);
      }

      var scheduleData;
      if (this.shifts > 0) {
        scheduleData = JSON.stringify(this.scheduleOne) + ',' + JSON.stringify(this.scheduleTwo); 
      } else {
        scheduleData = JSON.stringify(this.scheduleOne);
      }

      var newGroup = `{
        "classGroupDTO" : ${classGroupData},
        "classScheduleDTOS" : [ ${scheduleData} ],
        "studentsIds" : [ ${this.studentsId} ],
        "subjectId": ${this.subjectId},
        "teacherId": ${this.teacherId}
      }`;

      console.log(newGroup);

      this.$store.dispatch('createGroup', { "groupObject": newGroup, "subjectId": this.subjectId });
      this.reset();

      this.$root.$emit('bv::hide::modal', 'new-group', '#showNewGroup');
    },
    reset: function() {
        this.teacherId = null
        this.selected = []
        this.selectedDifference = []
        this.shifts = 0
        this.teachers = []
        this.students = []
        this.studentsGroup = []
        this.studentsId = []
        this.newStudent = ''
        this.classGroupDTO.classRoom = ''
        this.classGroupDTO.groupCode = ''
        this.scheduleOne.endHour = ''
        this.scheduleOne.startHour = ''
        this.scheduleTwo.endHour = ''
        this.scheduleTwo.startHour = ''
    },
    addShift: function() {
      this.shifts += 1;
    },
    addStudent: function(student) {
      this.studentsGroup.push(student);
    }
  },
  watch: {
    selected() {
      this.selectedDifference = _.difference([1, 2, 4, 8, 16, 32], this.selected);
    },
    newStudent() {
      const name = this.newStudent;
      const toAdd = _.find(this.students, function(o) { return o.text == name; });
      if(toAdd !== undefined) {
        this.studentsGroup.push(toAdd.text);
        this.studentsId.push(toAdd.value);
      }
    },
    teacherList() {
      for (let index = 0; index < this.teacherList.length; index++) {
        this.teachers.push({ text: this.teacherList[index].personDTO.firstName + ' ' + this.teacherList[index].personDTO.lastName, value: this.teacherList[index].teacherDto.id })
      }
    },
    studentList() {
      for (let index = 0; index < this.studentList.length; index++) {
        this.students.push({ text: this.studentList[index].personDTO.firstName + ' ' + this.studentList[index].personDTO.lastName, value: this.studentList[index].studentDTO.id })
      }
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

.circle {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.addButton {
    border: 1px solid #1071A3;
    border-radius: 50%;
    width: 35px;
    height: 35px;
}

.box {
  border-top: 1px solid #1071A3; 
  border-left: 1px solid #1071A3;
  border-right: 1px solid #1071A3;
  border-radius: 5px 5px 0px 0px;
}

.closing-box {
  border-bottom: 1px solid #1071A3; 
  border-left: 1px solid #1071A3;
  border-right: 1px solid #1071A3;
  border-radius: 0px 0px 5px 5px;
}
</style>