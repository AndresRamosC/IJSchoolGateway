<template>
  <b-modal
    id="new-subject"
    ref="new-subject"
    hide-footer
    hide-header-close
    centered
    no-close-on-backdrop
  >
    <b-form @submit="postSubject">
    <div class="container p-0">
      <div class="row m-0">
        <div class="col-10 py-2 d-flex align-items-center blueBG">
          <h3 class="font-weight-bold m-0 p-0 text-left white">New subject</h3>
        </div>
        <div class="col-2 py-2 d-flex justify-content-end blueBG">
          <font-awesome-icon style="width: 25px; height: 25px; color: white;" icon="times" />
        </div>
      </div>

      <b-overlay :show="show" :style="adjust" rounded="sm">

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Icon:</p>
        </div>
        <div class="col-7 p-0 m-0 pr-2">
          <div
            @click="show = true"
            class="d-flex align-items-center justify-content-center"
            style="background: #FFFFFF; width: 50px; height: 50px; border: 5px solid #1071A3; borderRadius: 50%;"
          >
            <font-awesome-icon v-if="subjectDTO.iconCode == ''" style="width: 77%; height: 74%; color: #1071A3;" icon="plus" />
            <font-awesome-icon v-if="subjectDTO.iconCode != ''" style="width: 77%; height: 74%; color: #1071A3;" :icon="subjectDTO.iconCode" />
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
            v-model="subjectDTO.colorCode" 
            required
            style="border: 2px solid #1071A3; borderRadius: 5px;"
            id="form-colorCode"
          ></b-form-input>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Course name:</p>
        </div>
        <div class="col-7 p-0 m-0 pr-2">
          <b-form-input required v-model="subjectDTO.courseName" class="forms-input" id="form-courseName"></b-form-input>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Course code:</p>
        </div>
        <div class="col-7 p-0 m-0 pr-2">
          <b-form-input required v-model="subjectDTO.courseCode" class="forms-input" id="form-courseCode"></b-form-input>
        </div>
      </div>

      <div class="row my-3 m-0">
        <div class="col-3 p-0 m-0 d-flex justify-content-end align-items-center">
          <p class="font-weight-bold text-right pr-2 m-0 blue">Department:</p>
        </div>
        <div class="col-7 p-0 pr-2 m-0">
          <b-form-select
            id="form-department"
            class="forms-combo-input p-0 w-100"
            v-model="subjectDTO.department"
            :options="departments"
            required
          ></b-form-select>
        </div>
      </div>

      <!-- save button  -->
      <div class="row w-100 my-3 m-0">
        <div class="col-12 py-2 d-flex justify-content-end">
          <b-button id="save-newSubject" type="submit" variant="primary">Save</b-button>
        </div>
      </div>

      <template v-slot:overlay>
        <div class="container-fluid" style="min-width: 465px; margin-top: 4em;">
          <div class="row m-0">
            <div class="row my-2">
              <div class="col-1 d-flex justify-content-center" v-for="(icon, index) in icons" :key="index">
                <font-awesome-icon @click="updateIconAndBack(icon)" style="width: 25px; height: 25px; color: black;" :icon="icon" />
              </div>
            </div>
          </div>
        </div>
      </template>

      </b-overlay>

    </div>
  </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'newsubject',
  data() {
    return {
      subjectDTO: {
        "colorCode": '',
        "courseCode": '',
        "courseName": '',
        "department": '',
        "iconCode": ''
      },
      departments: ['Basic', 'Specialty'],
      show: false,
      icons: ['air-freshener','ambulance','american-sign-language-interpreting','anchor','angry','ankh','apple-alt','archive','archway','assistive-listening-systems','atlas','atom','award','baby','balance-scale','balance-scale-left','balance-scale-right','band-aid','barcode','baseball-ball','basketball-ball','bell','bible','bicycle','biking','binoculars','biohazard','blender-phone','blog','bolt','bone','bong','book','bookmark','book-open','book-reader','bowling-ball','box','box-open','brain','briefcase','briefcase-medical','broadcast-tower','broom','brush','bug','building','bullhorn','burn','bus','bus-alt','business-time','calculator','calendar-alt','camera','camera-retro','campground','capsules','car','carrot','cash-register','cat','chalkboard','chalkboard-teacher','chart-area','chart-bar','chart-line','chart-pie','cheese','chess','child','church','city','clinic-medical','clipboard','clipboard-check','clipboard-list','clock','cloud-showers-heavy','cloud-sun','cloud-sun-rain','code','coffee','cogs','coins','comment-dots','comments','compact-disc','compass','concierge-bell','credit-card','cross','crosshairs','crow','cubes','cut','database','desktop','dice','dice-d6','divide','dna','dog','dollar-sign','dolly-flatbed','drafting-compass','draw-polygon','drum','dumbbell','envelope','envelope-open','euro-sign','eye','eye-dropper','fan','female','fighter-jet','film','fire','fire-alt','fire-extinguisher','first-aid','fish','flask','football-ball','frog','futbol','gamepad','gavel','glasses','globe','golf-ball','graduation-cap','guitar','hammer','hard-hat','headphones-alt','heartbeat','highlighter','hiking','hospital','industry','keyboard','landmark','language','laptop','leaf','life-ring','lightbulb','lock-open','map','medal','meteor','microchip','microphone-alt','microscope','mobile-alt','money-bill','monument','moon','mosque','mountain','music','network-wired','palette','paper-plane','photo-video','place-of-worship','robot','rocket','ruler-combined','running','solar-panel','spell-check','swimmer','table-tennis','tree','trophy','truck','vial','volleyball-ball','weight-hanging','x-ray','yin-yang']
    }
  },
  methods: {
    postSubject(evt) {
      evt.preventDefault();

      const subjectData = JSON.stringify(this.subjectDTO);

      this.$store.dispatch('createSubject', subjectData);

      this.subjectDTO.colorCode = ''
      this.subjectDTO.courseCode = ''
      this.subjectDTO.courseName = ''
      this.subjectDTO.department = ''
      this.subjectDTO.iconCode = ''

      this.$root.$emit('bv::hide::modal', 'new-subject', '#showNewSubject');
    },
    // onShown() {
    //   // Focus the cancel button when the overlay is showing
    //   this.$refs.cancel.focus()
    // },
    // onHidden() {
    //   // Focus the show button when the overlay is removed
    //   this.$refs.show.focus()
    // },
    updateIconAndBack(icon) {
      this.subjectDTO.iconCode = icon;
      this.show = false;
    }
  },
  computed: {
    adjust () {
      return this.show ? 'position:relative; overflow-y:scroll;' : 'overflow-y: none';
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