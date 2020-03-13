<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow headerTitle="Assignment">
            <template v-slot:content>
            <div class="row m-0 blueBG">
                <div class="col-8">
                    <p class="m-0 pr-2 white">{{findStudentSubjectById(getStudentSelectedCourse).courseName}}</p>
                </div>        

                <div class="col-4">
                    <p class="pt-2 white">{{findStudentSubjectById(getStudentSelectedCourse).groupCode}}</p>
                </div>
            </div>
            </template>
        </header-arrow>

    </div>


    <div class="container-fluid p-2 justify-content-center">
        
        <div class="row m-0 mb-2 pl-2 w-100">
            <div class="col-8 p-0">
                <h4 class="font-weight-bold m-0 blue">{{studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.title}}</h4>
            </div>
            <div class="col-4">
                <p class="blue p-0 m-0 text-center" v-text="$t('student.assignments.status.' + getStatus(studentAssignmentsList[selectedAssignment].done).toLowerCase())">{{getStatus(studentAssignmentsList[selectedAssignment].done)}}</p>
            </div>
        </div>
        
        <div class="row m-0 w-100">
            <div class="col-4 pl-1 p-0">
                <p class="font-weight-bold p-0 m-0 blue" v-text="$t('student.assignments.due date')">Due date</p>
            </div>
            <div class="col-8 p-0">
                <p class="gray m-0">{{getDueDate(studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.dueDate)}}</p>
            </div>
        </div>

        <div class="row w-100 m-0 mt-2">
            <div class="col-12">
                <p class="gray m-0">{{studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.description}}</p>
            </div>
        </div>

        <div class="row mt-4 card">
            <div class="row m-0 mt-2">
                <div class="col-3 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="paperclip"/>
                </div>
                <div class="col-9 p-0">
                    <p v-if="studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.attachmentsDTOList.length == 1" v-text="studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.attachmentsDTOList.length + ' ' + $t('student.assignments.attachment')"> attachment</p>
                    <p v-if="studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.attachmentsDTOList.length > 1" v-text="studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.attachmentsDTOList.lengt + ' ' + $t('student.assignments.attachments')">attachments</p>
                </div>
            </div>

            <div class="row m-0" v-for="(attach, index) in studentAssignmentsList[selectedAssignment].assignmentAndAttachmentsDto.attachmentsDTOList" :key="index">
                <div class="col-2 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="file-alt"/>
                </div>
                <div class="col-8 p-0 pl-2">
                    <p class="m-0 gray text-break">{{attach.title}}</p>
                </div>
                <div class="col-2 p-0" @click="downloadDocument(attach)">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="cloud-download-alt"/>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import HeaderArrow from '../appheaders/arrowheader.vue';
import {saveAs}  from 'file-saver';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "overviewassignments",
    components: {
        HeaderArrow
    },
    data() {
        return {
            download: ''
        }
    },
    props: {
        title: String,
        status: String,
        dueDate: String,
        description: String
    },
    computed: {
        ...mapGetters([
            'findStudentSubjectById', 'getStudentSelectedCourse', 'studentAssignmentsList', 'selectedAssignment', 'blobData'
        ])
    },
    methods: {
        getStatus: function (status) {
            return status ? "Delivered" : 'Not delivered';
        },
        getDueDate: function (dueDate) {
            return moment(dueDate).format('dddd, MMMM d [at] h:mm');
        },
        downloadDocument(doc) {
            this.download = doc;
            this.$store.dispatch('downloadAssignmentAttachments', doc.id);
        },
    },
    watch: {
        blobData: function () {
            saveAs(this.blobData, this.download.title);
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

  .card {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
        margin: 1%;
  }
</style>