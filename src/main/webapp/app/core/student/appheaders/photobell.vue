<template>
  <div class="container-fluid p-0 justify-content-center">
    <!-- app header -->
    <div class="row pt-3 pb-0 m-0 mb-1 d-flex justify-content-center blueBG">
      <!-- circle photo -->
      <div class="col-2">
        <div class="d-flex pb-2 justify-content-center circle">
          <img
            class="p-0 img-fluid"
            style="width:40px; height: 40px; borderRadius: 50%;"
            :src="getStudentPhoto"
          />
        </div>
      </div>

      <!-- section title -->
      <div class="col-8 pb-2 d-flex flex-wrap align-content-start">
        <h1 class="font-weight-bold white"  v-text="$t('student.titles.' + headerTitle.toLowerCase())">{{headerTitle}}</h1>
      </div>

      <!-- notification bell  -->
      <notifications/>

      <!-- container separator  -->
      <div style="zIndex: 1" class="col-12 divider"></div>

      <!-- page content -->
      <div class="w-100 whiteBG">
        <slot name="content"></slot>
      </div>

    </div>
  </div>
</template>

<script>
import Notifications from '../../notifications/notifications.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'headerbell',
  components: {
    Notifications
  },
  props: {
    headerTitle: String
  },
  computed: {
    ...mapGetters(['getStudentPhoto'])
  }
};
</script>

<style scoped>
.blueBG {
  background-color: #1071a3;
}

.circle {
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0px 2px 5px 4px rgba(0, 0, 0, 0.25);
}

.divider {
  background: #ffffff;
  border-radius: 100px 100px 0px 0px;
  height: 15px;
}
</style>