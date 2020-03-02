<template>
    <header-arrow headerTitle="Attendance">
        <template v-slot:content>
            <div class="container">
                <div class="row m-0">
                    <div class="col-6 text-left white">{{teacherTodayCourses[selectedCourse].subjectId.courseName}}</div>
                    <div class="col-6 text-right white">Group</div>
                </div>
                <div class="row m-0 d-flex justify-content-center">
                    <div class="col-6 p-0">
                        <div class="col-12 p-0 text-center white">{{dayName}}</div>
                        <div class="col-12 p-0 text-center white">{{day}}</div>
                    </div>
                    <div class="col-6 d-flex jusity-content-center align-content-center">
                        <b-form-datepicker id="teacher-attendance" class="white d-flex justify-content-center" size="sm" v-model="value" :date-disabled-fn="dateDisabled" :hide-header="true" label-help="" locale="en"></b-form-datepicker>
                    </div>
                </div>
            </div>
        </template>
    </header-arrow>

</template>

<script>
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import _ from 'lodash';

export default {
    name : "teacherattendance",
    components: {
        HeaderArrow
    },
    created() {
       
    },
    data: function () {
        const today = moment().format("YYYY-MM-DD");
        const choosenDate =  moment().format("LL");
        const name = moment().format('dddd');

        const arr = _.sortBy(this.teacherTodayCourses, ['endHour']);
        const actual = arr[this.selectedCourse];
        return {
          value: new Date(today),
          day: choosenDate,
          dayName: name,
          course: actual
        }
    },
    computed: {
        ...mapGetters([
            'selectedCourse',
            'teacherTodayCourses'
        ])
    },
    methods: {
      dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`)
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6
      }
    },
    watch: {
        value: function () {
            // let date = moment(this.value).format('YYYY-MM-DD');
            this.day = moment(this.value).format('LL');
            this.dayName = moment(this.value).format('dddd');
            // this.$store.dispatch('getTeacherCoursesByDay', { id: this.teacher, date: date });
        }
    }
}
</script>

<style scoped>

</style>