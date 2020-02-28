<template>
 <div id="studentselection">
  <div class="container-fluid justify-content-center">

      <!-- app header -->
      <div class="row blueBG">
        <div class="col-8 d-flex flex-wrap align-content-center">
          <h1 style="fontSize: 1.3em" class="font-weight-bold white">Student selection</h1>
        </div>
        <div class="col-4 d-flex flex-wrap align-content-center">
          <div class="w-75 h-75 circle d-flex justify-content-center" v-if="isLoaded">
            <img class="p-0 w-100" style="borderRadius: 50%;" :src="guardianPhoto"/>
          </div>
          <div class="w-75 h-100 circle d-flex justify-content-center" v-if="!isLoaded">
            <font-awesome-icon style="width: 40px; height: 40px;" class="p-0 gray" icon="user"/>
          </div>
        </div>
        <div class="col-12 divider"></div>
      </div>

      <!-- landing - greeting -->
      <div class="row">
        <div class="col-12">
          <h1 class="text-center font-weight-normal blue">Welcome back</h1>
        </div>
        <div class="col-12">
          <p class="text-center font-weight-normal blue"  v-if="isLoaded">{{guardianName}}</p>
        </div>
      </div>
    </div>

    <!-- students section  -->
    <div class="text-center" v-if="!isLoaded">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div class="container-fluid" v-if="isLoaded">
      <div class="row mb-5">
        <!-- student card -->
        <div class="col-12" v-for="(sp, index) in studentPersons" :key="index">
          <studentcard
            :studentId="index"
            :imagen="studentPhoto(index)"
            :name="studentName(index)"
            :grade="studentGrade(index)"
            enter="08:10 - late"
            leave= "Still at school"
          />
        </div>
      </div>
    </div>

 </div>

</template>

<script>
import studentcard from '../studentcard/studentcard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'studentselection',
  components: {
    studentcard
  },
  async created () {
    this.$store.dispatch('getDashboard', this.account.id);
  },
  computed: {
    ...mapGetters([
      'isLoaded',
      'dashboard',
      'account',
      'studentPersons',
      'guardianPhoto',
      'guardianName',
      'studentPhoto',
      'studentName',
      'studentGrade'
    ])
  }
};
</script>

<style scoped>
  .blueBG {
    background-color: #1071A3;
  }

  .circle {
    background-color: white;
    border-radius: 50%
  }

  .divider {
    background: #FFFFFF;
    border-radius: 100px 100px 0px 0px;
    height: 15px;
  }

  #studentselection {
    min-height:100vh;
    height: 100%;
  }
</style>