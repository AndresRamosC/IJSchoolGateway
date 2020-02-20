<template>
<div>
    <div class="sticky-top blueBG">

        <header-arrow
            headerTitle="Course overview"
            link="/fail"
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
                    <button class="inactiveButton p-1 w-100" role="button" aria-pressed="false">Assignments</button>
                </router-link>
            </div>
            <!-- grades button  -->
            <div class="pl-2 pr-2">
                <router-link to="/course-overview/grades">
                    <button class="activeButton p-1 w-100" role="button" aria-pressed="false">Grades</button>
                </router-link>
            </div>
        </div>

    </div>


    <div class="container-fluid pt-4 p-2 justify-content-center" id="grades">

    <div class="row average">
        <div class="col-8">
            <div class="row">
                <div class="col-12">
                    <p class="font-weight-bold m-0 blue">Total score</p>
                </div>
                <div class="col-12">
                    <p style="fontSize: 0.8em;" class="font-weight-regular m-0 gray">Average including all months</p>
                </div>
            </div>
        </div>
        <div class="col-4 d-flex align-content-center">
            <h2 class="font-weight-bold blue m-0">90.0</h2>
        </div>
    </div>

    <div class="row mt-2">
        <div class="col-12">
            <div>
                <h3 class="text-center blue">Average per month</h3>
            </div>
        </div>
    </div>

    <month-grade
        month="January"
        homeworks="10/15"
        test="90"
        total="85"
    />

    <month-grade
        month="February"
        homeworks="10/10"
        test="90"
        total="95"
    />

    </div>

</div>
</template>

<script>
import HeaderArrow from '../headerarrow/headerarrow.vue';
import MonthGrade from '../monthgrade/monthgrade.vue';

export default {
    name: "overviewgrades",
    components: {
        HeaderArrow,
        MonthGrade
    }
}
</script>

<style scoped>
    #grades {
        min-height:100vh;
    }

      #attendance {
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

    .average {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin: 1%;
    }
</style>