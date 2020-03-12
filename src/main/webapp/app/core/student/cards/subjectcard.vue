<template>
    <div class="container card mt-2 mb-2">
        <div class="row">
            
            <!-- subject color div -->
            <div :style="style"></div>

            <div class="col">
                <div class="row p-2">

                    <!-- subject icon -->
                    <div class="col-2 d-flex align-self-center">
                        <font-awesome-icon class="blue" style="width: 25px; height: 25px;" :icon="subjectIcon"/>
                    </div>
                    
                    <div class="col-8">
                        <div class="row">

                            <!-- subject name -->
                            <div class="col-12 pl-2 p-0">
                                <h4 class="font-weight-bold m-0 blue text-left text-capitalize"> {{subjectName}} </h4>
                            </div>

                            <!-- subject name -->
                            <div class="col-4 pl-2 p-0">
                                <p class="font-weight-regular gray m-0 text-left"> {{subjectCode}} </p>
                            </div>

                            <!-- course group -->
                            <div class="col-8 p-0">
                                <p class="font-weight-regular gray m-0 text-left">Group: {{group}} </p>
                            </div>

                        </div>
                    </div>

                    <!-- options popUp -->
                    <div class="col-1 d-flex align-self-center">
                        <b-dropdown id="dropdown-dropleft" class="whiteBG"  boundary="viewport" variant="link" toggle-class="text-decoration-none" :no-caret="true">
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

        </div>
    </div>
</template>

<script>
export default {
    name: "subjectcard",
    props: {
        subjectId: Number,
        subjectIcon: String,
        subjectColor: String,
        subjectName: String,
        subjectCode: String,
        group: String
    },
    computed: {
        style () {
        return 'width: 2px; background-color: ' +  this.subjectColor;
      }
    },
    methods: {
        updateCourseAndGo: function (course, finalPath) {
            this.$store.commit('updateStudentSelectedCourse', course);
            this.$router.push('/student-course-overview/' + finalPath);
        }
    }
}
</script>

<style scoped>
    .card {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>