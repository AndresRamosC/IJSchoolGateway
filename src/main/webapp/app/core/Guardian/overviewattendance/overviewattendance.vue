<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow
            headerTitle="Course overview"
        />

        <div class="row m-0">
            <div class="col-8">
                <b-dropdown id="dropdown-1" class="p-2" toggle-class="text-decoration-none" :no-caret="true" >
                    <template v-slot:button-content>
                        <div class="row">
                            <p class="m-0 pr-2">{{findSubjectBySubjectId(actualCourse).courseName}}</p>
                            <font-awesome-icon class="white" style="width: 20px; height: 20px;" icon="chevron-down"/>
                        </div>
                    </template>
                    <b-dropdown-item v-for="(course, index) in courses" :key="index" @click="updateAttendances(course.classGroupId)">
                        {{course.courseName}} 
                    </b-dropdown-item>
                </b-dropdown>
            </div>        

            <div class="col-3">
                <p class="pt-2 white">{{findSubjectBySubjectId(actualCourse).groupCode}}</p>
            </div>
        </div>

        <!-- container separator  -->
        <div style="zIndex: 1" class="col-12 divider"></div>

        <!-- buttons navigation between schedules -->
        <navigation-buttons/>

    </div>


    <div class="container-fluid pt-4 p-2 justify-content-center" id="attendance">
    
    <div class="text-center" v-if="!attendanceLoaded">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <calendar v-if="attendanceLoaded"
        :absent="attendanceList"
    />

    </div>

</div>
</template>

<script>
import NavigationButtons from '../overviewNavigationBtns/overviewNavigationButtons.vue';
import HeaderArrow from '../headerarrow/headerarrow.vue';
import Calendar from '../../calendar/calendar.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "overviewattendance",
    components: {
        HeaderArrow, 
        Calendar,
        NavigationButtons
    },
    created() {
        let date = moment().format("YYYY-MM-DD")
        this.$store.dispatch('getAttendanceByMonth', { studentId: this.actualStudentId, groupId: this.findSubjectBySubjectId(this.actualCourse).classGroupId, date: date } );
    },
    computed: {
        ...mapGetters([
            'courses',
            'findSubjectBySubjectId',
            'actualCourse',
            'attendanceList',
            'attendanceLoaded',
            'actualStudentId'
        ])
    },
    methods: {
      updateAttendances(course) {
        this.$store.commit('changeActualCourse', course);
        let date = moment().format("YYYY-MM-DD")
        this.$store.dispatch('getAttendanceByMonth', { studentId: this.actualStudentId, groupId: course, date: date } );
      }
    },
    watch :{
        attendanceLoaded: function () {
            console.log(this.attendanceList);
        }
    }
}
</script>

<style scoped>
    #attendance {
        min-height:100vh;
    }

    .blueBG {
        background-color: #1071A3!important;
    }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
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