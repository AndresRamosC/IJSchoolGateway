<template>
<div>
    <div class="container-fluid p-0 justify-content-center" id="attendance">

        <div class="row sticky-top m-0 blueBG">
            <header-arrow headerTitle="Attendance">
                <template v-slot:content>
                    <div class="container">
                        <div class="row m-0">
                            <div class="col-6 text-left white">{{findCourseByGroupId(selectedCourse).courseName}}</div>
                            <div class="col-6 text-right white">{{findCourseByGroupId(selectedCourse).groupCode}}</div>
                        </div>
                        <div class="row m-0 d-flex justify-content-center">
                            <div class="col-6 p-0">
                                <div class="col-12 p-0 text-center white">{{dayName}}</div>
                                <div class="col-12 p-0 text-center white">{{day}}</div>
                            </div>
                            <div class="col-6 d-flex jusity-content-center align-content-center">
                                <b-form-datepicker id="teacher-attendance" class="white d-flex justify-content-center" size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
                            </div>
                        </div>
                    </div>
                </template>
            </header-arrow>
        </div>

        <div class="row m-0">
            <div class="col-4 p-0">
                <p class="text-left font-weight-bold pl-2 blue">Class list</p>
            </div>
            <div class="col-8 p-0 d-flex justify-content-center" v-if="(studentsListLoaded && !isNotToday) && !noStudents">
                <button class="greenButton">
                    <div class="container p-0">
                        <div class="row m-0 p-0">
                            <div class="col-1 p-0 pl-1">
                                <font-awesome-icon class="green" style="width: 22px; height: 24px;" icon="check"/>
                            </div>
                            <div class="col-11 p-0 pl-2">
                                <p class="m-0">Full attendance</p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>

        <!-- students list container -->
        <div class="text-center" v-if="!studentsListLoaded">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div class="pt-2" v-if="studentsListLoaded && isNotToday">
            <p class="pl-4 blue">Attendance can be taken only if is today</p>
        </div>
        <div class="pt-2" v-if="studentsListLoaded && !isNotToday">
            <div class="row p-2 m-0" v-for="(student, index) in studentsList" :key="index">
                <student-card
                    :studentId="student.studentId"
                    :name="student.studentName"
                    :attendance="student.onTime"
                    @createAttendance="createAttendance"
                    @createRetard="createAttendance"
                />
            </div>
        </div>

    </div>
</div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import StudentCard from '../studentattendancecard/studentattendancecard.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
    name : "teacherattendance",
    components: {
        HeaderArrow,
        StudentCard
    },
    async created() {
        let date = moment().format('YYYY-MM-DD');
        this.$store.dispatch('getStudentsByDay', { id: this.selectedCourse, date: date });
    },
    data: function () {
        const today = moment().format("YYYY-MM-DD");
        const choosenDate =  moment().format("LL");
        const name = moment().format('dddd');
        return {
          value: today,
          day: choosenDate,
          dayName: name,
          notToday: false
        }
    },
    computed: {
        ...mapGetters([
            'teacher',
            'selectedCourse',
            'teacherTodayCourses',
            'studentsList',
            'studentsListLoaded',
            'findCourseByGroupId'
        ]),
        isNotToday: function() {
            return this.notToday
        },
        noStudents: function() {
            return this.studentsList.length === 0
        }
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`)
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
      },
      createAttendance: function (classGroupId, onTime, studentId) {
        this.$store.dispatch('postAttendance', { classGroupId: classGroupId, onTime: onTime, studentId: studentId });
        let date = moment(this.value).format('YYYY-MM-DD');
        this.$store.dispatch('getStudentsByDay', { id: this.selectedCourse, date: date });
      }
    },
    watch: {
        value: function () {
            if(moment(this.value).format('YYYY-MM-DD') >  moment().format('YYYY-MM-DD')){
                this.notToday = true;
            }else {
                this.notToday = false;
            }
            let date = moment(this.value).format('YYYY-MM-DD');
            this.day = moment(this.value).format('LL');
            this.dayName = moment(this.value).format('dddd');
            this.$store.dispatch('getStudentsByDay', { id: this.teacherTodayCourses[this.selectedCourse].id, date: date });
        }
    }
}
</script>

<style scoped>
    #attendance {
        height: 100%;
        min-height: 100vh;
    }

    .greenButton {
        background: #FFFFFF;
        border: 1px solid #36B40A;
        box-sizing: border-box;
        border-radius: 10px;
        color: #36B40A;
    }

    .green {
        color: #36B40A;
    }
</style>