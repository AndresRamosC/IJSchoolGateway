<template>
<div>
    <div class="container-fluid p-0 justify-content-center" id="schedule">
        <div class="sticky-top whiteBG">
            <header-bell
                headerTitle="Schedule"
            />
            
            <!-- day section -->
            <div class="row m-0 pl-3 pr-2 daySectionBox">

                <!-- date -->
                <div class="col-10 p-1">
                    <!-- <p class="font-weight-regular text-left p-0 m-0 gray">Friday</p> -->
                    <h5 class="font-weight-regular text-left p-0 m-0 gray"> {{dayName}} </h5>
                    <h5 class="font-weight-regular text-left p-0 m-0 blue"> {{choosenDate}} </h5>
                </div>

                <!-- calendar -->
                <div class="col-2 p-1 d-flex flex-wrap align-content-center">
                <!-- <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="calendar-day"/> -->
                    <b-form-datepicker id="teacher-schedule" size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
                </div>

            </div>
        </div>

        <div class="row m-0 pt-2 p-0">
            <div class="col-12">
                <p class="font-weight-bold text-start m-0 blue">Courses of the day</p>
            </div>
        </div>

            <!-- card courses container -->
        <div class="text-center" v-if="!teacherCoursesLoaded">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div class="pt-2" v-if="teacherCoursesLoaded">
            <div class="row p-2 m-0" v-for="(course, index) in teacherTodayCourses" :key="index">
                <course-card
                    :startTime="course.startHour"
                    :endTime="course.endHour"
                    :subjectName="course.courseName"
                    :subjectColor="course.colorCode"
                    :classroom="course.classRoom"
                    :subjectCode="course.courseCode"
                    :group="course.groupCode"
                />
            </div>
        </div>

    </div>

    <navbar/>

</div>    
</template>

<script>
import CourseCard from '../coursecard/coursecard.vue';
import HeaderBell from '../header/teacherheader.vue';
import Navbar from '../navbar/navbar.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "teacherschedule",
    components: {
        CourseCard,
        HeaderBell,
        Navbar
    },
    created() {
        let date = moment(this.value).format('YYYY-MM-DD');
        this.$store.dispatch('getScheduleCourses', { id: this.teacher, date: date });
    },
    data() {
        const today = moment().format("YYYY-MM-DD");
        const day =  moment().format("LL");
        const name = moment().format('dddd');
      return {
        value: today,
        choosenDate:  day,
        dayName: name
      }
    },
    computed: {
        ...mapGetters([
            'teacher',
            'teacherTodayCourses',
            'teacherCoursesLoaded'
        ])
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`)
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
      }
    },
    watch: {
        value: function () {
            let date = moment(this.value).format('YYYY-MM-DD');
            this.choosenDate = moment(this.value).format('LL');
            this.dayName = moment(this.value).format('dddd');
            this.$store.dispatch('getTeacherCoursesByDay', { id: this.teacher, date: date });
        }
    }
}
</script>

<style scoped>
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

    .daySectionBox {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }

    #schedule{
        height: 100%;
        min-height:100vh;
    }
</style>