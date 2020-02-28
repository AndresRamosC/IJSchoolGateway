<template>
    <div class="container pt-0 pb-2">

        <div class="row subjectBox">

            <!-- subject color div -->
            <div :style="style"></div>

            <!-- class time section -->
            <div class="col-2 pl-1 pr-1">
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
            <div class="col-7 p-0 d-flex align-self-center">
                <div class="row m-0">
                    <div class="col-12 p-0">
                        <p class="font-weight-bold text-left text-capitalize m-0 blue"> {{subjectName}} </p>
                    </div>
                    <div class="col-4 p-0">
                        <p class="font-weight-regular text-left text-capitalize m-0 gray"> {{subjectCode}} </p>
                    </div>
                    <div class="col-8 p-0">
                        <p class="font-weight-regular text-left text-capitalize m-0 gray">Group: {{group}} </p>
                    </div>
                </div>
            </div>

            <!-- attendance value -->
            <div class="col-1 p-0 d-flex align-self-center">
                <p class="font-weight-bold text-left text-capitalize m-0 blue"> {{classroom}} </p>
            </div>

            <!-- options popUp -->
            <div class="col p-0 d-flex justify-content-end align-self-center">
                <b-dropdown id="dropdown-dropleft" class="whiteBG" dropleft boundary="viewport" variant="link" toggle-class="text-decoration-none" :no-caret="true">
                    <template v-slot:button-content class="whiteBG">
                        <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="ellipsis-v"/>
                    </template>
                    <router-link to="">
                        <b-dropdown-item href="">Attendance</b-dropdown-item>
                    </router-link>
                    <router-link to="">
                        <b-dropdown-item href="">Assignments</b-dropdown-item>
                    </router-link>
                </b-dropdown>
            </div>

        </div>

    </div>
</template>

<script>

export default {
    name: "coursecard",
    props: {
        subjectColor: String,
        startTime: String,
        endTime: String,
        subjectName: String,
        classroom: String,
        subjectCode: String,
        group: String
    },
    components: {
        
    },
    computed: {
        style () {
        return 'width: 2px; background-color: ' +  this.subjectColor;
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