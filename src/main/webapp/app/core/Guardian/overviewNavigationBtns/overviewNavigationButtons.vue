<template>
  <!-- buttons navigation between schedules -->
  <div class="row m-0 pl-2 pr-2 whiteBG btncontainer">
    <!-- attendance button -->
    <div class="pl-2 pr-1">
      <router-link to="/course-overview/attendance" replace>
        <button :class="attendance" role="button" aria-pressed="true">Attendance</button>
      </router-link>
    </div>
    <!-- assignments button  -->
    <div class="pl-2 pr-1">
      <router-link to="/course-overview/assignments" replace>
        <button :class="assignments" role="button" aria-pressed="false">Assignments</button>
      </router-link>
    </div>
    <!-- grades button  -->
    <div class="pl-2 pr-1">
      <router-link to="/course-overview/grades" replace>
        <button :class="grades" role="button" aria-pressed="false">Grades</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "overviewnavigationbuttons",
    methods: {
        thisAttendance: function () {
            if (this.$route.name == "Attendance") {
                return true;
            }
        },
        thisAssignments: function () {
            if (this.$route.name == "Marks" || this.$route.name == "View") {
                return true;
            }
        },
        thisGrades: function () {
            if (this.$route.name == "Grades") {
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
        },
        grades () {
            return this.thisGrades() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
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

    .btncontainer {
        overflow-x: scroll;
    }
</style>