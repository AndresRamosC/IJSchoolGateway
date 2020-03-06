<template>
    <div class="container pt-0 pb-2">

        <div class="row subjectBox">

            <!-- subject color div -->
            <div :style="style"></div>

            <!-- class time section -->
            <div class="col-2 pl-1">
                <!-- start time -->
                <div class="col-12 p-0">
                    <p class="text-left m-0 gray"> {{startTime}} </p>
                </div>
                <!-- end time -->
                <div class="col-12 p-0">
                    <p class="text-left m-0 gray"> {{endTime}} </p>
                </div>
            </div>

            <!-- subject name section -->
            <div class="col-7 pl-0 d-flex align-self-center">
                <p class="font-weight-bold text-left text-capitalize m-0 blue"> {{subjectName}} </p>
            </div>

            <!-- attendance value -->
            <div class="col-1 d-flex align-self-center">
                <font-awesome-icon v-if="attendance" class="green" style="width: 25px; height: 25px;" icon="check-circle"/>
                <font-awesome-icon v-else class="red" style="width: 25px; height: 25px;" icon="times-circle"/>
            </div>

            <!-- options popUp -->
            <div class="col-1 d-flex align-self-center">
                <b-dropdown id="dropdown-dropleft" class="whiteBG" dropleft boundary="viewport" variant="link" toggle-class="text-decoration-none" :no-caret="true">
                    <template v-slot:button-content class="whiteBG">
                        <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="ellipsis-v"/>
                    </template>
                        <b-dropdown-item @click="updateCourseAndGo(subjectId, 'attendance')">Attendance</b-dropdown-item>
                        <b-dropdown-item @click="updateCourseAndGo(subjectId, 'assignments')">Assignments</b-dropdown-item>
                        <b-dropdown-item @click="updateCourseAndGo(subjectId, 'grades')">Grade</b-dropdown-item>
                </b-dropdown>
            </div>

        </div>

    </div>
</template>

<script>
import OverviewAttendance from '../overviewattendance/overviewattendance.vue';
import OverviewAssignments from '../overviewassignments/overviewassignments.vue';
import OverviewGrades from '../overviewgrades/overviewgrades.vue';

export default {
    name: "subjectattendance",
    props: {
        subjectId: Number,
        subjectColor: String,
        startTime: String,
        endTime: String,
        subjectName: String,
        attendance: Boolean
    },
    components: {
        OverviewAttendance,
        OverviewAssignments,
        OverviewGrades
    },
    computed: {
        style () {
        return 'width: 2px; background-color: ' +  this.subjectColor;
      }
    },
    methods: {
        updateCourseAndGo: function (course, finalPath) {
            this.$store.commit('changeActualCourse', course);
            this.$router.push('/course-overview/' + finalPath);
        }
    }
}
</script>

<style scoped>
    .subjectBox {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }

    .green {
        color: #36B40A;
    }

    .red {
        color: #FF0000;
    }

    .menu {
        background-color: #FF0000!important;
    }

    .menu > button {
        padding: 0!important;
    }
</style>