<template>
  <div>
    <div class="sticky-top blueBG">
      <header-arrow headerTitle="Course overview">
        <template v-slot:content>
          <div class="row w-100 m-0">
            <div class="col-8">
              <b-dropdown
                id="dropdown-1"
                class="p-2"
                toggle-class="text-decoration-none"
                :no-caret="true"
              >
                <template v-slot:button-content>
                  <div class="row">
                    <p class="m-0 pr-2">{{courseName(selectedGroup).courseName}}</p>
                    <font-awesome-icon
                      class="white"
                      style="width: 20px; height: 20px;"
                      icon="chevron-down"
                    />
                  </div>
                </template>
                <b-dropdown-item
                  v-for="(group, index) in classGroupList"
                  :key="index"
                >{{group.courseName + '-' + group.groupCode}}</b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="col-3">
              <p class="pt-2 white">{{courseName(selectedGroup).groupCode}}</p>
            </div>
          </div>
        </template>
      </header-arrow>

      <!-- buttons navigation between schedules -->
      <navigation-buttons />
    </div>

    <div class="text-center" v-if="!studentsGroupLoaded">
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div class="container pt-4 p-2 justify-content-center" id="overviewstudents" v-if="studentsGroupLoaded">
        <div v-for="(student, index) in studentsGroup" :key="index">
            <student-card
              :name="studentNameGroup(index)"
              :photo="studentPhotoGroup(index)"
            />
        </div>
    </div>
  </div>
</template>

<script>
import NavigationButtons from '../teacheroverviewbuttons/teacheroverviewbuttons.vue';
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import StudentCard from '../studentcard/studentcard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'overviewstudents',
  components: {
    HeaderArrow,
    StudentCard,
    NavigationButtons
  },
  created() {
    console.log('created');
    this.$store.dispatch('getStudentsByCourse', this.selectedGroup);
  },
  computed: {
    ...mapGetters(['selectedGroup', 'courseName', 'classGroupList', 'studentsGroup', 'studentsGroupLoaded', 'studentNameGroup', 'studentPhotoGroup'])
  }
};
</script>

<style scoped>
#overviewstudents {
  min-height: 100vh;
}

.blueBG {
  background-color: #1071a3 !important;
}

.divider {
  background: #ffffff;
  border-radius: 100px 100px 0px 0px;
  height: 15px;
}

.activeButton {
  background: #1071a3;
  border: 1px solid #1071a3;
  box-sizing: border-box;
  border-radius: 10px;
  color: #ffffff;
}

.inactiveButton {
  background: #ffffff;
  border: 1px solid #1071a3;
  box-sizing: border-box;
  border-radius: 10px;
  color: #1071a3;
}

.btncontainer {
  overflow-x: scroll;
}
</style>