<template>
<div>
    <div class="sticky-top whiteBG">
        <!-- day section -->
        <div class="row m-0 pl-3 pr-2 pt-2 daySectionBox">

            <!-- date -->
            <div class="col-10 p-1">
                <h5 class="font-weight-regular text-left p-0 m-0 gray"> {{dayName}} </h5>
                <h5 class="font-weight-regular text-left p-0 m-0 blue"> {{choosenDate}} </h5>
            </div>

            <!-- calendar -->
            <div class="col-2 p-1 d-flex flex-wrap align-content-center">
                <b-form-datepicker id="picker-courses" size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
            </div>

        </div>
    </div>

    <!-- card courses container -->
    <div v-if="studentCoursesLoaded" class="pt-2">
        <div class="container-fluid p-1 justify-content-center" v-for="(course, index) in studentCourses" :key="index">
            
            <course-card
                :groupId="course.classGroupId"
                :startTime="course.startHour"
                :endTime="course.endHour"
                :subjectName="course.courseName"
                :subjectColor="course.colorCode"
                :classroom="course.classRoom"
                :subjectCode="course.courseCode"
                :group="course.startHour"
            />

        </div>
    </div>

</div>    
</template>

<script>
import CourseCard from  '../cards/coursecard.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "schedulecourses",
    components: {
        CourseCard
    },
    created() {
        let date = moment(this.value).format('YYYY-MM-DD');
        this.$store.dispatch('getStudentCoursesByDay', { id: this.studentData.studentPerson.studentId, date: date });
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
            'studentData',
            'studentCourses',
            'studentCoursesLoaded'
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
            this.$store.dispatch('getStudentCoursesByDay', { id: this.studentData.studentPerson.studentId, date: date });
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
</style>