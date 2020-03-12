<template>
<footer class="p-0 nav">

    <!-- nav buttons container -->
    <div class="container-fluid p-1 d-flex justify-content-center align-content-center">
        <div class="row">

            <!-- button -->
            <div class="col-3 p-0 pl-3 pr-3">
                <router-link to="/student-dashboard">
                    <div class="col-12 p-0 d-flex justify-content-center">
                        <font-awesome-icon :class="dashboard" style="width: 35px; height: 30px;" icon="address-card"/>
                    </div>
                    <div class="col-12 p-0">
                        <p class="blue text-center m-0">Dashboard</p>
                    </div>
                </router-link>
            </div>

            <!-- button -->            
            <div class="col-3 p-0 pl-3 pr-3">
                <router-link to="/student-schedule/courses">
                    <div class="col-12 p-0 d-flex justify-content-center">
                        <font-awesome-icon :class="schedule" style="width: 35px; height: 30px;" icon="calendar"/>
                    </div>
                    <div class="col-12 p-0">
                        <p class="blue text-center m-0">Schedule</p>
                    </div>
                </router-link>
            </div>

            <!-- button -->
            <div class="col-3 p-0 pl-3 pr-3">
                <router-link to="/student-subjects">
                    <div class="col-12 p-0 d-flex justify-content-center">
                        <font-awesome-icon :class="subject" style="width: 35px; height: 30px;" icon="book"/>
                    </div>
                    <div class="col-12 p-0">
                        <p class="blue text-center m-0">Subjects</p>
                    </div>
                </router-link>
            </div>

            <!-- button -->
            <div class="col-3 p-0 pl-3 pr-3">
                <router-link to="/student-settings">
                    <div class="col-12 p-0 d-flex justify-content-center">
                        <font-awesome-icon :class="settings" style="width: 35px; height: 30px;" icon="cog"/>
                    </div>
                    <div class="col-12 p-0">
                        <p class="blue text-center m-0">Settings</p>
                    </div>
                </router-link>
            </div>

        </div>
    </div>
</footer>    
</template>

<script>
export default {
    name: "navbar",
    methods: {
        thisDashboard: function () {
            if (this.$route.name == "Student Dashboard") {
                return true;
            }
        },
        thisSchedule: function () {
            if (this.$route.name == "Student Courses" || this.$route.name == "Student Month Assignments") {
                return true;
            }
        },
        thisSubjects: function () {
            if (this.$route.name == "Student Subjects") {
                return true;
            }
        },
        thisSettigns: function () {
            if (this.$route.name == "Student Settings") {
                return true;
            }
        },
    },
    computed: {
        dashboard () {
            return this.thisDashboard() ? 'here text-center m-0' : 'notHere text-center m-0';
        },
        schedule () {
            return this.thisSchedule() ? 'here text-center m-0' : 'notHere text-center m-0';
        },
        subject () {
            return this.thisSubjects() ? 'here text-center m-0' : 'notHere text-center m-0';
        },
        settings () {
            return this.thisSettigns() ? 'here text-center m-0' : 'notHere text-center m-0';
        },
    }
}
</script>

<style scoped>
    .nav{
        box-shadow: 0px -3px 78px rgba(0, 0, 0, 0.25);
        border-radius: 10px 10px 0px 0px;
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
        z-index: 1020;
        overflow: hidden;
        background-color: #ffffff;
    }

    p {
        font-size: 12px;
    }

    .notHere {
        color: #1071a39e!important;
    }

    .here {
        color: #1071A3!important;
    }
</style>