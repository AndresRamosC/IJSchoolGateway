<template>
  <div class="container-fluid p-0 justify-content-center" id="schedule">
    <div class="sticky-top">
      <header-arrow headerTitle="Course overview" class="blueBG">
        <template v-slot:content>
                    <div class="row m-0">
            <div class="col-8">
                <b-dropdown id="dropdown-1" class="p-2" toggle-class="text-decoration-none" :no-caret="true" >
                    <template v-slot:button-content>
                        <div class="row">
                            <p class="m-0 pr-2" v-if="!allLoaded">{{findStudentSubjectById(getStudentSelectedCourse).courseName}}</p>
                            <p class="m-0 pr-2" v-if="allLoaded">All</p>
                            <font-awesome-icon class="white" style="width: 20px; height: 20px;" icon="chevron-down"/>
                        </div>
                    </template>
                    <b-dropdown-item v-for="(course, index) in getStudentSubjects" :key="index" @click="updateCourse(course.classGroupId)">
                        {{course.courseName}} 
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item
                    @click="loadAllAssignments">
                        All
                    </b-dropdown-item>
                </b-dropdown>
            </div>        

            <div class="col-3">
                <p class="pt-2 white" v-if="!allLoaded">{{findStudentSubjectById(getStudentSelectedCourse).groupCode}}</p>
                <p class="pt-2 white" v-if="allLoaded">All</p>
            </div>
        </div>
        </template>
      </header-arrow>
          <!-- buttons navigation between schedules -->
          <div class="row m-0 pl-2 pr-2 whiteBG btncontainer">
            <!-- attendance button -->
            <div class="pl-2 pr-1">
              <router-link to="/student-course-overview/attendance" replace>
                <button :class="attendance" role="button" aria-pressed="true">Attendance</button>
              </router-link>
            </div>
            <!-- assignments button  -->
            <div class="pl-2 pr-1">
              <router-link to="/student-course-overview/assignments" replace>
                <button :class="assignments" role="button" aria-pressed="false">Assignments</button>
              </router-link>
            </div>
            <!-- grades button  -->
            <div class="pl-2 pr-1">
              <router-link to="/student-course-overview/grades" replace>
                <button :class="grades" role="button" aria-pressed="false">Grades</button>
              </router-link>
            </div>
          </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import HeaderArrow from '../appheaders/arrowheader.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: 'courseoverviewstudent',
    components: {
        HeaderArrow
    },
    methods: {
        thisAttendance: function () {
            if (this.$route.name == "Student Course Overview Attendance") {
                return true;
            }
        },
        thisAssignments: function () {
            if (this.$route.name == "Student Course Overview Assignments" || this.$route.name == "Student Assignment View") {
                return true;
            }
        },
        thisGrades: function () {
            if (this.$route.name == "Student Course Overview Grades") {
                return true;
            }
        },
        updateCourse(course) {
            this.$store.commit('updateAllLoaded', false);
            this.$store.commit('updateStudentSelectedCourse', course);
            let date = moment().format("YYYY-MM-DD");
            this.$store.dispatch('getStudentAttendanceByMonth', { studentId: this.findStudentSubjectById(this.getStudentSelectedCourse).classGroupId, groupId: course, date: date } );
            this.$store.dispatch('getStudentAssignmentsByCourse', { studentId: this.studentData.studentPerson.studentId, groupId: this.findStudentSubjectById(this.getStudentSelectedCourse).classGroupId} );
        },
        loadAllAssignments() {
            this.$store.commit('updatestudentAssignments', []);
            for (let index = 0; index < this.getStudentSubjects.length; index++) {
                this.$store.dispatch('returnStudentAssignmentsByCourse', { studentId: this.studentData.studentPerson.studentId, groupId: this.findStudentSubjectById(this.getStudentSubjects[index].subjectId).classGroupId} );
            }
            this.$store.commit('updateAllLoaded', true);
        }
    },
    computed: {
        ...mapGetters([
            'studentData', 'getStudentSelectedCourse', 'findStudentSubjectById', 'getStudentSubjects', 'studentAssignmentsList', 'allLoaded'
        ]),
        attendance () {
            return this.thisAttendance() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
        },
        assignments () {
            return this.thisAssignments() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
        },
        grades () {
            return this.thisGrades() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
        }
    }
};
</script>

<style scoped>
    .blueBG {
        background-color: #1071A3!important;
    }

    .activeButton {
        background: #1071A3;
        border: 1px solid #1071A3;
        box-sizing: border-box;
        border-radius: 10px;
        color: #FFFFFF;
    }

    .inactiveButton {
        background: #FFFFFF;
        border: 1px solid #1071A3;
        box-sizing: border-box;
        border-radius: 10px;
        color: #1071A3;
    }

    .btncontainer {
        overflow-x: scroll;
    }
</style>