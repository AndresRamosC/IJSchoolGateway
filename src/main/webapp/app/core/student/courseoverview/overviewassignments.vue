<template>
<div>

    <div class="container-fluid p-2 justify-content-center">

                <div class="row m-0 pt-2 pb-2" v-for="(assignment, index) in studentAssignmentsList" :key="index">
                    <assignment-card
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
import AssignmentCard from '../cards/assignment.vue';
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
      return {
        allAssignmentsList: '',
        assignmentsList: []
      }
    },
    created() {
        if (!this.allLoaded) {
            this.$store.dispatch('getStudentAssignmentsByCourse', { studentId: this.studentData.studentPerson.studentId, groupId: this.findStudentSubjectById(this.getStudentSelectedCourse).classGroupId} );
        }
    },
    computed: {
        ...mapGetters([
            'findStudentSubjectByGroup',
            'getStudentSelectedCourse',
            'findStudentSubjectById',
            'studentAssignmentsList',
            'studentData',
            'allLoaded'
        ])
    },
    methods: {
      getDate(date) {
        return moment(date).format("MM/D");
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