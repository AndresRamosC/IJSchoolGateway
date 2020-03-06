<template>
<div class="container box">
    <div style="position: relative;" class="d-flex" dir="ltr">
        <b-button
            size="sm"
            class="shadow-none"
            style="top: 70%; position: absolute;"
            @click="monthBack"
        >
            <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="arrow-circle-left"/>
        </b-button>
        <b-button
            size="sm"
            class="ml-auto shadow-none"
            style="top: 70%; position: absolute; left: 85%;"
            @click="monthNext"
        >
           <font-awesome-icon class="blue" style="width: 25px; height: 25px;" icon="arrow-circle-right"/>
        </b-button>
        </div>

        <div class="d-flex justify-content-center">
            <b-calendar v-model="value" :min="min" :max="max" no-highlight-today :readonly="true" :date-disabled-fn="dateDisabled" :date-info-fn="dateClass" :hide-header="true" label-help="" locale="en"></b-calendar>
        </div>
    </div>
</template>

<script data-search-pseudo-elements defer src="https://use.fontawesome.com/releases/latest/js/all.js" integrity="sha384-L469/ELG4Bg9sDQbl0hvjMq8pOcqFgkSpwhwnslzvVVGpDjYJ6wJJyYjvG3u8XW7" crossorigin="anonymous"></script>
<script>
import moment from 'moment';

export default {
    name: "calendar",
    props: ['absent'],
    data() {
        const today = moment().format("YYYY-MM-DD");
        const minDate = moment().subtract(1, 'month').format("YYYY-MM-DD")
        const maxDate = today
      return {
        value: today,
        min: minDate,
        max: maxDate,
      }
    },
    updated () {
      
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`)
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
      },
       dateClass(ymd, date) {
        const day = date.getDate()
        const month = date.getMonth()
        for (let index = 0; index < this.absent.length; index++) {
          if (day == moment(this.absent[index].creationDate).format("DD") && month == moment(this.absent[index].creationDate).subtract(1, 'month').format("MM")) {
            return this.absent[index].onTime ? 'table-success' : 'table-info'
          }
        }
        return 'table-danger'
      },
      monthBack() {
        this.value = moment(this.value).subtract(1, 'month').format("YYYY-MM-DD")
      },
      monthNext() {
        this.value = this.value = moment(this.value).add(1, 'month').format("YYYY-MM-DD")
      }
    }
}
</script>

<style scoped>
    .box {
        background: #FFFFFF;
        box-shadow: 5px 6px 15px rgba(0, 0, 0, 0.25);
    }
</style>