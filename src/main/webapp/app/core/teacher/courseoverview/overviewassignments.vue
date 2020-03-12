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
                    <p class="m-0 pr-2" v-if="!allLoaded">{{classGroupList[selectedGroup].courseName}}</p>
                    <p class="m-0 pr-2" v-if="allLoaded">All</p>
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
                  @click="updateAssignments(index)"
                >{{group.courseName + '-' + group.groupCode}}
                </b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item
                  @click="loadAllAssignments">
                  All
                </b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="col-3">
              <p class="pt-2 white" v-if="!allLoaded">{{classGroupList[selectedGroup].groupCode}}</p>
              <p class="pt-2 white" v-if="allLoaded">All</p>
            </div>
          </div>
        </template>
      </header-arrow>

      <!-- buttons navigation between schedules -->
      <navigation-buttons />
    </div>

    <div class="container-fluid pt-4 p-2 justify-content-center" id="assignments" v-if="!allLoaded">

       <div v-for="(assignment,index) in teacherAssignmentsList" :key="index">
          <assignment-item
            :selectedAssignment="index"
            :numberAttch="assignment.attachmentsDTOList.length"
            :students="studentsGroup.length"
            :dueDate="getDate(assignment.dueDate)"
            :description="assignment.description"
          />
       </div>

    </div>
    <div class="container-fluid pt-4 p-2 justify-content-center" id="assignments" v-if="allLoaded">

       <div v-for="(assignment,index) in allAssignments" :key="index">
            <assignment-item
              :selectedAssignment="index"
              :numberAttch="assignment.attachmentsDTOList.length"
              :students="studentsGroup.length"
              :dueDate="getDate(assignment.dueDate)"
              :description="assignment.description"
            />
       </div>

    </div>

  </div>
</template>

<script>
import NavigationButtons from '../teacheroverviewbuttons/teacheroverviewbuttons.vue';
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import AssignmentItem from '../teacherassignmentcard/teacherassignmentcard.vue';
import { mapGetters } from 'vuex';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'overviewassignments',
  components: {
    HeaderArrow,
    AssignmentItem,
    NavigationButtons
  },
  data() {
      return {
        allLoaded: false
      }
  },
  async created() {
    this.$store.dispatch('getTeacherAssignmentsByGroup', this.classGroupList[this.selectedGroup].classGroupId);
  },
  computed: {
    ...mapGetters(['selectedGroup', 'courseName', 'classGroupList', 'actualCourse', 'findCourseByGroupId', 'findSubjectBySubjectId', 'studentsGroup', 'teacherAssignmentsList', 'allAssignments'])
  },
  methods: {
        getDate(date) {
        return moment(date).format("MM/D");
      },
      updateAssignments(course) {
        this.allLoaded = false;
        this.$store.commit('updateSelectedGroup', course);
        this.$store.dispatch('getTeacherAssignmentsByGroup', this.classGroupList[this.selectedGroup].classGroupId);
      },
      loadAllAssignments() {
        for (let index = 0; index < this.classGroupList.length; index++) {
          this.$store.dispatch('returnTeacherAssignmentsByGroup', this.classGroupList[index].classGroupId)
        }
        this.allLoaded = true;
      }
    }
};
</script>

<style scoped>
#assignments {
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