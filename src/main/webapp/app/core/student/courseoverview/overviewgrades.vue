<template>
    <div class="container-fluid pt-4 p-2 justify-content-center" id="grades">

        <div class="row average">
            <div class="col-8">
                <div class="row">
                    <div class="col-12">
                        <p class="font-weight-bold m-0 blue" v-text="$t('student.grades.total')">Total score</p>
                    </div>
                    <div class="col-12">
                        <p style="fontSize: 0.8em;" class="font-weight-regular m-0 gray" v-text="$t('student.grades.total message')">Average including all months</p>
                    </div>
                </div>
            </div>
            <div class="col-4 d-flex align-items-center">
                <h2 class="font-weight-bold blue m-0">{{totalAverage}}</h2>
            </div>
        </div>

        <div class="row m-0 mt-2">
            <div class="col-12">
                <div>
                    <h3 class="text-center blue" v-text="$t('student.grades.average month')">Average per month</h3>
                </div>
            </div>
        </div>
        
        <div class="col-12 pt-2" v-for="(date, index) in assignmentsList" :key="index">

                <month-grade
                    :month="getDate(date[0].dueDate)"
                    :homeworks="calculateHomeworks(assignmentsList[index])"
                    test="90"
                    :total="getTotalMonth(assignmentsList[index])"
                />

        </div>

    </div>
</template>

<script>
import MonthGrade from '../../Guardian/monthgrade/monthgrade.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import axios from 'axios';
import _ from  'lodash';

export default {
    name: "overviewgrades",
    components: {
        MonthGrade
    },
    data() {
      return {
        allAssignmentsList: '',
        assignmentsList: [],
        totalAverage: 0
      }
    },
    created() {
        if (!this.allLoaded) {
            this.$store.dispatch('getStudentAssignmentsByCourse', { studentId: this.studentData.studentPerson.studentId, groupId: this.findStudentSubjectById(this.getStudentSelectedCourse).classGroupId} );
        }else {
            for (let index = 0; index < this.studentAssignmentsList.length; index++) {
                this.studentAssignmentsList[index].assignmentAndAttachmentsDto.dueDate = moment(this.studentAssignmentsList[index].assignmentAndAttachmentsDto.dueDate).format("YYYY-MM-DD");
            }
            var monthToCompare = "2020-01-01";
            var groupedArray = [];
            for (let index = 0; index < 12; index++) {
                let tempArray = [];
                for (let index = 0; index < this.studentAssignmentsList.length; index++) {
                    if (moment(monthToCompare).format("MM") === moment(this.studentAssignmentsList[index].assignmentAndAttachmentsDto.dueDate).format("MM")) {
                        tempArray.push(this.studentAssignmentsList[index]);
                        }
                    }
                    if(tempArray.length != 0){
                        groupedArray.push(tempArray);
                    }
                monthToCompare = moment(monthToCompare).add(1, 'month').format("YYYY-MM-DD");
            }
            this.assignmentsList = groupedArray;
            var monthsAverage = [];
            _.forEach(this.assignmentsList, function(value) {
                monthsAverage.push( _.meanBy(value, 'grade') );
            });
            this.totalAverage = _.ceil(_.mean(monthsAverage), 2);
        }
    },
    computed: {
        ...mapGetters([
            'studentData',
            'findStudentSubjectById',
            'getStudentSelectedCourse',
            'studentAssignmentsList',
            'allLoaded'
        ])
    },
    methods: {
      getDate(date) {
        return moment(date).format("MMMM");
      },
      calculateHomeworks(assignmentsList) {
        var delivered = 0;
        for (let index = 0; index < assignmentsList.length; index++) {
            if (assignmentsList[index].done === true) {
                delivered++;
            }
        }
        return delivered + '/' + assignmentsList.length;
      },
      getTotalMonth(assignmentsList) {
        return _.ceil(_.meanBy(assignmentsList, 'grade'), 2);
      }
    },
    watch: {
        studentAssignmentsList: function () {
            for (let index = 0; index < this.studentAssignmentsList.length; index++) {
                this.studentAssignmentsList[index].assignmentAndAttachmentsDto.dueDate = moment(this.studentAssignmentsList[index].assignmentAndAttachmentsDto.dueDate).format("YYYY-MM-DD");
            }
            var monthToCompare = "2020-01-01";
            var groupedArray = [];
            for (let index = 0; index < 12; index++) {
                let tempArray = [];
                for (let index = 0; index < this.studentAssignmentsList.length; index++) {
                    if (moment(monthToCompare).format("MM") === moment(this.studentAssignmentsList[index].assignmentAndAttachmentsDto.dueDate).format("MM")) {
                        tempArray.push(this.studentAssignmentsList[index]);
                        }
                    }
                    if(tempArray.length != 0){
                        groupedArray.push(tempArray);
                    }
                monthToCompare = moment(monthToCompare).add(1, 'month').format("YYYY-MM-DD");
            }
            this.assignmentsList = groupedArray;
            var monthsAverage = [];
            _.forEach(this.assignmentsList, function(value) {
                monthsAverage.push( _.meanBy(value, 'grade') );
            });
            this.totalAverage = _.ceil(_.mean(monthsAverage), 2);
        }
    }
}
</script>

<style scoped>
    #grades {
        min-height:100vh;
    }

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

    .average {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin: 1%;
    }
</style>