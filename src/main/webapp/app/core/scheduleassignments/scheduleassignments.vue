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
                    <button class="inactiveButton p-1 active w-100" role="button" aria-pressed="true">Courses</button>
                </router-link>
            </div>
            <!-- assignments button  -->
            <div class="col">
                <router-link to="/guardian-schedule/assignments">
                    <button class="activeButton p-1 w-100" role="button" aria-pressed="false">Assignments</button>
                </router-link>
            </div>
        </div>
        
        <!-- day section -->
        <div class="row m-0 pl-3 pr-2 pt-2 daySectionBox">

            <!-- date -->
            <div class="col-10 p-1">
                <h5 class="font-weight-regular text-left p-0 m-0 blue">february 2020</h5>
            </div>

            <!-- calendar -->
            <div class="col-2 p-1 d-flex flex-wrap align-content-center">
            <!-- <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="calendar-day"/> -->
                <b-form-datepicker size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
            </div>

        </div>
    </div>

 <div class="container-fluid p-2 justify-content-center">
     
    <div class="row m-0 pt-2">

      <div class="col-12">
          <h4 class="font-weight-regular text-left blue">Monday 3</h4>
      </div>
      <div class="col-12">
          <p class="font-weight-regular text-left gray">Day off for constitution day</p>
      </div>

      <div class="col-12">
          <h4 class="font-weight-regular text-left blue">Tuesday 4</h4>
      </div>
      
      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#05BFFA"
            assignmentName="Solve the ecuations"
            dueTime="10:00"
            subjectName="Math"
            attachmentsQty="1"
          />
      </div>

      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#FAC405"
            assignmentName="Material for canvas"
            dueTime="13:00"
            subjectName="Art"
            attachmentsQty="0"
          />
      </div>

      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#FF0000"
            assignmentName="Make resume of page 3"
            dueTime="20:00"
            subjectName="English"
            attachmentsQty="1"
          />
      </div>

      <div class="col-12">
          <h4 class="font-weight-regular text-left blue">Friday 7</h4>
      </div>
      
      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#05BFFA"
            assignmentName="Solve the ecuations"
            dueTime="10:00"
            subjectName="Math"
            attachmentsQty="1"
          />
      </div>

      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#05BFFA"
            assignmentName="Bring formualry"
            dueTime="10:00"
            subjectName="Math"
            attachmentsQty="0"
          />
      </div>

      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#4505FA"
            assignmentName="Search about chapultepec battle"
            dueTime="11:00"
            subjectName="History"
            attachmentsQty="0"
          />
      </div>

      <div class="col-12 pt-2 pb-2">
          <assignment-card
            subjectColor="#FA05B5"
            assignmentName="Bring a ball"
            dueTime="09:00"
            subjectName="Physical education"
            attachmentsQty="0"
          />
      </div>

    </div>

 </div>

</div> 
</template>

<script>
import AssignmentCard from '../assignmentcard/assignmentcard.vue';
import HeaderBell from '../headerbell/headerbell.vue';

export default {
    name: "scheduleassignments",
    components: {
        AssignmentCard,
        HeaderBell
    },
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      return {
        value: new Date(today)
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