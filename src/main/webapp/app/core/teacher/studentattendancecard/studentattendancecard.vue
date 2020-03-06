<template>
  <div class="container">
    <div class="row" v-if="attendance === null">
      <div class="col-8 p-0">{{name}}</div>
      <div class="col-2">
            <button class="greenButton" @click="$emit('createAttendance', selectedCourse, true, studentId)">
                <div class="container p-0">
                    <div class="row m-0 p-0">
                        <div class="col-12 p-0">
                            <font-awesome-icon class="green" style="width: 20px; height: 20x;" icon="check"/>
                        </div>
                    </div>
                </div>
            </button>
      </div>
      <div class="col-2">
            <button class="redButton" @click="$emit('createRetard', selectedCourse, false, studentId)">
                <div class="container p-0">
                    <div class="row m-0 p-0">
                        <div class="col-12 p-0">
                            <font-awesome-icon class="red" style="width: 20px; height: 20x;" icon="times"/>
                        </div>
                    </div>
                </div>
            </button>
      </div>
    </div>
    <div class="row" v-if="attendance === true">
      <div class="col-8 p-0">{{name}}</div>
      <div class="col-4 p-0 d-flex justify-content-center">
            <button class="greenButton">
                <div class="container p-0">
                    <div class="row m-0 p-0">
                        <div class="col-1 p-0 pr-1">
                            <font-awesome-icon class="green" style="width: 20px; height: 20x;" icon="check"/>
                        </div>
                        <div class="col-11 p-0">
                            <p class="green pl-1 m-0">Attend</p>
                        </div>
                    </div>
                </div>
            </button>
      </div>
    </div>
    <div class="row" v-if="attendance === false">
      <div class="col-8 p-0">{{name}}</div>
      <div class="col-4 p-0 d-flex justify-content-center">
            <button class="redButton">
                <div class="container p-0">
                    <div class="row m-0 p-0">
                        <div class="col-1 p-0 pr-1">
                            <font-awesome-icon class="red" style="width: 20px; height: 20x;" icon="times"/>
                        </div>
                        <div class="col-11 p-0">
                            <p class="red pl-1 m-0">Delay</p>
                        </div>
                    </div>
                </div>
            </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'studentattendancecard',
  props: {
    name: String,
    attendance: Boolean,
    studentId: Number
  },
  created() {
  },
  computed: {
    ...mapGetters([
        'teacher',
        'selectedCourse',
        'teacherTodayCourses',
        'studentsList',
        'studentsListLoaded'
    ])
  },
  methods: {
  }
};
</script>

<style scoped>
    .greenButton {
        background: #FFFFFF;
        border: 1px solid #36B40A;
        box-sizing: border-box;
        border-radius: 10px;
        color: #36B40A;
    }

    .redButton {
        background: #FFFFFF;
        border: 1px solid #FF0000;
        box-sizing: border-box;
        border-radius: 10px;
        color: #FF0000;
    }

    .green {
        color: #36B40A;
    }

    .red {
        color: #FF0000;
    }
</style>