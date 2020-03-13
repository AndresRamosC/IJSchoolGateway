<template>
<div>
    <div class="sticky-top whiteBG">
        <!-- day section -->
        <div class="row m-0 pl-3 pr-2 pt-2 daySectionBox">

            <!-- date -->
            <div class="col-10 p-1">
                <h5 class="font-weight-regular text-left p-0 m-0 blue">{{monthName}}</h5>
            </div>

            <!-- calendar -->
            <div class="col-2 p-1 d-flex flex-wrap align-content-center">
            <!-- <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="calendar-day"/> -->
                <b-form-datepicker id="picker-assignments" size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
            </div>

        </div>
    </div>

    <div class="text-center" v-if="!studentAssignmentsLoaded">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div class="container-fluid p-2 justify-content-center" v-if="studentAssignmentsLoaded">
        <div class="row m-0 pt-2">
        <div class="col-12 pt-2" v-for="(date, index) in assignmentsList" :key="index">

            <h4 class="font-weight-regular text-left blue">{{getDate(date[0].assignmentAndAttachmentsDto.dueDate)}}</h4>

                <div class="row m-0 pt-2 pb-2" v-for="(assignment, number) in date" :key="number">
                    
                    <assignment-card
                        :subjectColor="findStudentSubjectByGroup(assignment.assignmentAndAttachmentsDto.classGroupId).colorCode"
                        :assignmentName="assignment.assignmentAndAttachmentsDto.title"
                        :dueTime="findStudentSubjectByGroup(assignment.assignmentAndAttachmentsDto.classGroupId).startHour"
                        :subjectName="findStudentSubjectByGroup(assignment.assignmentAndAttachmentsDto.classGroupId).courseName"
                        :attachmentsQty="assignment.assignmentAndAttachmentsDto.attachmentsDTOList.length"
                    />
                </div>

        </div>
        </div>
    </div>
    <div v-if="studentAssignmentsList.length == 0">
        <h4 class="font-weight-regular text-center blue" v-text="$t('student.schedule.no assignments')">No assignments this month</h4>
    </div>

</div> 
</template>

<script>
import AssignmentCard from '../../Guardian/assignmentcard/assignmentcard.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import axios from 'axios';
import _ from  'lodash';

export default {
    name: "scheduleassignments",
    components: {
        AssignmentCard
    },
    data() {
        const today = moment().format("YYYY-MM-DD");
        const month = moment().format('MMMM YYYY');
      return {
        value: today,
        monthName: month,
        allAssignmentsList: '',
        assignmentsList: []
      }
    },
    created() {
        let date = moment().format("YYYY-MM");
        this.$store.dispatch('getStudentAssignmentsByMonth', { studentId: this.studentData.studentPerson.studentId, date: date} );
    },
    computed: {
        ...mapGetters([
            'courses',
            'student',
            'findStudentSubjectByGroup',
            'actualStudentId',
            'studentData',
            'studentAssignmentsList',
            'studentAssignmentsLoaded'
        ])
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`)
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
      },
      getDate(date) {
        return moment(date).format("dddd D");
      }
    },
    watch: {
        studentAssignmentsList: function () {
        this.allAssignmentsList = _.sortBy(this.studentAssignmentsList, ['dueDate']);
            for (let index = 0; index < this.allAssignmentsList.length; index++) {
                this.allAssignmentsList[index].assignmentAndAttachmentsDto.dueDate = moment(this.allAssignmentsList[index].assignmentAndAttachmentsDto.dueDate).format("YYYY-MM-DD");
            }
            this.assignmentsList = _.groupBy(this.allAssignmentsList, 'assignmentAndAttachmentsDto.dueDate');
        },
        value: function () {
            this.assignmentsList = [];
            let date = moment(this.value).format('YYYY-MM-DD');
            this.$store.dispatch('getStudentAssignmentsByMonth', { studentId: this.studentData.studentPerson.studentId, date: date} );
            this.monthName = moment(this.value).format('MMMM YYYY');
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