<template>
<div>
    <div class="container-fluid p-0 justify-content-center" id="dashboard">
        <div class="row sticky-top m-0 blueBG">
            <header-bell
                headerTitle="Dashboard"
            />
        </div>

        <div class="row pb-2 m-0">
            <div class="col-12">
                <h4 class="font-weight-bold text-center blue">{{day}}</h4>
                <h4 class="font-weight-bold text-center gray">{{dayName}}</h4>
            </div>
        </div>

        <div class="row pb-2 m-0">
            <div class="col-12">
                <p class="font-weight-bold text-start blue">Current course</p>
            </div>
        </div>

        <div class="text-center" v-if="!teacherCoursesLoaded">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div v-if="teacherCoursesLoaded">
            <div class="row p-2 m-0">
                <course-card
                    :startTime="teacherTodayCourses[actualNumberClass()].startHour"
                    :endTime="teacherTodayCourses[actualNumberClass()].endHour"
                    :subjectName="teacherTodayCourses[actualNumberClass()].subjectId.courseName"
                    :subjectColor="teacherTodayCourses[actualNumberClass()].subjectId.colorCode"
                    :classroom="teacherTodayCourses[actualNumberClass()].classRoom"
                    :subjectCode="teacherTodayCourses[actualNumberClass()].subjectId.courseCode"
                    :group="teacherTodayCourses[actualNumberClass()].groupCode"
                />
            </div>
        </div>

    </div>

    <navbar/>

</div>
</template>

<script>
import HeaderBell from '../header/teacherheader.vue';
import CourseCard from '../coursecard/coursecard.vue';
import Navbar from '../navbar/navbar.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
    name: "teacherdashboard",
    components: {
        HeaderBell,
        Navbar,
        CourseCard
    },
    data: function () {
        const today =  moment().format("LL");
        const name = moment().format('dddd');
        return {
          day: today,
          dayName: name
        }
    },
    async created () {
        this.$store.dispatch('getTeacherContext', this.account.id);
        if(this.$route.name != 'Teacher'){
            this.$router.push('/teacher');
        }
    },
    computed: {
        ...mapGetters([
            'account',
            'teacherContext',
            'teacherContextLoaded',
            'teacher',
            'teacherLoaded',
            'teacherTodayCourses',
            'teacherCoursesLoaded'
        ])
    },
    methods: {
      actualNumberClass : function () {
        const arr = _.sortBy(this.teacherTodayCourses, ['endHour']);
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var number = 0;
        for (let index = 0; index < arr.length; index++) {
          if ((parseInt(time.split(':')[0]) >= parseInt(arr[index].startHour.split(':')[0])) && (parseInt(time.split(':')[0]) < parseInt(arr[index].endHour.split(':')[0]))) {
            number = index;
          }
        }
        this.$store.commit('updateSelectedCourse', number)
        return number;
      }
    },
    watch: {
        teacherContext: function () {   
            this.$store.commit('updateActualTeacher', this.teacherContext.teacherInfo.id);
        },
        teacherLoaded: function () {
            let date = moment().format("YYYY-MM-DD");
            this.$store.dispatch('getTeacherCoursesByDay', { id: this.teacher, date: date });
        }
    }
}
</script>

<style scoped>
    #dashboard {
        height: 100%;
        min-height:100vh;
    }
</style>