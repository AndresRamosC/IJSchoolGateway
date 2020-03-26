<template>
  <b-modal
    id="new-group"
    ref="new-group"
    hide-footer
    hide-header-close
    centered
    no-close-on-backdrop
  >
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
                    <b-form-input required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
                </div>
            </div>
          </div>

          <div class="col-6">
              <div class="row m-0">
                <div class="col-6 p-0 m-0 d-flex justify-content-end align-items-center">
                    <p class="font-weight-bold text-right pr-2 m-0 blue">Classroom:</p>
                    </div>
                    <div class="col-6 p-0 m-0 pr-2">
                    <b-form-input required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
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
          <b-form-input type="time" required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 gray">End</p>
        </div>

        <div class="col py-1">
          <b-form-input type="time" required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
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
          <b-form-input type="time" required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
        </div>

        <div class="col-1">
          <p class="font-weight-bold text-right pr-1 m-0 gray">End</p>
        </div>

        <div class="col-2 py-1">
          <b-form-input type="time" required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
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
                  <b-form-input class="forms-input" list="teacher-list-id" placeholder="Select teacher"></b-form-input>

                  <datalist id="teacher-list-id">
                    <option v-for="(teacher, index) in teachers" :key="index">{{ teacher }}</option>
                  </datalist>
                </div>
            </div>
          </div>
        
      </div>

      <div class="row my-3 m-0">

          <div class="col-12">
            <div class="row m-0 box">
                <div class="col-12 p-0 m-0 pr-2">
                  <b-form-input size="lg" class="forms-input" list="student-list" v-model="newStudent" placeholder="Select students"></b-form-input>

                   <b-form-datalist id="student-list" :options="students"></b-form-datalist>
                  <!-- <datalist id="student-list-id">
                    <option v-for="(student, index) in students" :key="index">
                      <p @click="console.log('test')"> {{student}} </p>
                    </option>
                  </datalist> -->
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
          <div
            style="background-color: #1071A3; border-radius: 5px;"
            ref="endProcess"
            @click="endProcess()"
          >
            <h3 class="font-weight-bold m-0 p-2 white">Save</h3>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'newgroup',
  data() {
    return {
        startHour: '',
        endHour: '',
        checked: true,
        weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        selected: [],
        selectedDifference: [],
        shifts: 0,
        teachers: ['Teacher 1','Teacher 2','Teacher 3','Teacher 4','Teacher 5'],
        students: ['Student 1','Student 2','Student 3','Student 4','Student 5'],
        studentsGroup: [],
        newStudent: ''
    };
  },
  methods: {
    endProcess: function() {
      this.$root.$emit('bv::hide::modal', 'new-group', '#showNewGroup');
    },
    addShift: function() {
      this.shifts += 1;
    },
    addStudent: function(student) {
      console.log('called')
      this.studentsGroup.push(student);
    }
  },
  watch: {
    selected() {
      this.selectedDifference = _.difference(this.weekdays, this.selected);
    },
    newStudent() {
      if(this.newStudent != '' || this.newStudent != null) {
        console.log('called')
        this.studentsGroup.push(this.newStudent);
        this.newStudent = null
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