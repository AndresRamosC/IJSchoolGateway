 replace<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow
            headerTitle="Course overview"
            link="/fail"
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
                    <b-dropdown-item v-for="(course, index) in courses" :key="index" @click="updateGrades(course.subjectId)">
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


    <div class="container-fluid pt-4 p-2 justify-content-center" id="grades">

        <div class="row average">
            <div class="col-8">
                <div class="row">
                    <div class="col-12">
                        <p class="font-weight-bold m-0 blue">Total score</p>
                    </div>
                    <div class="col-12">
                        <p style="fontSize: 0.8em;" class="font-weight-regular m-0 gray">Average including all months</p>
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
                    <h3 class="text-center blue">Average per month</h3>
                </div>
            </div>
        </div>
        
        <div class="col-12 pt-2" v-for="(date, index) in assignmentsList" :key="index">

            <!-- <div v-for="(assignment, number) in assignmentsList[index]" :key="number"> -->
                <month-grade
                    :month="getDate(date[0].dueDate)"
                    :homeworks="calculateHomeworks(assignmentsList[index])"
                    test="90"
                    :total="getTotalMonth(assignmentsList[index])"
                />
            <!-- </div> -->

        </div>

    </div>

</div>
</template>

<script>
import NavigationButtons from '../overviewNavigationBtns/overviewNavigationButtons.vue';
import HeaderArrow from '../headerarrow/headerarrow.vue';
import MonthGrade from '../monthgrade/monthgrade.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import axios from 'axios';
import _ from  'lodash';

export default {
    name: "overviewgrades",
    components: {
        HeaderArrow,
        MonthGrade,
        NavigationButtons
    },
    data() {
      return {
        allAssignmentsList: '',
        assignmentsList: [],
        totalAverage: 0
      }
    },
    async mounted() {
      this.allAssignmentsList = _.sortBy((await axios.get("./content/data/assignments.json")  
      .then(response => response.data.assignments)), ['dueDate']);
      for (let index = 0; index < this.allAssignmentsList.length; index++) {
          if (this.allAssignmentsList[index].studentId === this.actualStudentId) {
              if (this.findSubjectById(this.allAssignmentsList[index].classGroupId).courseName === this.findSubjectBySubjectId(this.actualCourse).courseName) {
                this.allAssignmentsList[index].dueDate = moment(this.allAssignmentsList[index].dueDate).format("YYYY-MM-DD");
                this.assignmentsList.push(this.allAssignmentsList[index]);
              }
          }
      }
      var monthToCompare = "2020-01-01";
      var groupedArray = [];
      for (let index = 0; index < 12; index++) {
          let tempArray = [];
           for (let index = 0; index < this.assignmentsList.length; index++) {
               if (moment(monthToCompare).format("MM") === moment(this.assignmentsList[index].dueDate).format("MM")) {
                   tempArray.push(this.assignmentsList[index]);
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
      this.totalAverage = _.mean(monthsAverage);
    },
    computed: {
        ...mapGetters([
            'courses',
            'findSubjectBySubjectId',
            'findSubjectById',
            'actualCourse',
            'actualStudentId'
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
        return _.meanBy(assignmentsList, 'grade');
      },
      updateGrades(course) {
        this.$store.commit('changeActualCourse', course);
        this.assignmentsList = [];
         for (let index = 0; index < this.allAssignmentsList.length; index++) {
          if (this.allAssignmentsList[index].studentId === this.actualStudentId) {
              if (this.findSubjectById(this.allAssignmentsList[index].classGroupId).courseName === this.findSubjectBySubjectId(this.actualCourse).courseName) {
                this.allAssignmentsList[index].dueDate = moment(this.allAssignmentsList[index].dueDate).format("YYYY-MM-DD");
                this.assignmentsList.push(this.allAssignmentsList[index]);
              }
          }
        }
        var monthToCompare = "2020-01-01";
        var groupedArray = [];
        for (let index = 0; index < 12; index++) {
            let tempArray = [];
            for (let index = 0; index < this.assignmentsList.length; index++) {
                if (moment(monthToCompare).format("MM") === moment(this.assignmentsList[index].dueDate).format("MM")) {
                    tempArray.push(this.assignmentsList[index]);
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
        this.totalAverage = _.mean(monthsAverage);
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