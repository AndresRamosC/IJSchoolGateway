<template>
  <div class="container-fluid p-0 justify-content-center">
    <!-- app header -->
    <div class="row pt-3 pb-0 m-0 mb-1 d-flex justify-content-center blueBG">
      <!-- circle photo -->
      <div class="col-2">
        <div class="d-flex pb-2 justify-content-center circle" v-if="teacherLoaded">
          <img
            class="p-0 img-fluid"
            style="width:40px; height: 40px; borderRadius: 50%;"
            :src="teacherPhoto"
          />
        </div>
        <div class="circle d-flex justify-content-center" v-if="!teacherLoaded">
          <font-awesome-icon style="width: 40px; height: 35px;" class="p-0 gray" icon="user" />
        </div>
      </div>

      <!-- section title -->
      <div class="col-8 pb-2 d-flex flex-wrap align-content-start">
        <h1 class="font-weight-bold white">{{headerTitle}}</h1>
      </div>

      <!-- notifications icon  -->
      <div class="col-2 pb-2 d-flex flex-wrap align-content-center">
        <b-button v-b-modal.modal-notifications class="p-0 shadow-none" style="background: #1071A3;">
          <font-awesome-icon class="white" style="width: 24px; height: 24px;" icon="bell" />
        </b-button>
        <b-modal ref="modal-notifications" id="modal-notifications" hide-footer>
          <div class="container p-0 w-100">
            <div class="row m-0 d-flex justify-content-center">
              <div class="col-12">
                <p class="font-weight-bold m-0 pb-2 text-center blue">Notifications</p>
              </div>
              <!-- container separator  -->
              <div class="col-12 modal-divider"></div>
            </div>
            <div class="row m-0" v-for="(notification, index) in notifications" :key="index">
              <div class="col-10">
                <p class="gray">{{notification}}</p>
              </div>
              <div class="col-2">
                <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="times" />
              </div>
              <!-- container separator  -->
              <div class="col-12 modal-divider"></div>
            </div>
            <div class="row m-0">
              <div class="col-12 d-flex justify-content-center" @click="hideModal">
                <font-awesome-icon class="blue" style="width: 24px; height: 24px;" icon="times" />
              </div>
            </div>
          </div>
        </b-modal>
      </div>

      <!-- container separator  -->
      <div style="zIndex: 1" class="col-12 divider"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'teacherheader',
  props: {
    headerTitle: String
  },
  data() {
    return {
      notifications: ['Notifications will be shown here', 'this is a notification', 'this one too']
    };
  },
  computed: {
    ...mapGetters(['teacherLoaded', 'teacherPhoto'])
  },
  methods: {
    hideModal: function () {
      this.$refs['modal-notifications'].hide()
    },
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

.modal-divider {
  border: 1px solid #1071a3;
  margin-bottom: 0.5rem;
}
</style>