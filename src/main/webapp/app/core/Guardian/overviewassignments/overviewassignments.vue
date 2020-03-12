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
                    <b-dropdown-item v-for="(course, index) in courses" :key="index" @click="updateAssignments(course.subjectId)">
                        {{course.courseName}} 
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item
                    @click="loadAllAssignments">
                        All
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


    <div class="container-fluid pt-4 p-2 justify-content-center" id="assignments">

        <div v-for="(assignment,index) in allAssignmentsList" :key="index">
            <assignment-item
                :assignmentIndex="index"
                :numberAttch="assignment.assignmentAndAttachmentsDto.attachmentsDTOList.length"
                :status="assignment.done"
                :dueDate="getDate(assignment.assignmentAndAttachmentsDto.dueDate)"
                :description="assignment.assignmentAndAttachmentsDto.description"
            />
        </div>

    </div>

</div>
</template>

<script>
import NavigationButtons from '../overviewNavigationBtns/overviewNavigationButtons.vue';
import HeaderArrow from '../headerarrow/headerarrow.vue';
import AssignmentItem from '../assignmentitem/assignmentitem.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import axios from 'axios';

export default {
    name: "overviewassignments",
    components: {
        HeaderArrow,
        AssignmentItem,
        NavigationButtons
    },
    data() {
      return {
        allAssignmentsList: '',
        assignmentsList: []
      }
    },
    async mounted() {
        if (!this.allLoaded) {
            this.$store.dispatch('getStudentAssignmentsByCourse', { studentId: this.actualStudentId, groupId: this.actualCourse} );
        }else {
            this.allAssignmentsList = this.studentAssignmentsList;
        }
    },
    computed: {
        ...mapGetters([
            'courses',
            'actualStudentId',
            'findSubjectById',
            'findSubjectBySubjectId',
            'actualCourse',
            'studentAssignmentsList',
            'allLoaded'
        ])
    },
    methods: {
        getDate(date) {
            return moment(date).format("MM/D");
        },
        updateAssignments(course) {
            this.$store.commit('updateAllLoaded', false);
            this.$store.commit('changeActualCourse', course);
            this.assignmentsList = [];
            this.$store.dispatch('getStudentAssignmentsByCourse', { studentId: this.actualStudentId, groupId: this.actualCourse} );
        },
        loadAllAssignments() {
            this.$store.commit('updatestudentAssignments', []);
            for (let index = 0; index < this.courses.length; index++) {
                this.$store.dispatch('returnStudentAssignmentsByCourse', { studentId: this.actualStudentId, groupId: this.courses[index].classGroupId} );
            }
            this.$store.commit('updateAllLoaded', true);
        }
    },
    watch: {
        studentAssignmentsList: function () {
            this.allAssignmentsList = _.sortBy(this.studentAssignmentsList, ['dueDate']);
            for (let index = 0; index < this.allAssignmentsList.length; index++) {
                this.allAssignmentsList[index].dueDate = moment(this.allAssignmentsList[index].dueDate).format("YYYY-MM-DD");
            }
        }
    }
}
</script>

<style scoped>
    #assignments {
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