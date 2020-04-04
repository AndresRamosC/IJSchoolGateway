<template>
    <div class="row m-0 py-2" style="border-bottom: 1px solid #559FD5;">
        <div class="col-1 pr-0 d-flex align-items-center">
            <h2 v-if="startHour.length == 1" class="font-weight-bold m-0 blue"> {{startHour[0].startHour}} </h2>
            <div v-if="startHour.length > 1" class="row m-0">
                <div v-for="(hour,index) in startHour" :key="index" class="col-12 p-0">
                    <p class="blue text-center m-0"> {{hour.startHour}} </p>
                </div>
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <h2 v-if="endHour.length == 1" class="font-weight-bold m-0 blue"> {{endHour[0].endHour}} </h2>
            <div v-if="endHour.length > 1" class="row m-0">
                <div v-for="(hour,index) in endHour" :key="index" class="col-12 p-0">
                    <p class="blue text-center m-0"> {{hour.endHour}} </p>
                </div>
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{classroom}} </h2>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue">{{students}}</h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 class="font-weight-bold m-0 blue"> {{groupCode}} </h2>
        </div>
        <div class="col-2 pr-0 d-flex align-items-center">
            <h2 v-if="weekdays.length == 1" class="font-weight-bold m-0 blue"> {{getWeekdays(weekdays[0].weekDays)}}</h2>
            <div v-if="weekdays.length > 1" class="row m-0">
                <div v-for="(weekDay,index) in weekdays" :key="index" class="col-12 p-0">
                    <p class="blue text-center m-0"> {{getWeekdays(weekDay.weekDays)}} </p>
                </div>
            </div>
        </div>
        <div class="col-2 px-0 d-flex justify-content-start">
            <div>
                <img class="circle-img p-0" style="border-color: purple" src="https://www.trecebits.com/wp-content/uploads/2019/02/Persona-1-445x445.jpg"/>
            </div>
        </div>
        <div class="col-1 p-0 d-flex align-items-center justify-content-end">
            <div class="circle mx-1"  style="border-color: #1071a3">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: #1071a3;"
                    class="px-2"
                    icon="pen"
                />
            </div>
            <div class="circle mx-1"  style="border-color: red;">
                <font-awesome-icon
                    style="width: 55px; height: 55px; color: red"
                    icon="times"
                />
            </div>
        </div>
        <div class="col-1 pr-0 d-flex align-items-center justify-content-start">
        </div>
    </div>
</template>

<script>
import arrowheaderVue from '../../student/appheaders/arrowheader.vue';
import _ from 'lodash'

export default {
    name: "subjectcard",
    props: {
        startHour: Array,
        endHour: Array,
        groupCode: String,
        classroom: String,
        students: Number,
        weekdays: Array,
    },
    data() {
        return {
            result: []
        }
    },
    methods: {
        getWeekdays: function( long ) {
            // we want to represent the input as a 8-bytes array     
            var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];     
            for ( var index = 0; index < byteArray.length; index ++ ) {     
                if((long & (1 << index))!==0){         
                    byteArray [ byteArray.length-1-index ] = 1;       
                }     
            }     
            console.log(byteArray);

            const days = ['', 'Su-', 'Sa-', 'F-', 'Th-', 'W-', 'Tu-', 'M-'];
            var weekDays = ''

            for (let index = (byteArray.length-1); index > 1; index--) {
                if (byteArray[index] == 1) {
                    weekDays += days[index];
                };
            }
            weekDays = weekDays.substring(0, weekDays.length-1);
            return weekDays;
        }
    }
}
</script>

<style scoped>
  .circle {
    width: 60px!important;
    height: 60px!important; 
    border-radius: 50%;
    border: 2px solid #ffffff;
  }

  .circle-img {
    width: 60px!important;
    height: 60px!important; 
    border-radius: 50%;
    border: 2px solid #ffffff;
  }
</style>