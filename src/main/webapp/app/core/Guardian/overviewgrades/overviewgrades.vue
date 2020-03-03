 replace<template>
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
                    <b-dropdown-item v-for="(course, index) in courses" :key="index">
                        {{course.courseName}} 
                    </b-dropdown-item>
                </b-dropdown>
            </div>        

            <div class="col-3">
                <p class="pt-2 white">Group</p>
            </div>
        </div>

        <!-- container separator  -->
        <div style="zIndex: 1" class="col-12 divider"></div>

        <!-- buttons navigation between schedules -->
        <navigation-buttons/>

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
import NavigationButtons from '../overviewNavigationBtns/overviewNavigationButtons.vue';
import HeaderArrow from '../headerarrow/headerarrow.vue';
import MonthGrade from '../monthgrade/monthgrade.vue';
import { mapGetters } from 'vuex';

export default {
    name: "overviewgrades",
    components: {
        HeaderArrow,
        MonthGrade,
        NavigationButtons
    },
    computed: {
        ...mapGetters([
            'courses'
        ])
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

    .average {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        margin: 1%;
    }
</style>