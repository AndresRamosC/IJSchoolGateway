<template>
  <!-- buttons navigation between schedules -->
  <div class="row m-0 pl-2 pr-2 whiteBG btncontainer">
    <!-- assignments button  -->
    <div class="col-6 pl-2 pr-1">
      <router-link to="/course-overview-teacher/assignments" replace>
        <button :class="assignments" role="button" aria-pressed="false">Assignments</button>
      </router-link>
    </div>
    <!-- students button -->
    <div class="col-6 pl-2 pr-1">
      <router-link to="/course-overview-teacher/students" replace>
        <button :class="students" role="button" aria-pressed="true">Students</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: "teacheroverviewbuttons",
    methods: {
        thisStudents: function () {
            if (this.$route.name == "Students Grades") {
                return true;
            }
        },
        thisAssignments: function () {
            if (this.$route.name == "Assignments Overview" || this.$route.name == "Assignments Full View") {
                return true;
            }
        }
    },
    computed: {
        students () {
            return this.thisStudents() ? 'activeButton p-1 w-100' : 'inactiveButton p-1 w-100';
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

    .btncontainer {
        overflow-x: scroll;
    }
</style>