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
                    <p class="m-0 pr-2">{{classGroupList[selectedGroup].courseName}}</p>
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
              <p class="pt-2 white">{{classGroupList[selectedGroup].groupCode}}</p>
            </div>
          </div>
        </template>
      </header-arrow>

      <!-- buttons navigation between schedules -->
      <navigation-buttons />
    </div>

    <div class="container-fluid pt-4 p-2 justify-content-center" id="assignments">
      <assignment-item
        numberAttch="1"
        students="30"
        dueDate="02/08"
        description="Here you can read a preview of the assignment, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore......"
      />

      <assignment-item
        numberAttch="0"
        students="30"
        dueDate="05/08"
        description="Here you can read a preview of the assignment, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore......"
      />

      <assignment-item
        numberAttch="1"
        students="30"
        dueDate="10/08"
        description="Here you can read a preview of the assignment, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore......"
      />
    </div>
  </div>
</template>

<script>
import NavigationButtons from '../teacheroverviewbuttons/teacheroverviewbuttons.vue';
import HeaderArrow from '../headerarrow/headerarrowslot.vue';
import AssignmentItem from '../teacherassignmentcard/teacherassignmentcard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'overviewassignments',
  components: {
    HeaderArrow,
    AssignmentItem,
    NavigationButtons
  },
  computed: {
    ...mapGetters(['selectedGroup', 'courseName', 'classGroupList'])
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