<template>
<div>
    <div id="subject">

        <div class="sticky-top whiteBG">
            <header-bell
                headerTitle="Subjects"
            />
        </div>

        <div class="container-fluid p-2 justify-content-center">
            <h5 class="font-weight-bold blue text-left">All subjects</h5>

            <div class="row m-0" v-for="(course, index) in courses" :key="index">
                <subject-card
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
import HeaderBell from '../headerbell/headerbell.vue';
import BottomNav from '../bottomnav/bottomnav.vue';
import SubjectCard from '../subjectcard/subjectcard.vue';
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
            'courses',
            'student'
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