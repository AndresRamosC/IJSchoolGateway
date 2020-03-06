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

        <div class="text-center" v-if="!teacherDashboardCourses">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div v-if="teacherDashboardCourses && (noCourse === true)">
            <div class="row pl-2 m-0">
                <p class="pl-2 blue">No class currently</p>
            </div>
        </div>
        <div v-if="teacherDashboardCourses && (noCourse === false)">
            <div class="row p-2 m-0">
                <course-card
                    :groupId="teacherDashboardCourses[actualNumberClass()].classGroupId"
                    :startTime="teacherDashboardCourses[actualNumberClass()].startHour"
                    :endTime="teacherDashboardCourses[actualNumberClass()].endHour"
                    :subjectName="teacherDashboardCourses[actualNumberClass()].courseName"
                    :subjectColor="teacherDashboardCourses[actualNumberClass()].colorCode"
                    :classroom="teacherDashboardCourses[actualNumberClass()].classRoom"
                    :subjectCode="teacherDashboardCourses[actualNumberClass()].courseCode"
                    :group="teacherDashboardCourses[actualNumberClass()].groupCode"
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
          dayName: name,
          noCourse: false
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
            'teacherDashboardCourses',
            'teacherDashboardCourses'
        ])
    },
    methods: {
      actualNumberClass : function () {
        const arr = _.sortBy(this.teacherDashboardCourses, ['endHour']);
        var time = moment().format("HH:mm");
        var number = -1;
        for (let index = 0; index < arr.length; index++) {
          if ((time >= arr[index].startHour) && (time < arr[index].endHour)) {
            number = index;
          }
        }
        if(number === -1){
            this.noCourse = true;
            number = 0;
        }else {
            this.$store.commit('updateSelectedCourse', arr[number].classGroupId);
        }
        return number;
      }
    },
    watch: {
        teacherContext: function () {   
            this.$store.commit('updateActualTeacher', this.teacherContext.teacherInfo.id);
            this.$store.commit('addAllToGroupList', {courseName: "All", groupCode: "All", classGroupId: 9999} );
        },
        teacherLoaded: function () {
            let date = moment().format("YYYY-MM-DD");
            this.$store.dispatch('getTeacherDashboard', { id: this.teacher, date: date });
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