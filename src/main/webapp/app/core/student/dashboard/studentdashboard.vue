<template>
<div>

    <div id="studentDashboard">
        <div class="sticky-top blueBG" v-if="studentDataLoaded">
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
                <p class="font-weight-bold text-start blue" v-text="$t('student.dashboard.current course')">Current course</p>
            </div>
        </div>

        <div class="text-center" v-if="!studentTodayCoursesLoaded">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div v-if="studentTodayCoursesLoaded && (noCourse === true)">
            <div class="row pl-2 m-0">
                <p class="pl-2 blue" v-text="$t('student.dashboard.no class')">No class currently</p>
            </div>
        </div>
        <div v-if="studentTodayCoursesLoaded && (noCourse === false)">
            <div class="container-fluid p-1 justify-content-center">
            
                <course-card
                    :groupId="studentTodayCourses[actualNumberClass()].classGroupId"
                    :startTime="studentTodayCourses[actualNumberClass()].startHour"
                    :endTime="studentTodayCourses[actualNumberClass()].endHour"
                    :subjectName="studentTodayCourses[actualNumberClass()].courseName"
                    :subjectColor="studentTodayCourses[actualNumberClass()].colorCode"
                    :classroom="studentTodayCourses[actualNumberClass()].classRoom"
                    :subjectCode="studentTodayCourses[actualNumberClass()].courseCode"
                    :group="studentTodayCourses[actualNumberClass()].groupCode"
                />

            </div>
        </div>

        <div class="container pt-3 todaySummaryBox" style="width: 95%;"  v-if="studentTodayCoursesLoaded">

            <!-- data -->
            <div class="row p-2 d-flex justify-content-start">

                <!-- entrance time  -->
                <div class="col-6 p-0 pt-1 pb-1 pl-2">
                    <h5 class="font-weight-regular text-left p-0 m-0 blue" v-text="$t('student.dashboard.entrance')">Entrance:</h5>
                    <p class="font-weight-regular text-left p-0 m-0 gray" v-text="$t('student.dashboard.entry hour')">08:10 - late</p>
                </div>

                <!-- exit time -->
                <div class="col-6 p-0 pt-1 pb-1 pl-2">
                    <h5 class="font-weight-regular text-left p-0 m-0 blue" v-text="$t('student.dashboard.exit')">Exit:</h5>
                    <p class="font-weight-regular text-left p-0 m-0 gray" v-text="$t('student.dashboard.at school')">still at school</p>
                </div>

            </div>

        </div>

    </div>

    <bottom-nav/>

</div>
</template>

<script>
import HeaderBell from  '../appheaders/photobell.vue';
import BottomNav from  '../bottomnav/bottomnav.vue';
import CourseCard from  '../cards/coursecard.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
    name: "studentdashboard",
    components: {
        HeaderBell,
        BottomNav,
        CourseCard
    },
    computed: {
        ...mapGetters([
            'account',
            'studentData',
            'studentDataLoaded',
            'studentTodayCourses',
            'studentTodayCoursesLoaded',
        ])
    },
    created() {
        this.$store.dispatch('getStudentData', this.account.id );
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
    methods: {
      actualNumberClass : function () {
        const arr = _.sortBy(this.studentTodayCourses, ['endHour']);
        var time = moment().format("HH:mm");
        var number = -1;
        for (let index = 0; index < arr.length; index++) {
          if (time >= arr[index].startHour && time < arr[index].endHour) {
            number = index;
          }
        }
        if(number === -1) {
            this.noCourse = true;
            number = 0;
        }
        return number;
      }
    },
    watch: {
        studentDataLoaded: function () {
            let date = moment(this.value).format('YYYY-MM-DD');
            this.$store.dispatch('getStudentTodayCourses', { id: this.studentData.studentPerson.studentId, date: date } );
            this.$store.commit('updateStudentSubjects', this.studentData.studentPerson.classGroupAndSubjectDtoList);
        }
    }
}
</script>

<style scoped>
    #studentDashboard {
        height: 100%;
        min-height:100vh;
    }

    .todaySummaryBox {
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>