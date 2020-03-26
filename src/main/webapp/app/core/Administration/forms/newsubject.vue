<template>
  <b-modal
    id="new-subject"
    ref="new-subject"
    hide-footer
    hide-header-close
    centered
    no-close-on-backdrop
  >
    <div class="container p-0">
      <div class="row m-0">
        <div class="col-10 py-2 d-flex align-items-center blueBG">
          <h3 class="font-weight-bold m-0 p-0 text-left white">New subject</h3>
        </div>
        <div class="col-2 py-2 d-flex justify-content-end blueBG">
          <font-awesome-icon style="width: 25px; height: 25px; color: white;" icon="times" />
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Icon:</p>
        </div>
        <div class="col-7 p-0 m-0 pr-2">
          <div
            class="d-flex align-items-center justify-content-center"
            style="background: #FFFFFF; width: 50px; height: 50px; border: 5px solid #1071A3; borderRadius: 50%;"
          >
            <font-awesome-icon style="width: 77%; height: 74%; color: #1071A3;" icon="plus" />
          </div>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Color:</p>
        </div>
        <div class="col-2 p-0 m-0 pr-2">
          <b-form-input
            type="color"
            required
            style="border: 2px solid #1071A3; borderRadius: 5px;"
            id="form-newguardian-firtsname"
          ></b-form-input>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Course name:</p>
        </div>
        <div class="col-7 p-0 m-0 pr-2">
          <b-form-input required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Course code:</p>
        </div>
        <div class="col-7 p-0 m-0 pr-2">
          <b-form-input required class="forms-input" id="form-newguardian-firtsname"></b-form-input>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Department:</p>
        </div>
        <div class="col-7 p-0 pr-2 m-0">
          <b-dropdown
            id="dropdown-gender"
            class="forms-combo-input p-0 w-100"
            toggle-class="text-decoration-none"
            :no-caret="true"
          >
            <template v-slot:button-content :no-caret="true">
              <div class="row m-0 combo-box">
                <div class="col-10 p-0">
                  <p class="text-left gray m-0 p-0">Select</p>
                </div>
                <div class="col-2 p-0 pr-1 d-flex justify-content-end align-items-center">
                  <font-awesome-icon
                    class="blue"
                    style="width: 20px; height: 20px;"
                    icon="chevron-down"
                  />
                </div>
              </div>
            </template>
            <b-dropdown-item>
              <p class="text-left gray">Basic</p>
              <p class="text-left gray">Specialty</p>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <!-- save button  -->
      <div class="row w-100 my-3 m-0">
        <div class="col-12 py-2 d-flex justify-content-end">
          <div
            style="background-color: #1071A3; border-radius: 5px;"
            ref="endProcess"
            @click="endProcess()"
          >
            <h3 class="font-weight-bold m-0 p-2 white">Save</h3>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'newsubject',
  data() {
    return {};
  },
  methods: {
    endProcess: function() {
      this.$root.$emit('bv::hide::modal', 'new-subject', '#showNewSubject');
    }
  }
};
</script>

<style scoped>
.divider {
  border: 1px solid #1071a3;
  margin-bottom: 0.5rem;
}

.blueBG {
  background-color: #1071a3;
}

.combo-box {
  background: #ffffff;
  border-bottom: 1px solid #1071a3;
  box-sizing: border-box;
}

.circle {
  width: 60px !important;
  height: 60px !important;
  border-radius: 50%;
  border: 2px solid #ffffff;
}
</style>