<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow headerTitle="Assignment">
        <template v-slot:content>
            <div class="row w-100 m-0 mb-2 blueBG">
                <div class="col-8">
                    <p class="m-0 pr-2 white">{{findCourseByGroupId(classGroupList[selectedGroup].classGroupId).courseName}}</p>
                </div>        

                <div class="col-4">
                    <p class="p-0 m-0 white">{{findCourseByGroupId(classGroupList[selectedGroup].classGroupId).groupCode}}</p>
                </div>
            </div>
        </template>
        </header-arrow>

    </div>


    <div class="container-fluid p-2 justify-content-center">
        
        <div class="row m-0 mb-2 pl-2 w-100">
            <div class="col-12 p-0">
                <h4 class="font-weight-bold m-0 blue" v-if="!allLoaded">{{teacherAssignmentsList[selectedAssignment].title}}</h4>
                <h4 class="font-weight-bold m-0 blue" v-if="allLoaded">{{allAssignments[selectedAssignment].title}}</h4>
            </div>
        </div>
        
        <div class="row m-0 w-100">
            <div class="col-4">
                <p class="font-weight-bold p-0 m-0 blue">Due date</p>
            </div>
            <div class="col-8 p-0">
                <p class="gray m-0" v-if="!allLoaded">{{getDueDate(teacherAssignmentsList[selectedAssignment].dueDate)}}</p>
                <p class="gray m-0" v-if="allLoaded">{{getDueDate(allAssignments[selectedAssignment].dueDate)}}</p>
            </div>
        </div>

        <div class="row w-100 m-0 mt-2">
            <div class="col-12">
                <p class="gray m-0" v-if="!allLoaded">{{teacherAssignmentsList[selectedAssignment].description}}</p>
                <p class="gray m-0" v-if="allLoaded">{{allAssignments[selectedAssignment].description}}</p>
            </div>
        </div>

        <div class="row mt-4 card" v-if="!allLoaded">
            <div class="row m-0 mt-2">
                <div class="col-3 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="paperclip"/>
                </div>
                <div class="col-9 p-0">
                    <p>{{teacherAssignmentsList[selectedAssignment].attachmentsDTOList.length}} attachment</p>
                </div>
            </div>

            <div class="row m-0" v-for="(attach, index) in teacherAssignmentsList[selectedAssignment].attachmentsDTOList" :key="index">
                <!-- <div class="col-2 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="file-alt"/>
                </div> -->
                <div class="col-10 p-0 pl-2">
                    <p class="m-0 gray text-break">{{attach.title}}.{{attach.mimeType}}</p>
                </div>
                <div class="col-2 p-0">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="cloud-download-alt"/>
                </div>
            </div>
        </div>
        <div class="row mt-4 card" v-if="allLoaded">
            <div class="row m-0 mt-2">
                <div class="col-3 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="paperclip"/>
                </div>
                <div class="col-9 p-0">
                    <p>{{allAssignments[selectedAssignment].attachmentsDTOList.length}} attachment</p>
                </div>
            </div>

            <div class="row m-0" v-for="(attach, index) in allAssignments[selectedAssignment].attachmentsDTOList" :key="index">
                <!-- <div class="col-2 p-0 pl-2">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="file-alt"/>
                </div> -->
                <div class="col-10 p-0 pl-2">
                    <p class="m-0 gray text-break">{{attach.title}}.{{attach.mimeType}}</p>
                </div>
                <div class="col-2 p-0">
                    <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="cloud-download-alt"/>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "viewassignments",
    components: {
        HeaderArrow
    },
    props: {
        title: String,
        status: String,
        dueDate: String,
        description: String
    },
    computed: {
        ...mapGetters([
            'teacherAssignmentsList', 'selectedAssignment', 'selectedGroup', 'findCourseByGroupId', 'classGroupList', 'allLoaded', 'allAssignments'
        ])
    },
    methods: {
        getDueDate: function (dueDate) {
            return moment(dueDate).format('dddd, MMMM d [at] h:mm');
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