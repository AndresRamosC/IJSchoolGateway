<template>
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
</template>

<script>
export default {
    name: "notifications",
    data() {
        return {
        notifications: ['Notifications will be shown here', 'this is a notification', 'this one too']
        }
    },
    methods: {
        hideModal: function () {
        this.$refs['modal-notifications'].hide()
        },
    }
}
</script>

<style scoped>   
.modal-divider {
  border: 1px solid #1071A3;
  margin-bottom: 0.5rem;
}
</style>