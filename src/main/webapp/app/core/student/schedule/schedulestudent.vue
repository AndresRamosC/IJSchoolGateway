<template>
<div>
    <div class="container-fluid p-0 justify-content-center" id="schedule">
        <div class="sticky-top">
            <header-bell headerTitle="Schedule" class="whiteBG">
                <template v-slot:content>
                    <!-- buttons navigation between schedules -->
                    <div class="row m-0 pl-2 pr-2 whiteBG">
                        <!-- courses button -->
                        <div class="col">
                            <router-link to="/student-schedule/courses">
                                <button :class="attendance" role="button" aria-pressed="true">Courses</button>
                            </router-link>
                        </div>
                        <!-- assignments button  -->
                        <div class="col">
                            <router-link to="/student-schedule/assignments">
                                <button :class="assignments" role="button" aria-pressed="false">Assignments</button>
                            </router-link>
                        </div>
                    </div>

                </template>
            </header-bell>
        <router-view></router-view>
        </div>


    </div>

    <!-- nav -->
    <bottom-nav/>

</div>
</template>

<script>
import HeaderBell from '../appheaders/photobell.vue';
import BottomNav from '../bottomnav/bottomnav.vue';

export default {
    name: "schedulestudent",
    components: {
        HeaderBell,
        BottomNav
    },
    methods: {
        thisAttendance: function () {
            if (this.$route.name == "Student Courses") {
                return true;
            }
        },
        thisAssignments: function () {
            if (this.$route.name == "Student Month Assignments") {
                return true;
            }
        }
    },
    computed: {
        attendance () {
            return this.thisAttendance() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
        },
        assignments () {
            return this.thisAssignments() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
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

    #schedule {
        min-height:100vh;
    }
</style>