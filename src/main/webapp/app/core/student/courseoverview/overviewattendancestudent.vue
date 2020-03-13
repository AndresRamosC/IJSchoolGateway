<template>
    <div class="container-fluid pt-4 p-2 justify-content-center" id="attendance">
    
    <div class="text-center" v-if="!studentAttendanceLoaded">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <calendar v-if="studentAttendanceLoaded && !allLoaded"
        :absent="studentAttendanceList"
    />
    <div class="container" v-if="allLoaded">
        <h4 class="text-center blue" v-text="$t('student.attendance.assitance record')">Assitance record</h4>
        <div class="card">
            <b-progress :max="max" height="2rem">
                <b-progress-bar variant="success" :value="getAssitances">{{ getAssitances }}</b-progress-bar>
                <b-progress-bar style="backgroundColor: yellow; color: black;" :value="getLates">{{ getLates }}</b-progress-bar>
                <b-progress-bar style="backgroundColor: red; color: white;" :value="(max - (getAssitances + getLates))">{{ (max - (getAssitances + getLates)) }}</b-progress-bar>
            </b-progress>
        </div>

        <div class="row mt-4">
            <div class="col-6 p-0">
                <div class="row m-1 p-0 pt-2 pb-2 card">
                    <div class="col-12 text-center font-weight-bold" style="color: #28a745;" v-text="$t('student.attendance.assitance percentage')">Assitance %</div>
                    <div class="col-12 text-center ">50%</div>
                </div>
            </div>

            <div class="col-6 p-0">
                <div class="row m-1 p-0 pt-2 pb-2 card">
                    <div class="col-12 text-center font-weight-bold blue" v-text="$t('student.attendance.absences left')">Absences left</div>
                    <div class="col-12 text-center ">2</div>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>

<script>
import Calendar from '../../calendar/calendar.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "overviewattendance",
    components: {
        Calendar
    },
    data() {
        let maxValue = parseInt(moment().startOf('month').fromNow());
      return {
        max: maxValue
      }
    },
    created() {
        console.log(parseInt(moment().startOf('month').fromNow()));
        let date = moment().format("YYYY-MM-DD")
        this.$store.dispatch('getStudentAttendanceByMonth', { studentId: this.studentData.studentPerson.studentId, groupId: this.findStudentSubjectById(this.getStudentSelectedCourse).classGroupId, date: date } );
    },
    computed: {
        ...mapGetters([
            'studentData',
            'findStudentSubjectById',
            'getStudentSelectedCourse',
            'studentAttendanceLoaded',
            'studentAttendanceList',
            'allLoaded',
            'getAssitances',
            'getLates'
        ])
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

    .card {
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25)
    }
</style>