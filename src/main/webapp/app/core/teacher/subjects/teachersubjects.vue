<template>
<div>
    <div class="container-fluid p-0 justify-content-center" id="subjects">
        <div class="sticky-top whiteBG">
            <header-bell
                headerTitle="Subjects"
            />
        </div>    

        <div class="row m-0 pt-2 p-0">
            <div class="col-12">
                <p class="font-weight-bold text-start m-0 blue">All subjects</p>
            </div>
        </div>

            <!-- card subjects container -->
        <div class="text-center" v-if="!teacherContextLoaded">
            <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
        <div class="pt-2" v-if="teacherContextLoaded">
            <div class="container-fluid p-1 justify-content-center" v-for="(group, index) in amountOfGroups" :key="index">

                <subject-card
                    :subjectIcon="courseName(amountOfGroups[index].subjectId).subjectId.iconCode"
                    :subjectColor="courseName(amountOfGroups[index].subjectId).subjectId.colorCode"
                    :subjectName="courseName(amountOfGroups[index].subjectId).subjectId.courseName"
                    :subjectCode="courseName(amountOfGroups[index].subjectId).subjectId.courseCode"
                    :groupQty="amountOfGroups[index].amount"
                />

            </div>
        </div>

    </div>

    <navbar/>

</div>    
</template>

<script>
import SubjectCard from '../subjectcard/teachersubjectcard.vue';
import HeaderBell from '../header/teacherheader.vue';
import Navbar from '../navbar/navbar.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
    name: "teacherschedule",
    components: {
        SubjectCard,
        HeaderBell,
        Navbar
    },
    created() {

    },
    data() {
      return {
        
      }
    },
    computed: {
        ...mapGetters([
            'teacherContext',
            'teacherContextLoaded',
            'amountOfGroups',
            'classGroupList',
            'courseName'
        ])
    },
    methods: {
        
    },
    watch: {

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

    #subjects{
        height: 100%;
        min-height:100vh;
    }
</style>