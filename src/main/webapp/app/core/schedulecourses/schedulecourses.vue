<template>
<div>
    <div class="sticky-top whiteBG">
        <header-bell
            headerTitle="Schedule"
        />
        <!-- buttons navigation between schedules -->
        <div class="row m-0 pl-2 pr-2 ">
            <!-- courses button -->
            <div class="col">
                <router-link to="/guardian-schedule/courses">
                    <button class="activeButton p-1 active w-100" role="button" aria-pressed="true">Courses</button>
                </router-link>
            </div>
            <!-- assignments button  -->
            <div class="col">
                <router-link to="/guardian-schedule/assignments">
                    <button class="inactiveButton p-1 w-100" role="button" aria-pressed="false">Assignments</button>
                </router-link>
            </div>
        </div>
        
        <!-- day section -->
        <div class="row m-0 pl-3 pr-2 daySectionBox">

            <!-- date -->
            <div class="col-10 p-1">
                <p class="font-weight-regular text-left p-0 m-0 gray">Friday</p>
                <h5 class="font-weight-regular text-left p-0 m-0 blue">february 7, 2020</h5>
            </div>

            <!-- calendar -->
            <div class="col-2 p-1 d-flex flex-wrap align-content-center">
            <!-- <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="calendar-day"/> -->
                <b-form-datepicker size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
            </div>

        </div>
    </div>

        <!-- card courses container -->
    <div class="container-fluid p-2 justify-content-center">

        <subject-attendance
            subjectColor="#FF0000"
            startTime="08:00"
            endTime="09:00"
            subjectName="English"
            :attendance="false"
        />

        <subject-attendance
            subjectColor="#36B40A"
            startTime="09:00"
            endTime="10:00"
            subjectName="Math"
            :attendance="true"
        />

        <subject-attendance
            subjectColor="#FAC405"
            startTime="11:00"
            endTime="12:00"
            subjectName="History"
            :attendance="true"
        />

        <subject-attendance
            subjectColor="#05BFFA"
            startTime="13:00"
            endTime="14:00"
            subjectName="Physical Education"
            :attendance="true"
        />

        <subject-attendance
            subjectColor="#4505FA"
            startTime="14:00"
            endTime="15:00"
            subjectName="Art"
            :attendance="true"
        />

        <subject-attendance
            subjectColor="#FA05B5"
            startTime="15:00"
            endTime="16:00"
            subjectName="Physics"
            :attendance="true"
        />

    </div>

</div>    
</template>

<script>
import SubjectAttendance from '../subjectattendance/subjectattendance.vue';
import HeaderBell from '../headerbell/headerbell.vue';

export default {
    name: "schedulecourses",
    components: {
        SubjectAttendance,
        HeaderBell
    },
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return {
        value: new Date(today),
        min: minDate,
        max: maxDate
      }
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`)
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
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
</style>