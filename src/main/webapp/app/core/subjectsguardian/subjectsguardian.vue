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

            <div class="row m-0">
                <subject-card
                    subjectIcon="globe"
                    subjectColor="#FF0000"
                    subjectName="English"
                    subjectCode="ENG-01"
                    group="1"
                />
            </div>

            <div class="row m-0">
                <subject-card
                    subjectIcon="square-root-alt"
                    subjectColor="#36B40A"
                    subjectName="Math"
                    subjectCode="MTH-01"
                    group="3"
                />
            </div>

            <div class="row m-0">
                <subject-card
                    subjectIcon="landmark"
                    subjectColor="#FAC405"
                    subjectName="History"
                    subjectCode="HTY-01"
                    group="1"
                />
            </div>

            <div class="row m-0">
                <subject-card
                    subjectIcon="palette"
                    subjectColor="#4505FA"
                    subjectName="Art"
                    subjectCode="ART-01"
                    group="2"
                />
            </div>

            <div class="row m-0">
                <subject-card
                    subjectIcon="child"
                    subjectColor="#05BFFA"
                    subjectName="Physical education"
                    subjectCode="PHE-01"
                    group="2"
                />
            </div>

            <div class="row m-0">
                <subject-card
                    subjectIcon="book-open"
                    subjectColor="#FA05B5"
                    subjectName="Physics"
                    subjectCode="PHS-01"
                    group="3"
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

export default {
    name: "subjectsguardian",
    components: {
        HeaderBell,
        BottomNav,
        SubjectCard
    }
}
</script>

<style scoped>
   #subject {
    height: 100%;
    min-height:100vh;
  }
</style>