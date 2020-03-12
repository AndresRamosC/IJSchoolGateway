<template>
<div>
    <div id="subject">

        <div class="sticky-top whiteBG">
            <header-bell
                headerTitle="Subjects"
            />
        </div>

        <div class="container-fluid p-2 justify-content-center">
            <h5 class="font-weight-bold blue text-left">All courses</h5>

            <div class="row m-0" v-for="(course, index) in getStudentSubjects" :key="index">
                <subject-card
                    :subjectId="course.classGroupId"
                    :subjectIcon="course.iconCode"
                    :subjectColor="course.colorCode"
                    :subjectName="course.courseName"
                    :subjectCode="course.courseCode"
                    :group="course.groupCode"
                />
            </div>

        </div>

    </div>

    <bottom-nav/>
</div>
</template>

<script>
import HeaderBell from '../appheaders/photobell.vue';
import BottomNav from '../bottomnav/bottomnav.vue';
import SubjectCard from '../cards/subjectcard.vue';
import { mapGetters } from 'vuex';

export default {
    name: "subjectsguardian",
    components: {
        HeaderBell,
        BottomNav,
        SubjectCard
    },
    computed: {
        ...mapGetters([
            'getStudentSubjects'
        ])
    }
}
</script>

<style scoped>
   #subject {
    height: 100%;
    min-height:100vh;
  }
</style>