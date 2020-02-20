<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow
            headerTitle="Course overview"
        />

        <div class="row m-0">
            <div class="col-8">
                <b-dropdown id="dropdown-1" class="p-2" toggle-class="text-decoration-none" :no-caret="true" >
                    <template v-slot:button-content>
                        <div class="row">
                            <p class="m-0 pr-2">Subject name</p>
                            <font-awesome-icon class="white" style="width: 20px; height: 20px;" icon="chevron-down"/>
                        </div>
                    </template>
                    <b-dropdown-item>English</b-dropdown-item>
                    <b-dropdown-item>Math</b-dropdown-item>
                    <b-dropdown-item>Physics</b-dropdown-item>
                </b-dropdown>
            </div>        

            <div class="col-3">
                <p class="pt-2 white">Group</p>
            </div>
        </div>

        <!-- container separator  -->
        <div style="zIndex: 1" class="col-12 divider"></div>

        <!-- buttons navigation between schedules -->
        <div class="row m-0 pl-2 pr-2 whiteBG btncontainer">
            <!-- attendance button -->
            <div class="pl-2 pr-2">
                <router-link to="/course-overview/attendance">
                    <button class="inactiveButton p-1 active w-100" role="button" aria-pressed="true">Attendance</button>
                </router-link>
            </div>
            <!-- assignments button  -->
            <div class="pl-2 pr-2">
                <router-link to="/course-overview/assignments">
                    <button class="activeButton p-1 w-100" role="button" aria-pressed="false">Assignments</button>
                </router-link>
            </div>
            <!-- grades button  -->
            <div class="pl-2 pr-2">
                <router-link to="/course-overview/grades">
                    <button class="inactiveButton p-1 w-100" role="button" aria-pressed="false">Grades</button>
                </router-link>
            </div>
        </div>

    </div>


    <div class="container-fluid pt-4 p-2 justify-content-center" id="assignments">

    <assignment-item
        numberAttch="1"
        status="Not delivered"
        dueDate="02/08"
        description="Here you can read a preview of the assignment, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore......"
    />

    <assignment-item
        numberAttch="0"
        status="Delivered"
        dueDate="05/08"
        description="Here you can read a preview of the assignment, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore......"
    />

    <assignment-item
        numberAttch="1"
        status="In time"
        dueDate="10/08"
        description="Here you can read a preview of the assignment, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore......"
    />

    </div>

</div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrow.vue';
import AssignmentItem from '../assignmentitem/assignmentitem.vue'

export default {
    name: "overviewassignments",
    components: {
        HeaderArrow,
        AssignmentItem
    }
}
</script>

<style scoped>
    #assignments {
        min-height:100vh;
    }

    .blueBG {
        background-color: #1071A3!important;
    }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }

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